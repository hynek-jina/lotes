const VERSION_CODE = 12
const VERSION = '24.1.2'

const versionString = `${VERSION} (${VERSION_CODE})`
export default {
  'expo': {
    'name': 'Lotes',
    'slug': 'lotes',
    'scheme': 'lotes',
    'version': VERSION,
    'orientation': 'portrait',
    'plugins': [['react-native-nfc-manager', {includeNdefEntitlement: false}]],
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
        'foregroundImage': './assets/icon.png',
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
