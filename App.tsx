import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useThemeControl } from "./src/stores/themeSetColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Routes } from "./src/routes";
import { ThemeStyle } from "./src/global/styles/theme";
import useTranslateControl from "./src/stores/translateControl";
import { useTranslation } from "react-i18next";
import "./src/utils/i18n";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const getStatusBarStyle = (barStyle: ThemeStyle["bar"]): "light" | "dark" =>
  barStyle === "dark" ? "light" : "dark";

export default function App() {
  const { theme, toggleTheme } = useThemeControl();
  const { setTranslate } = useTranslateControl();
  const { i18n } = useTranslation();

  useEffect(() => {
    /**
     * Old React Native: had BackHandler.removeEventListener()
     * New React Native: removed this function (deprecated)
     * Some libraries: still try to use the old function
     */
    if (!require("react-native").BackHandler.removeEventListener) {
      require("react-native").BackHandler.removeEventListener = () => {};
    }

    const loadApp = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        toggleTheme(storedTheme === "dark" ? "dark" : "light");

        const storedLanguage = await AsyncStorage.getItem("translate");
        if (storedLanguage) {
          setTranslate(storedLanguage);
          await i18n.changeLanguage(storedLanguage);
        }

        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 3000);
      } catch {
        await SplashScreen.hideAsync();
      }
    };

    loadApp();
  }, []);

  return (
    <>
      <StatusBar style={getStatusBarStyle(theme.bar)} translucent />
      <Routes />
    </>
  );
}
