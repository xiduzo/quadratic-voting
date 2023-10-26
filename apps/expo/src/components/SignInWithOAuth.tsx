import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Button } from "./Button";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_discord" });

  const handleSignInWithDiscordPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <Button
      title="Sign in with Discord"
      onPress={handleSignInWithDiscordPress}
      endIcon="chevron-right"
    />
  );
};

export default SignInWithOAuth;
