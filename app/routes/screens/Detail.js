import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBasket, useProducts } from "../../hooks";
import { colors } from "../../colors";

export default Detail = ({ route: { params }, navigation }) => {
  const item = params.item || {};

  const [productDetail, setProductDetail] = useState({});
  const [count, setCount] = useState(0);

  const { getProductDetail } = useProducts()
  const { addItemToBasket } = useBasket();

  useEffect(() => {
    getProductDetail(item.id)
      .then(res => setProductDetail(res))
      .catch(err => console.log(err.message))
  }, [])

  return !!Object.keys(productDetail).length && (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Image resizeMode="contain" source={{ uri: productDetail.img }} style={styles.image} />
        <Text style={styles.name}>{productDetail.name}</Text>
        <Text style={styles.price}>Rs. {productDetail.price}</Text>

        <View style={styles.row}>
          <View style={styles.rowCenter}>
            <TouchableOpacity disabled={count <= 0} onPress={() => setCount(_ => _ - 1)}>
              <View style={styles.button}>
                <Text>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 24 }}>{count}</Text>
            <TouchableOpacity onPress={() => setCount(_ => _ + 1)}>
              <View style={styles.button}>
                <Text>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              addItemToBasket(item, count);
              Alert.alert(
                'Success',
                'Item added to basket',
                [
                  { text: "Ok", onPress: () => navigation.goBack() }
                ]
              )
            }}>
            <View style={styles.button}>
              <Text>Add To Basket</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  image: {
    height: 400,
    width: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    backgroundColor: colors.button,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20
  },
  row: {
    flexDirection: "row"
  },
  rowCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
})