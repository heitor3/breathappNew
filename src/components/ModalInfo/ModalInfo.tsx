import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import useModalHomeControl from "../../stores/modalHomeControl";
import { useThemeControl } from "../../stores/themeSetColor";
import Icon from "@react-native-vector-icons/material-design-icons";

type ModalProps = {
  width?: number;
  height?: number;
  children?: ReactNode;
};

export function ModalInfo({ width = 300, children }: ModalProps) {
  const { controlHomeModal, setControlHomeModal } = useModalHomeControl();
  const { theme } = useThemeControl();
  return (
    <Modal
      isVisible={controlHomeModal}
      onBackdropPress={() => setControlHomeModal(!controlHomeModal)}
      accessibilityLabel="Modal information"
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: theme.colors.primaryColor,
            padding: 20,
            borderRadius: 10,
            width: width,
          }}
        >
          <View
            style={{
              width: "100%",
              top: 0,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{ borderRadius: 50, padding: 6 }}
              onPress={() => setControlHomeModal(!controlHomeModal)}
            >
              <Icon name="close" color={theme.colors.textColor} size={22} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}
