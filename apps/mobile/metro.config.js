const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// NativeWind temporarily disabled due to Windows path compatibility issues
// const { withNativeWind } = require('nativewind/metro');
// module.exports = withNativeWind(config, {
//   input: './global.css',
//   configPath: './tailwind.config.js'
// });

module.exports = config;
