import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../colors";
import { useBasket } from "../../hooks";

export default Basket = ({ route: { params }, navigation }) => {
  const { basket, totalBasketPrice, addItemToBasket, removeItemFromBasket } = useBasket();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{`Total Amount: RS ${totalBasketPrice || 0}`}</Text>
      </View>
      <FlatList
        data={basket}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <Image resizeMode="contain" source={{ uri: item.img }} style={styles.image} />
              <Text>{item.name}</Text>
              <Text style={{ borderWidth: 1 }}>RS. {item.price}</Text>
              <View style={[styles.color, { backgroundColor: item.colour?.toLowerCase() || undefined }]} />

              <View style={styles.row}>
                <View style={styles.rowCenter}>
                  <TouchableOpacity
                    disabled={item.count <= 0}
                    onPress={() => {
                      addItemToBasket(item, -1)
                      if (item.count <= 0) removeItemFromBasket(item);
                    }}>
                    <View style={styles.button}>
                      <Text>-</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 24 }}>{item.count}</Text>
                  <TouchableOpacity onPress={() => addItemToBasket(item, 1)}>
                    <View style={styles.button}>
                      <Text>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
      />
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
  color: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.background,
    borderColor: colors.white,
    borderWidth: 2
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
  },
  header: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  }
})