import * as React from "react";
import { View, Text } from "react-native";
import {
  Button,
  Colors,
  ActivityIndicator,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import globalStyles from "../styles";

function Loading({ navigation, visibleLoading, setVisibleLoading, message }) {
  return (
    <Portal>
      <Dialog visible={visibleLoading}>
        <Dialog.Title style={globalStyles.rightText}><Text>{message}</Text></Dialog.Title>
        <Dialog.Content
          style={[
            { display: "flex", flexDirection: "row", justifyContent: "center" },
          ]}>
          <Text style={[{ fontSize: 18, paddingRight: 10 }]}>
          טוען...{" "}
          </Text>
          <ActivityIndicator animating={true} color={Colors.green300} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export default Loading;
