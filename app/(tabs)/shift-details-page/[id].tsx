import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { weekdays, months } from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from '@/constants/Colors'
import { useShiftNavigation } from "@/app/shift-navigation";

export default function ShiftDetailsPage() {
  const item = useLocalSearchParams();
  console.log('item', item);
  const colorScheme = useColorScheme() || 'light';
  const adminLogin: boolean = true; // TODO: remove after merging with the backend 
  const currentShiftId = parseInt(item.id as string);

  const { currentShift, goToPreviousShift, goToNextShift } = useShiftNavigation(currentShiftId);

  const date = currentShift ? new Date(currentShift.date) : new Date();
  console.log('date', date);

  const day = date.getDate();
  const month = months()[date.getMonth()];
  const dayOfWeek = weekdays()[date.getDay()];
  const formattedDate = `${dayOfWeek}, ${month} ${day}`

  //Convert 24 hour time to 12 hour time
  const convertTo12Hour = (time: string) => {
    const [hour, minute] = time.split(':');
    date.setHours(parseInt(hour), parseInt(minute));
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }

  type PressableIconProps = {
    name: keyof typeof Ionicons.glyphMap;
    size?: number;
    onPress: () => void
  };
  type ShiftRequestButtonProps = {
    text: string;
    onPress: () => void;
  }
  type ShiftDetailItemProps = {
    title: string;
    value: any;
    custom?: any;
  }
  const PressableIcon = ({ name, size = 20, onPress }: PressableIconProps) => {
    return (
      <Pressable onPress={onPress}>
        <Ionicons
          size={size}
          name={name}
          color={Colors[colorScheme].text}
        />
      </Pressable>
    )
  }
  const ShiftRequestButton = ({ text, onPress }: ShiftRequestButtonProps) => {
    return (
      <Pressable onPress={onPress} style={[styles.button, { backgroundColor: Colors[colorScheme].text, }]}>
        <Text style={{ color: colorScheme == 'light' ? Colors.dark.text : Colors.light.text }}>
          {text}
        </Text>
      </Pressable>
    )
  }
  const ShiftDetailItem = ({ title, value, custom }: ShiftDetailItemProps) => {

    return (
      <View style={[styles.itemContainer, custom]}>
        <Text style={custom}>{title}:</Text>
        <Text style={custom}>{value}</Text>
      </View>
    )
  }
  return (
    <ThemedView style={styles.container}>
      {adminLogin ? (
        <View style={styles.dateHeader}>
          <PressableIcon name={'arrow-back'} onPress={goToPreviousShift} />
          <ThemedText type={'default'}>Shift Details</ThemedText>
          <PressableIcon name={'arrow-forward'} onPress={goToNextShift} />
        </View>
      ) : (
        <View style={styles.dateHeader}>
          <PressableIcon name={'arrow-back'} onPress={goToPreviousShift} />
          <ThemedText type={'default'}>{formattedDate}</ThemedText>
          <PressableIcon name={'arrow-forward'} onPress={goToNextShift} />
        </View>
      )}
      {adminLogin ? (
        <ThemedView style={styles.detailsContainer} >
          <Text style={{ alignSelf: 'center', fontWeight: '500', fontSize: 18 }}>
            {formattedDate}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingInline: 2 }}>
            <View>
              <ShiftDetailItem title={'Scheduled'} value={''} custom={styles.alignCenter} />
              <Text style={{ fontSize: 12, fontWeight: '400' }}>
                {item.title}
              </Text>
            </View>
            <View>
              <ShiftDetailItem title={'Status'} value={''} custom={styles.alignCenter} />
              <Text style={{ fontSize: 12, fontWeight: '400' }}>
                {item.needs_coverage ? 'Needs Coverage' : 'No Coverage Needed'}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <ShiftDetailItem title={'Time'} value={`${convertTo12Hour(`${item.startTime}`)} - ${convertTo12Hour(`${item.endTime}`)}`} custom={{ paddingBlock: 5 }} />
            <ShiftDetailItem title={'Hours Scheduled'} value={'8 hours'} />
          </View>
          <ShiftDetailItem title={'Person Covering'} value={item.assignedUser} />
          <ShiftDetailItem title={'Role'} value={item.role} />
          <ShiftDetailItem title={'Supervisor'} value={item.supervisorId} />
          <ShiftDetailItem title={'Coverage Reason'} value={''} custom={{ padding: 0, marginBottom: -6 }} />
          <Text style={{ paddingInline: 16, fontSize: 12 }}>
            Coworker A stubbed his toe in a barefoot race & coworker B is home sick with a mild fever and will be unable to attend work for the next 3 days.
          </Text>
        </ThemedView>
      ) : (
        <ThemedView style={styles.detailsContainer}>
          <Text style={{ alignSelf: 'center', fontWeight: '500', fontSize: 18 }}>
            Shift Details
          </Text>
          <ShiftDetailItem title={'Hours Scheduled'} value={'8 hours'} />
          <ShiftDetailItem title={'Time'} value={`${item.startTime} - ${item.endTime}`} />
          <ShiftDetailItem title={'Role'} value={item.role} />
          <ShiftDetailItem title={'Building'} value={`${item.building} - ${item.roomNumber}`} />
          <ShiftDetailItem title={'Supervisor'} value={''} />
          <ShiftDetailItem title={'Coworkers'} value={''} />
        </ThemedView>
      )}
      {adminLogin ? (
        <ThemedView style={{ flexDirection: 'row', gap: 25 }}>
          <ShiftRequestButton onPress={() => console.log('accept shift')} text={'ACCEPT'} />
          <ShiftRequestButton onPress={() => console.log('decline shift')} text={'DECLINE'} />
        </ThemedView>
      ) : (
        <ThemedView style={{ flexDirection: 'row', gap: 25 }}>
          <ShiftRequestButton onPress={() => console.log('give up shift')} text={'GIVE UP SHIFT'} />
          <ShiftRequestButton onPress={() => console.log('take shift')} text={'TAKE SHIFT'} />
        </ThemedView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 50,
  },
  detailsContainer: {
    alignItems: "flex-start",
    borderRadius: 10,
    width: 300,
    backgroundColor: "#eee",
    padding: 25,
    paddingBottom: 20,
    gap: 18,
  },
  dateHeader: {
    alignItems: 'center',
    height: 80,
    width: "75%",
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    padding: 12,
    borderRadius: 5
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    fontSize: 16
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})