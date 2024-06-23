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
      <Text style={styles.subtitle}>Your payment cards</Text>
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
              <Image
                source={require("@/assets/icons/chip.png")}
                style={styles.chip}
              />
              <Text style={styles.cardNumber}>{item.cardNumber}</Text>
              <View style={styles.cardInfo}>
                <View>
                  <Text style={[styles.cardHolder, { fontSize: 12 }]}>
                    Card Holder Name
                  </Text>
                  <Text style={styles.cardHolder}>{item.cardHolder}</Text>
                </View>
                <View>
                  <Text style={[styles.expiryDate, { fontSize: 12 }]}>
                    Expiry Date
                  </Text>
                  <Text style={styles.expiryDate}>{item.expiryDate}</Text>
                </View>
                <Image
                  style={styles.cardLogo}
                  source={
                    item.cardType === "MasterCard"
                      ? require("@/assets/icons/mastercard.png")
                      : require("@/assets/icons/visa.png")
                  }
                />
              </View>
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
    paddingTop: 40,
    backgroundColor: "#fdfbfb",
  },
  title: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#131313",
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    padding: 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  chip: {
    width: 32,
    height: 32,
    marginBottom: 16,
    marginTop: 8,
  },
  masterCard: {
    backgroundColor: "#131313",
  },
  visa: {
    backgroundColor: "#818189",
  },
  cardNumber: {
    fontSize: 32,
    color: "#fdfbfb",
    marginBottom: 40,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHolder: {
    fontSize: 14,
    color: "#fdfbfb",
  },
  expiryDate: {
    fontSize: 14,
    color: "#fdfbfb",
  },
  cardLogo: {
    width: 32,
    height: 32,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
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
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "#fdfbfb",
    fontSize: 40,
    includeFontPadding: false,
  },
});

export default PayMethod;
