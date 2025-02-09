import { StyleSheet, Image, Text, Platform, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View>
      <Text>explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
