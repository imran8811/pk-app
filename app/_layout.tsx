import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
  <GestureHandlerRootView>
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(shop)" />
            <StatusBar style="auto" />
          </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  </GestureHandlerRootView>
)}
