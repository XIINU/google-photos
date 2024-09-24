import { StatusBar } from 'expo-status-bar';
import { Platform, Button } from 'react-native';
import { supabase } from '~/utils/supabase';

export default function Modal() {
  return (
    <>
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
