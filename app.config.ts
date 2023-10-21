const VERSION_CODE = 3
const VERSION = '23.9.1'

const versionString = `${VERSION} (${VERSION_CODE})`
export default {
  'expo': {
    'name': 'Lotes',
    'slug': 'lotes',
    'version': VERSION,
    'orientation': 'portrait',
    'plugins': ['react-native-nfc-manager'],
    'icon': './assets/icon.png',
    'userInterfaceStyle': 'light',
    'splash': {
      'image': './assets/splash.png',
      'resizeMode': 'contain',
      'backgroundColor': '#1B1917',
    },
    'updates': {
      'fallbackToCacheTimeout': 0,
    },
    'assetBundlePatterns': ['**/*'],
    'ios': {
      'buildNumber': String(VERSION_CODE),
      'supportsTablet': true,
      'bundleIdentifier': 'com.hynjin.lotesapp',
    },
    'android': {
      'versionCode': VERSION_CODE,
      'adaptiveIcon': {
        'foregroundImage': './assets/adaptive-icon.png',
        'backgroundColor': '#FFFFFF',
      },
      'permissions': ['android.permission.NFC'],
      'package': 'com.hynjin.lotesapp',
    },
    'web': {
      'favicon': './assets/favicon.png',
    },
    'extra': {
      'eas': {
        'projectId': '4ac6fbbf-2dbb-45d9-88ca-234fa8d92d9d',
      },
      versionString,
      version: VERSION,
      versionCode: VERSION_CODE,
    },
    'owner': 'lotesapp',
  },
}
