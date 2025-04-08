import { CapacitorConfig } from '@capacitor/cli';
import assetsConfig from './capacitor.assets.config';

const config: CapacitorConfig = {
  appId: 'com.minplats.app',
  appName: 'Florvis',
  webDir: 'dist',
  ...assetsConfig,
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      androidSplashResourceName: "splash",
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: "launch_screen",
    },
    StatusBar: {
      overlaysWebView: false,
      style: "DEFAULT",
      backgroundColor: "#000000",
    },
  },
  android: {
    backgroundColor: "transparent"
  }
};

export default config;
