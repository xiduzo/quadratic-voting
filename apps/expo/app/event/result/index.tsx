import { Stack } from "expo-router";
import { View } from "react-native";
import { trpc } from "../../../src/utils/trpc";

const EventResult = () => {
  const { data } = trpc.event.my.useQuery();

  console.log({ data });

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
        {/* <FlashList
          data={data}
          estimatedItemSize={300}
          renderItem={({ item }) => <EventResult key={item.id} {...item} />}
        /> */}
      </View>
    </View>
  );
};

export default EventResult;
