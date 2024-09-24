import { View, Text, Image } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMedia } from '~/providers/MediaProvider';
import AntDesign from '@expo/vector-icons/AntDesign';

const AssetPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getAssetById } = useMedia();

  const asset = getAssetById(id);
  //   console.log(JSON.stringify(asset, null, 2));

  if (!asset) return <Text>No asset found</Text>;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Photo',
          headerRight: () => <AntDesign name="cloudupload" size={24} color="black" />,
        }}
      />
      {asset && (
        <Image source={{ uri: asset.uri }} className="h-full w-full" resizeMode="contain" />
      )}
    </>
  );
};

export default AssetPage;
