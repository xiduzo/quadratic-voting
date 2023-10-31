import { useOAuth } from "@clerk/clerk-expo";
import React, { FC } from "react";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Button } from "./Button";

const SignInWithOAuth: FC<{
  strategy: "oauth_discord" | "oauth_apple" | "oauth_google";
}> = ({ strategy }) => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy });

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
      title={`Sign in with ${strategy.replace("oauth_", "")}`}
      onPress={handleSignInWithDiscordPress}
      endIcon="chevron-right"
    />
  );
};

export default SignInWithOAuth;
