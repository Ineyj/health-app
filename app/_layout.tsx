import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as ExpoSplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"

export default function RootLayout() {
   const [fontsLoaded, fontError] = useFonts({
        "Manrope": require("../assets/fonts/Manrope-Regular.ttf"),
        "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
        "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
        "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
        "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
        "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
        "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
        "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    });

     useEffect(() => {
        if (fontsLoaded || fontError) {
            ExpoSplashScreen.hideAsync();
      
        }
    }, [fontsLoaded, fontError]);


  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "First Aid Quick Guide",
            headerStyle: { backgroundColor: "#ef4444" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="guide/[id]"
          options={{
            title: "Guide Details",
            headerStyle: { backgroundColor: "#ef4444" },
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </>
  )
}
