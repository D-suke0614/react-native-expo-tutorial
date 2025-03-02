import { useState, type FC } from "react";
import { StyleSheet, View, type ImageSourcePropType } from "react-native";
import { registerRootComponent } from "expo";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

import { Button } from "@/components/button";
import { CircleButton } from "@/components/circle-button";
import { IconButton } from "@/components/icon-burtton";
import { ImageViewer } from "@/components/image-viewer";

const PlaceholderImage =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@/assets/images/background-image.png") as ImageSourcePropType;

const App: FC = () => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    //
  };

  const onSaveImageAsync = () => {
    //
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("not selected image");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="リセット" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="保存"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="写真を選択" onPress={pickImageAsync} />
          <Button
            label="この写真を使用"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

registerRootComponent(App);
