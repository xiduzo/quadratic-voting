import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import type { ViewToken } from "@shopify/flash-list";
import { Typography } from "../src/components/Typography";
import { Event } from "../src/components/Event";
import { trpc } from "../src/utils/trpc";
import { IconButton } from "../src/components/Button";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "event",
};

const EventPage = () => {
  const { data: latest } = trpc.event.latest.useQuery();
  const { data: trending } = trpc.event.trending.useQuery();

  const { push } = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleViewableItemsChanged = useCallback(
    (props: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const activeItems = props.viewableItems.filter((item) => item.isViewable);
      const isFirstItemVisible = activeItems[0]?.index === 0;
      const newIndex =
        activeItems.length === 3 ? 1 : isFirstItemVisible ? 0 : 2;
      setActiveIndex(newIndex);
    },
    [setActiveIndex],
  );

  const snapToAlignment = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return "start";
      case 1:
        return "center";
      case 2:
        return "end";
      default:
        return "start";
    }
  }, [activeIndex]);

  return (
    <View className="bg-primary">
      <Stack.Screen
        options={{
          title: "Events",
          animation: "none",
          headerRight: () => (
            <IconButton icon="user" onPress={() => push("/account")} />
          ),
        }}
      />
      <View className="h-full w-full">
        <Typography intent="2xl" className="mb-4 mt-8 px-8">
          New
        </Typography>
        {latest && (
          <FlashList
            estimatedItemSize={250}
            extraData={{ activeIndex, latest }}
            decelerationRate="fast"
            // snapToInterval={Dimensions.get("window").width * 0.6}
            onViewableItemsChanged={handleViewableItemsChanged}
            snapToAlignment={snapToAlignment}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}
            data={latest}
            renderItem={({ item, index }) => (
              <Event
                onPress={() => push(`/event/${item.id}`)}
                key={item.id}
                numberOfLines={4}
                isActive={activeIndex === index}
                extraClass="min-w-[60vw] max-w-[60vw] mx-4 h-[30vh] mb-4"
                maxTokens={item.credits ?? 100}
                {...item}
              />
            )}
          />
        )}

        <View className="my-4 flex w-full flex-row justify-center space-x-2">
          {Array.from({ length: (latest ?? []).length }).map((_, index) => (
            <View
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? "bg-slate-400" : "bg-slate-600"
              }`}
              key={index}
            />
          ))}
        </View>
        <Typography intent="2xl" className="mb-4 mt-0 px-8">
          Trending
        </Typography>
        <View className="space-between flex w-full flex-row space-x-4 px-8">
          {trending?.map((item) => (
            <Event
              onPress={() => push(`/event/${item.id}`)}
              key={item.id}
              size="sm"
              numberOfLines={3}
              extraClass="grow w-[48%]"
              maxTokens={item.credits ?? 100}
              {...item}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default EventPage;
