import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";

const FiltersScreen = () => {
  const [priceRange, setPriceRange] = useState([78, 143]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const colors = ["#131313", "#818189", "#f29c1d", "#fdfbfb"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const categories = ["All", "Skincare", "Cosmetics", "Fragrance"];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Filters</Text>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Price range</Text>
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

        <View style={styles.section}>
          <Text style={styles.subHeader}>Colors</Text>
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

        <View style={styles.section}>
          <Text style={styles.subHeader}>Sizes</Text>
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

        <View style={styles.section}>
          <Text style={styles.subHeader}>Category</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fdfbfb",
  },
  header: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "Glorious",
    color: "#131313",
    marginBottom: 8,
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
    marginTop: 16,
  },
  discardButton: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: "#818189",
  },
  applyButton: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: "#f29c1d",
  },
  buttonText: {
    color: "#fdfbfb",
    fontSize: 16,
    fontFamily: "Glorious",
  },
});

export default FiltersScreen;
