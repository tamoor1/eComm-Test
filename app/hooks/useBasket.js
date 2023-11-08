import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from "@react-navigation/native";

const useBasket = () => {

  const isFocused = useIsFocused()

  const [basket, setBasket] = useState([]);

  useEffect(() => {
    // whenever this hook is attached we will fetch updated basket
    getBasket();
  }, [isFocused])

  const saveBasket = (_basket) => {
    AsyncStorage.setItem('basket', JSON.stringify(_basket));
  }

  const getBasket = () => {
    AsyncStorage.getItem('basket').then(res => {
      try {
        const basket = JSON.parse(res);
        setBasket(basket || []);
      } catch (err) {
        setBasket([]);
        console.log(err.message)
      }
    })
  }

  const addItemToBasket = (item, count) => {
    setBasket((prev) => {
      const _basket = [...prev];
      const findItemIndex = _basket.findIndex(basketItem => basketItem.id === item.id);
      if (findItemIndex !== -1) {
        _basket[findItemIndex].count += count;
      } else {
        _basket.push({ ...item, count });
      }
      saveBasket(_basket);
      return _basket;
    })
  }

  const removeItemFromBasket = (item) => {
    setBasket((prev) => {
      const _basket = [...prev.filter(basketItem => basketItem.id !== item.id)];
      saveBasket(_basket);
      return _basket;
    })
  }

  return {
    basket,
    totalBasketPrice: basket?.reduce((curr, prev) => curr += (prev.count * prev.price), 0).toFixed(2),
    totalCounts: basket.length || 0,

    getBasket,
    addItemToBasket,
    removeItemFromBasket
  }
}

export default useBasket;