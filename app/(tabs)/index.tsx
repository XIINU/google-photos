import { Stack } from 'expo-router';
import { StyleSheet, FlatList, Image } from 'react-native';
import { useMedia } from '~/providers/MediaProvider';

export default function Home() {
  const { assets, loadLocalAssets } = useMedia();

  return (
    <>
      <Stack.Screen options={{ title: 'Google Photos' }} />

      <FlatList
        data={assets}
        numColumns={4}
        columnWrapperClassName="gap-1"
        contentContainerClassName="gap-1"
        onEndReached={loadLocalAssets}
        onEndReachedThreshold={1}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: '24%', aspectRatio: 1 }} />
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
