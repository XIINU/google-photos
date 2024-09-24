import { Stack } from 'expo-router';
import '../global.css';
import MediaContextProvider from '~/providers/MediaProvider';
import AuthContextProvider from '~/providers/AuthProvider';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MediaContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </MediaContextProvider>
    </AuthContextProvider>
  );
}
