import { CapacitorConfig } from '@capacitor/cli';
import assetsConfig from './capacitor.assets.config';


const config: CapacitorConfig = {
  appId: 'com.minplats.app',
  appName: 'Min Platz App',
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
      splashImmersive: false
    },
    StatusBar: {
      style: "light",
      backgroundColor: "#ffffff",
      overlaysWebView: false
    }
  }
};

export default config;
