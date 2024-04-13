import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const CartPage = ({ route }) => {
  const { cartItems } = route.params;

  const initialQuantities = Array(cartItems.length).fill(1);
  const [quantities, setQuantities] = useState(initialQuantities);

  // Function to handle quantity changes
  const handleQuantityChange = (index, increment) => {
    const newQuantities = [...quantities];
    newQuantities[index] += increment ? 1 : -1;
    if (newQuantities[index] < 1) newQuantities[index] = 1; 
    setQuantities(newQuantities);
  };

  // Function to calculate total price
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((product, index) => {
      totalPrice += product.price * quantities[index];
    });
    return totalPrice;
  };

  // Function to calculate total quantity
  const getTotalQuantity = () => {
    let totalQuantity = 0;
    quantities.forEach(quantity => {
      totalQuantity += quantity;
    });
    return totalQuantity;
  };

  // Function to handle checkout
  const handleCheckout = () => {
    console.log('Checkout button pressed');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {cartItems && cartItems.map((product, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={product.image} style={styles.image} />
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(index, false)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantities[index]}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(index, true)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.total}>Total: ${(product.price * quantities[index]).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text>Total Quantity: {getTotalQuantity()}</Text>
        <Text>Total Price: ${getTotalPrice().toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  total: {
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartPage;

