import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { View } from "react-native";
import { trpc } from "../../src/utils/trpc";
import { Button } from "../../src/components/Button";
import { Typography } from "../../src/components/Typography";

const AccountPage = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const { mutateAsync } = trpc.auth.requestAccountDeletion.useMutation({
    onSuccess: () => {
      signOut();
    },
  });

  return (
    <View className="bg-primary">
      <Stack.Screen
        options={{
          title: "Account",
          animation: "none",
        }}
      />
      <View className="h-full w-full space-y-4 px-8 pt-12">
        <Typography intent="3xl">{user?.username}</Typography>
        <Button onPress={() => signOut()} title="Sign out" />
        <Button
          onPress={() => mutateAsync()}
          title="Delete my account"
          intent="error"
        />
      </View>
    </View>
  );
};

export default AccountPage;
