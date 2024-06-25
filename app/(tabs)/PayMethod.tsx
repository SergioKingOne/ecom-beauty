import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  Button,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [newCard, setNewCard] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  const handleAddCard = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Add new card</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Name on card"
                    // placeholder color #BDBDBD
                    placeholderTextColor={"#BDBDBD"}
                    value={newCard.cardHolder}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, cardHolder: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Card number"
                    placeholderTextColor={"#BDBDBD"}
                    value={newCard.cardNumber}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, cardNumber: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Expire Date"
                    placeholderTextColor={"#BDBDBD"}
                    value={newCard.expiryDate}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, expiryDate: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    placeholderTextColor={"#BDBDBD"}
                    value={newCard.cvv}
                    onChangeText={(text) =>
                      setNewCard({ ...newCard, cvv: text })
                    }
                  />
                  <View style={styles.checkboxContainer}>
                    <CustomCheckBox
                      isChecked={newCard.isDefault}
                      onPress={() =>
                        setNewCard({
                          ...newCard,
                          isDefault: !newCard.isDefault,
                        })
                      }
                    />
                    <Text style={styles.defaultText}>
                      Set as default payment method
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleAddCard}
                  >
                    <Text style={styles.modalButtonText}>ADD CARD</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 16,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 18,
    marginBottom: 26,
    fontSize: 18,
    borderRadius: 3,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    elevation: 2,
  },
  modalButton: {
    backgroundColor: "#f29c1d",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fdfbfb",
    fontSize: 18,
  },
});

export default PayMethod;
