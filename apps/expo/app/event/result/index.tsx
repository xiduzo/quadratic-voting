import { Stack } from "expo-router";
import { View } from "react-native";
import { Typography } from "../../../src/components/Typography";
import { Navigation } from "../../../src/components/Navigation";

const EventResult = () => {
  return (
    <View className="bg-primary">
      <Stack.Screen
        options={{
          title: "Results",
          animation: "none",
          headerBackVisible: true,
        }}
      />
      <Navigation activeItem="results" />

      <View className="h-full w-full pt-12">
        <Typography>retuls</Typography>
      </View>
    </View>
  );
};

export default EventResult;
