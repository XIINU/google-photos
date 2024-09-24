import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

type MediaContextType = {
  assets: MediaLibrary.Asset[];
  loadLocalAssets: () => void;
  getAssetById: (id: string) => MediaLibrary.Asset | undefined;
};

const MediaContext = createContext<MediaContextType>({
  assets: [],
  loadLocalAssets: () => {},
  getAssetById: () => undefined,
});

export default function MediaContextProvider({ children }: PropsWithChildren) {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [localAssets, setLocalAssets] = useState<MediaLibrary.Asset[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [endCursor, setEndCursor] = useState<String>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionResponse?.status != 'granted') {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (permissionResponse?.status === 'granted') {
      loadLocalAssets();
    }
  }, [permissionResponse]);

  const loadLocalAssets = async () => {
    if (loading) return;
    setLoading(true);
    const assetPage = await MediaLibrary.getAssetsAsync();
    // console.log(JSON.stringify(assetPage, null, 2));

    setLocalAssets((existingItems) => [...existingItems, ...assetPage.assets]);

    setHasNextPage(assetPage.hasNextPage);
    setEndCursor(assetPage.endCursor);

    setLoading(false);
  };

  const getAssetById = (id: string) => {
    return localAssets.find((asset) => asset.id === id);
  };

  return (
    <MediaContext.Provider value={{ assets: localAssets, loadLocalAssets, getAssetById }}>
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => useContext(MediaContext);
