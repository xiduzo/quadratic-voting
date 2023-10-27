import { Stack } from "expo-router";
import { View } from "react-native";
import { Typography } from "../../../src/components/Typography";
import { trpc } from "../../../src/utils/trpc";
import { FlashList } from "@shopify/flash-list";

const EventResult = () => {
  const { data } = trpc.event.my.useQuery();

  return (
    <View className="bg-primary">
      <Stack.Screen
        options={{
          title: "Results",
          animation: "none",
          headerBackVisible: true,
        }}
      />

      <View className="mt-10 h-full w-full px-8">
        <FlashList
          data={data}
          estimatedItemSize={300}
          renderItem={({ item }) => <Typography>{item.title}</Typography>}
        />
      </View>
    </View>
  );
};

export default EventResult;
