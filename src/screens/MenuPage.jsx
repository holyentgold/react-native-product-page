import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { productsData } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const MenuPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]); // State to track cart items
  
  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <Button title="View Details" onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
      <Button title="Add to Cart" color="red" onPress={() => handleAddToCart(item)} />
    </View>
  );

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]); // Add selected product to cart items
    navigation.navigate('Cart', { cartItems }); // Navigate to Cart with cart items
  };

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 24) / 2 - 16;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a product"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        style={{ flex: 1 }}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Icon name="list" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { cartItems })}>
          <Icon name="shopping-cart" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Icon name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 8,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  productName: {
    fontWeight: 'bold',
  },
  productPrice: {
    color: 'green',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
});

export default MenuPage;
