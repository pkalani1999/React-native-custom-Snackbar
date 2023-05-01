import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";

type SnackBarData = {
  text: string | null;
  show: boolean;
  duration?: number;
  type?: "info" | "success" | "warning" | "error";
};

export const SnackBarInitialVal = {
  text: null,
  show: false,
  duration: 3000,
  type: "info",
} as SnackBarData;

interface SnackbarProps {
  visible: SnackBarData;
  setVisible: (values: SnackBarData) => void;
}
const Snackbar: React.FC<SnackbarProps> = ({ visible, setVisible }) => {
  const opacity = useState(new Animated.Value(0))[0];

  const backgroundColor =
    visible.type === "success"
      ? "#D4EDDA"
      : visible?.type === "error"
      ? "#f8d7dA"
      : "#f1eff9";
  const textColor =
    visible?.type === "success"
      ? "#155724"
      : visible?.type === "error"
      ? "#721c24"
      : "#6531c4";

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      hideSnackbar();
    }, visible?.duration);

    return () => clearTimeout(timeout);
  }, [visible, opacity]);

  const handleOnHide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setVisible(SnackBarInitialVal);
    });
  };

  const hideSnackbar = () => {
    handleOnHide();
  };

  if (!visible.show) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
      <TouchableOpacity onPress={hideSnackbar}>
        <Text style={[styles.text, { color: textColor }]}>{visible.text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 7,
    marginHorizontal: 10,
    marginVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default Snackbar;

// const [snackBar, setSnackBar] = useState(SnackBarInitialVal);
// <Snackbar visible={snackBar} setVisible={setSnackBar} />
