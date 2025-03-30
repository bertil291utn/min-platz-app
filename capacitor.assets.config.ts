import { PluginsConfig } from '@capacitor/cli';

const config: PluginsConfig = {
  android: {
    source: 'public/favicon.ico',
    name: 'Min Platz App',
    backgroundImage: 'public/favicon.ico',
    backgroundColor: '#ffffff',
    adaptiveIcon: {
      foregroundImage: 'public/favicon.ico',
      backgroundColor: '#ffffff'
    }
  },
  ios: {
    source: 'public/favicon.ico',
    name: 'Min Platz App'
  }
};

export default config;