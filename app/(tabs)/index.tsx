import { Stack } from 'expo-router';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
// import { Image } from 'expo-image';

export default function Home() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [localAssets, setLocalAssets] = useState<MediaLibrary.Asset[]>([]);

  useEffect(() => {
    if (permissionResponse?.status !== 'granted') {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (permissionResponse?.status === 'granted') {
      loadLocalAssets();
    }
  }, [permissionResponse]);

  const loadLocalAssets = async () => {
    const assetPage = await MediaLibrary.getAssetsAsync();
    // console.log(JSON.stringify(assetPage, null, 2));
    setLocalAssets(assetPage.assets);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Google Photos' }} />

      <FlatList
        data={localAssets}
        numColumns={2}
        // columnWrapperStyle={{ gap: 2 }}
        // contentContainerStyle={{ gap: 2 }}
        columnWrapperClassName="gap-1"
        contentContainerClassName="gap-1"
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: '25%', aspectRatio: 1 }} />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
