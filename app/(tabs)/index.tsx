import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  Text,
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

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

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

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.logoText}>D'ALMA</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image
              source={require("@/assets/icons/search.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("@/assets/icons/shopping-bag.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        {["All", "Skincare", "Cosmetics", "Fragrance"].map((category) => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>WHAT'S NEW?</Text>
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
      />
      <View style={styles.footer}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/home.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/heart.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/menu.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/user.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbfb",
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
  categoryText: {
    fontSize: 14,
    fontFamily: "Glorious",
    color: "#131313",
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Glorious",
    color: "#131313",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
});

export default HomeScreen;
