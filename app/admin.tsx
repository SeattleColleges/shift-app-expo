import Footer from "@/components/Footer";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const userName = "user_name";

export default function AdminDashboard() {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <View><Text>Hi!, {userName}!</Text></View>
        </View>
        <View style={styles.border}>
          <View style={styles.schedule}>
            <View style={styles.grid}>
              <View style={{paddingRight: 10}}>
                <Feather name="plus-circle" size={24} color="green" />
                <Feather name="alert-circle" size={24} color="red" />
              </View>
              <View style={styles.txt}>
                <View style={{ marginLeft: 10 }}>
                  <Text>Create Schedule</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text>Review time off requests</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonCont}>
            <Pressable style={styles.button}>
                <Text style={styles.buttonTxt}>Log out</Text>
            </Pressable>
        </View>
      </ScrollView>
      <View>
        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  border: {
    borderColor: "#80808",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 140,
    marginTop: 40,
  },
  schedule: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
  },
  txt: {
    justifyContent: "space-around"
  },
  image: {
    width: "100%",
    backgroundColor: "#0553",
  },
  buttonCont: {
    marginTop: 200,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: 140,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTxt: {
    color: "#fff",
    alignSelf: "center",
  },
});
