import React from "react";
import { useRef } from "react";
import { ThemedText } from '@/components/ThemedText';
import { notificationDummyData } from "@/data/dummyNotificationData";
import { Image, StyleSheet, Animated, Platform, View, Text, Button, Dimensions } from "react-native";

import { NotificationTile } from "@/components/NotificationTile"
const { height } = Dimensions.get("window")

export default function NotificationsPage() {

  const scrollAnim = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.pageContainer}>
      <ThemedText
            style={styles.title}
            type="title"
        >
          Notifications
      </ThemedText>

      <Animated.FlatList
        style={styles.notificationList}
        data={notificationDummyData}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: {y: scrollAnim } } }],
          {
            useNativeDriver: true,
          },
        )}
        renderItem={({ index, item}) => (
          <NotificationTile notification={item} index={index} scrollSet={scrollAnim}/>
        )}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  title: {
    marginVertical: 16,
    marginHorizontal: "auto",
  },
  notificationList: {
    maxHeight: height * 0.8,
  }
});
