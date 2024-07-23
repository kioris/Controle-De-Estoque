// screens/EditProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProductScreen = ({ route, navigation }) => {
  const { product, quantity } = route.params;
  const [name, setName] = useState(product.name);
  const [productQuantity, setProductQuantity] = useState(quantity.toString());

  const editProduct = async () => {
    const updatedProduct = { ...product, name, quantity: parseInt(productQuantity) };
    // Atualize o produto no armazenamento
    const storedProducts = await AsyncStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Quantity</Text>
      <TextInput
        style={styles.input}
        value={productQuantity}
        onChangeText={setProductQuantity}
        keyboardType="numeric"
      />
      <Button title="Salvar Alterações" onPress={editProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EditProductScreen;
