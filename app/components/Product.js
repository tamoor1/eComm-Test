import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Routes from "../routes";

const Product = ({ item }) => {
  const navigation = useNavigation();
  const { img, name } = item;
  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(Routes.Detail, { item })}>
      <View style={styles.width}>
        <Image resizeMode="contain" style={styles.image} source={{ uri: img }} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    alignItems: "center"
  },
  image: {
    height: 200,
    width: "100%"
  },
  name: {
    marginTop: 10,
    textAlign: "center"
  },
  width: {
    width: "100%"
  }
})

export default Product;