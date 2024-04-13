import React from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet } from 'react-native';
import { INGREDIENTS, NUTRITIONAL_INFORMATION, HOW_TO_PREPARE, DIETARY_INFORMATION, STORAGE_INFORMATION, EXTRA } from '../constants'; // Make sure to import the constants
import { productsData } from '../constants';

const ProductDetailPage = ({ route, navigation }) => {
  const { productId } = route.params;

  // Find the product data based on productId
  const product = productsData.find(product => product.id === productId);

  // Add a null check to ensure product is found
  if (!product) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No product found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={typeof product.image === 'string' ? { uri: product.image } : product.image}
          style={styles.image}
        />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text>{INGREDIENTS}: {product.ingredients}</Text>
        <Text>{NUTRITIONAL_INFORMATION}: {product.nutritionalInformation}</Text>
        <Text>{HOW_TO_PREPARE}: {product.howToPrepare}</Text>
        <Text>{DIETARY_INFORMATION}: {product.dietaryInformation}</Text>
        <Text>{STORAGE_INFORMATION}: {product.storageInformation}</Text>
        <Text>{EXTRA}: {product.extra}</Text>
        <Button title="Add to Cart" onPress={() => navigation.navigate('Cart', { product })} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ProductDetailPage;
