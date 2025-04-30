import React, {useState} from "react";
import {Alert, Image, ImageSourcePropType, Pressable, StyleSheet, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {MediaTypeOptions} from "expo-image-picker";

type ProfileImageProps = {
  initialImageSource?: ImageSourcePropType; // Accepts local OR remote image
  width?: number;
  height?: number;
  borderRadius?: number;
};

export const ProfileImage: React.FC<ProfileImageProps> = ({
                                                            initialImageSource,
                                                            width = 125,
                                                            height = 125,
                                                            borderRadius = 62.5,
                                                          }) => {
  const defaultImage = { uri: "https://via.placeholder.com/125" };
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(initialImageSource || defaultImage);

  const verifyPermissions = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow access to your media library to pick an image.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageSource({ uri: result.assets[0].uri });
    }
  };

  return (
      <Pressable onPress={pickImage}>
        <View style={[styles.container, { width, height, borderRadius }]}>
          <Image
              source={imageSource}
              style={[styles.image, { width: "100%", height: "100%" }]}
              onError={() => {
                Alert.alert("Image Load Error", "Failed to load the image. Reverting to default image.");
                setImageSource(defaultImage);
              }}
          />
        </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
});