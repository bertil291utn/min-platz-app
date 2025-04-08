import { PluginsConfig } from '@capacitor/cli';

const config: PluginsConfig = {
  android: {
    source: 'public/favicon.ico',
    name: 'Florvis',
    backgroundImage: 'public/favicon.ico',
    backgroundColor: '#ffffff',
    adaptiveIcon: {
      foregroundImage: 'public/favicon.ico',
      backgroundColor: '#ffffff'
    }
  },
  ios: {
    source: 'public/favicon.ico',
    name: 'Florvis'
  }
};

export default config;