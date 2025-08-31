import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SessionProvider, useSession } from '../ctx';
import { SplashScreenController } from '../splash';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

// Separate this into a new component so it can access the SessionProvider context later
function RootNavigator() {
  const { session } = useSession();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, paddingTop: 50}}>
          <Stack screenOptions={{headerShown: true}}></Stack>
          <StatusBar style="dark" />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

