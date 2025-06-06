import { Animated, StyleSheet, Text, View } from "react-native";

// import { Notification } from "@/db/schema";
// For future of the app, need to import the schema for the notifications in the db to replace the following type alias "Notification"
type Notification = {
  id: number;
  message: string;
  dateTime: string;
};

type Props = {
  notification: Notification;
  index: number;
  scrollSet: Animated.Value;
};

const PADDING = 10;
const MARGIN = 6;
const IMAGE = 70;
const SIZE = IMAGE + PADDING * 3;

export function NotificationTile(props: Props) {
  const { notification, index, scrollSet } = props;
  const { id, dateTime, message } = notification;
  const date = new Date(notification.dateTime).toDateString();
  const localTime = new Date(notification.dateTime).toLocaleTimeString("en-US");
  const time = localTime.slice(0,-6) +" " + localTime.slice(-2); //remove seconds

  const inputRange = [-1, 0, SIZE * index, SIZE * (index + 3)];
  const scale = scrollSet.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 1],
  });

  return (
    <View>
      <View style={styles.timerow}>
        <Text style={styles.dateTime}> {date} {time}</Text>
      </View>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.row}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: PADDING,
    margin: MARGIN,
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 15,
    width: 380,
    gap: 10,
  },
  timerow: {
    marginLeft: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#1E1E1E",
  },
  dateTime: {
    fontSize: 14,
    color: "#999",
  },
  zip: {
    color: "#999",
  },
  external: {
    color: "green",
  },
  linkButton: {
    alignSelf: "flex-end",
  },
  message: {
    fontSize: 18,
    color: "black",
    paddingTop: MARGIN,
    paddingBottom: MARGIN,
  }
});
