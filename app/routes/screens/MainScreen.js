import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";

import { colors } from "../../colors";
import { useBasket, useProducts } from "../../hooks";
import Product from "../../components/Product";

export default MainScreen = ({ navigation }) => {
  const { products, getAllProducts } = useProducts();
  const { totalCounts } = useBasket();

  useEffect(() => {
    getAllProducts();
  }, [])

  const renderItem = ({ item }) => {
    return <Product item={item} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={(
          <View style={{ justifyContent: "center", alignItems: "center", padding: 10 }}>
            <Text>{`Total item in baasket: ${totalCounts || 0}`}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
              <View style={styles.button}>
                <Text>View Basket</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  button: {
    padding: 20,
    borderWidth: 1
  }
})