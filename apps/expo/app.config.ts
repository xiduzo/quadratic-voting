import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY = "pk_live_Y2xlcmsuc2FuZGVyYm9lci5ubCQ";

const version = "1.0.2"; // EAS VERSION
// Should be bumped every time a new build is made
const buildNumber = "31"; // EAS VERSION

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "votey",
  slug: "votey",
  scheme: "votey",
  version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#2F4858",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/5c6aa601-a9f2-4e03-bcd0-b35bb4509af6",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    buildNumber,
    supportsTablet: true,
    bundleIdentifier: "mdd.votey",
  },
  android: {
    versionCode: Number(
      version.replace(".", "").replace(".", "") + buildNumber,
    ),
    package: "mdd.votey",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2F4858",
    },
  },
  extra: {
    CLERK_PUBLISHABLE_KEY,
    eas: {
      projectId: "138e0374-578f-44ee-acaa-06ea7052c883",
      // projectId: "5c6aa601-a9f2-4e03-bcd0-b35bb4509af6", // xiduzo2
      // projectId: "2447171b-3c6c-4260-ad6a-655bcc2fdd0e", // Real Id
    },
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
