import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import { ThemedIcon } from "@/components/ThemedIcon";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export type RootStackParamList = {
  Products: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Products">;

const FiltersScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [priceRange, setPriceRange] = useState([78, 143]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const colors = ["#131313", "#818189", "#f29c1d", "#fdfbfb"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const categories = ["All", "Skincare", "Cosmetics", "Fragrance"];

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ThemedIcon name="chevron-back" size={32} />
      </TouchableOpacity>
      <ThemedText style={styles.header}>Filters</ThemedText>
      <ScrollView>
        <ThemedText style={styles.subHeader}>Price range</ThemedText>
        <View style={styles.section}>
          <View style={styles.sliderContainer}>
            <Text style={styles.price}>${priceRange[0]}</Text>
            <Slider
              style={styles.slider}
              minimumValue={78}
              maximumValue={143}
              step={1}
              value={priceRange[0]}
              onValueChange={(value) => setPriceRange([value, priceRange[1]])}
            />
            <Text style={styles.price}>${priceRange[1]}</Text>
            <Slider
              style={styles.slider}
              minimumValue={78}
              maximumValue={143}
              step={1}
              value={priceRange[1]}
              onValueChange={(value) => setPriceRange([priceRange[0], value])}
            />
          </View>
        </View>

        <ThemedText style={styles.subHeader}>Colors</ThemedText>
        <View style={styles.section}>
          <View style={styles.optionsContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedOption,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        <ThemedText style={styles.subHeader}>Sizes</ThemedText>
        <View style={styles.section}>
          <View style={styles.optionsContainer}>
            {sizes.map((size, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.selectedOption,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.optionText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ThemedText style={styles.subHeader}>Category</ThemedText>
        <View style={styles.section}>
          <View style={styles.optionsContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryOption,
                  selectedCategory === category && styles.selectedOption,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.optionText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.discardButton}>
            <Text style={styles.buttonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious",
    marginBottom: 16,
    position: "absolute",
    top: 40,
    left: 60,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    elevation: 2,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 16,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "#131313",
    width: 50,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 4,
    borderWidth: 2,
    borderColor: "#fdfbfb",
  },
  sizeOption: {
    padding: 10,
    borderRadius: 4,
    margin: 4,
    backgroundColor: "#fdfbfb",
    borderWidth: 1,
    borderColor: "#818189",
  },
  categoryOption: {
    padding: 10,
    borderRadius: 4,
    margin: 4,
    backgroundColor: "#fdfbfb",
    borderWidth: 1,
    borderColor: "#818189",
  },
  optionText: {
    color: "#131313",
    fontSize: 16,
    fontFamily: "Glorious",
  },
  selectedOption: {
    borderColor: "#f29c1d",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  discardButton: {
    padding: 16,
    paddingHorizontal: 48,
    borderRadius: 4,
    backgroundColor: "#818189",
  },
  applyButton: {
    padding: 16,
    paddingHorizontal: 60,
    borderRadius: 4,
    backgroundColor: "#f29c1d",
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: "#fdfbfb",
    fontSize: 16,
    fontFamily: "Glorious",
  },
});

export default FiltersScreen;
