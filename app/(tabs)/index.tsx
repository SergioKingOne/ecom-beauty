import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/product";
import { StackNavigationProp } from "@react-navigation/stack";
import Colors from "@/constants/Colors";

type RootStackParamList = {
  ProductDetails: { productId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProductDetails">;

const categories = ["All", "Skincare", "Cosmetics", "Fragrance"];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, [fadeAnim]);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    // Optionally, filter products based on the selected category here
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/search.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.logoText}>D'SANDRA</Text>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/shopping-bag.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { productId: item.id })
            }
          />
        )}
        numColumns={1}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>WHAT'S NEW?</Text>
            <View style={styles.heroImageContainer}>
              <Image
                source={{
                  uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/beauty-salon%2C-hair-salon%2C-beauty-parlor%2C-spa-design-template-b60f0b5ad0515a82992e75212468e144_screen.jpg?ts=1698336658",
                }}
                style={styles.heroImage}
              />
            </View>
            <View style={styles.featuredSection}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/selfcare-products-flowers-arrangement_23-2149249576.jpg?t=st=1718250433~exp=1718254033~hmac=0368cf1ed7d61001bb58993ba0338f7d89b9a5c352f67875c15b2187a5ef7405&w=740",
                }}
                style={styles.featuredImage}
              />
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/3d-rendering-personal-care-products-fondant-pink_23-2151053857.jpg?t=st=1718250495~exp=1718254095~hmac=cbdf5cd9ed7b80146d5dbf401478df1ba7816101a18c1eb00211ffebb4acf9c6&w=1380",
                }}
                style={styles.featuredImage}
              />
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/3d-rendering-personal-care-products-fondant-pink_23-2151053829.jpg?t=st=1718250592~exp=1718254192~hmac=b0e71aa6a5b5d18ddf2997d75a3beea8980b9497001596340a0a4aac27bfdacf&w=740",
                }}
                style={styles.featuredImage}
              />
            </View>
            <Text style={styles.subTitle}>SKINCARE COMBO</Text>
            <Text style={styles.description}>
              Explore an unrivaled selection of makeup, skincare, hair,
              fragrance & more from classic & emerging brands.
            </Text>
          </>
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  logoText: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    height: 24,
    width: 24,
    marginLeft: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  categoryButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedCategoryButton: {
    backgroundColor: "#131313",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#131313",
  },
  selectedCategoryText: {
    color: "#ffffff",
  },
  sectionTitle: {
    fontSize: 48,
    fontFamily: "Glorious",
    color: "#131313",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  heroImageContainer: {
    padding: 16,
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  featuredSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  featuredImage: {
    width: "32%",
    height: 150,
    borderRadius: 10,
  },
  subTitle: {
    fontSize: 32,
    fontFamily: "Glorious",
    color: "#131313",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  description: {
    fontSize: 16,
    color: "#818189",
    paddingHorizontal: 16,
    paddingTop: 8,
    lineHeight: 22,
  },
});

export default HomeScreen;
