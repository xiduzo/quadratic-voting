process.env.EXPO_ROUTER_APP_ROOT = "./src/app";

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["nativewind/babel", require.resolve("expo-router/babel")],
    presets: ["babel-preset-expo"],
  };
};
