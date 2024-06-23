import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

const paymentMethods = [
  {
    id: "1",
    cardType: "MasterCard",
    cardNumber: "**** **** **** 3947",
    cardHolder: "Jennyfer Doe",
    expiryDate: "05/23",
    isDefault: true,
  },
  {
    id: "2",
    cardType: "Visa",
    cardNumber: "**** **** **** 4546",
    cardHolder: "Jennyfer Doe",
    expiryDate: "11/22",
    isDefault: false,
  },
];

type CustomCheckBoxProps = {
  isChecked: boolean;
  onPress: () => void;
};

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  isChecked,
  onPress,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.checkbox}>
      {isChecked && <View style={styles.checkboxInner} />}
    </View>
  </TouchableWithoutFeedback>
);

const PayMethod = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment methods</Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View
              style={[
                styles.card,
                item.cardType === "MasterCard"
                  ? styles.masterCard
                  : styles.visa,
              ]}
            >
              <Text style={styles.cardNumber}>{item.cardNumber}</Text>
              <Text style={styles.cardHolder}>{item.cardHolder}</Text>
              <Text style={styles.expiryDate}>{item.expiryDate}</Text>
              <Image
                style={styles.cardLogo}
                source={
                  item.cardType === "MasterCard"
                    ? require("@/assets/icons/mastercard.png")
                    : require("@/assets/icons/visa.png")
                }
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CustomCheckBox
                isChecked={item.id === selectedId}
                onPress={() => setSelectedId(item.id)}
              />
              <Text style={styles.defaultText}>
                Use as default payment method
              </Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fdfbfb",
  },
  title: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  masterCard: {
    backgroundColor: "#131313",
  },
  visa: {
    backgroundColor: "#818189",
  },
  cardNumber: {
    fontSize: 18,
    color: "#fdfbfb",
    marginBottom: 8,
  },
  cardHolder: {
    fontSize: 14,
    color: "#fdfbfb",
  },
  expiryDate: {
    fontSize: 14,
    color: "#fdfbfb",
    marginBottom: 8,
  },
  cardLogo: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#818189",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#131313",
  },
  defaultText: {
    fontSize: 14,
    color: "#131313",
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "#f29c1d",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fdfbfb",
    fontSize: 24,
  },
});

export default PayMethod;
