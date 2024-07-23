// screens/HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchProducts);
    return unsubscribe;
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    const filteredProducts = products.filter(product => product.id !== id);
    setProducts(filteredProducts);
    await AsyncStorage.setItem('products', JSON.stringify(filteredProducts));
  };

  const incrementQuantity = async (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const decrementQuantity = async (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const editProduct = (product) => {
    navigation.navigate('EditProduct', { product, quantity: product.quantity }); // Passando os dados para a tela de edição
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={editProduct}
            onDelete={deleteProduct}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
          />
        )}
      />
      <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
});

export default HomeScreen;
