import { Stack } from "expo-router";
import { View } from "react-native";
import { trpc } from "../../../src/utils/trpc";
import { EventResult } from "../../../src/components/EventResult";
import { FlashList } from "@shopify/flash-list";

const Results = () => {
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

      <View className="h-full w-full">
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingVertical: 64,
          }}
          data={data}
          ItemSeparatorComponent={() => <View className="h-10" />}
          estimatedItemSize={300}
          renderItem={({ item }) => <EventResult key={item.id} {...item} />}
        />
      </View>
    </View>
  );
};

export default Results;
