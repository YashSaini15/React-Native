import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import {PrimaryButton} from '../components/Button';
import RazorpayCheckout from 'react-native-razorpay';
export default function CartScreen({navigation}) {
  const paymentGateway = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.ibb.co/zfSmsCq/images-1.jpg',
      currency: 'INR',
      key: 'rzp_test_EZztRxxNLVKhAV',
      amount: '5000',
      name: 'Food Cart',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: 'email@gamil.com',
        contact: '9124212141',
        name: 'Yash Saini',
      },
      theme: {color: COLORS.primary},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  const CartItem = ({item}) => {
    return (
      <View style={style.cartItems}>
        <Image style={style.cartImage} source={item.image} />
        <View
          style={{height: 100, marginLeft: 10, paddingVertical: 13, flex: 1}}>
          <Text style={style.itemName}>{item.name}</Text>
          <Text style={{fontSize: 13}}>{item.ingredients}</Text>
          <Text style={style.itemPrice}>${item.price}</Text>
        </View>
        <View style={{marginRight: 6, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>2</Text>
          <View style={style.countBtn}>
            <Icon name="remove" style={{}} size={20} color={COLORS.white} />
            <Icon name="add" size={20} color={COLORS.white} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon
          onPress={navigation.goBack}
          style={{color: COLORS.dark}}
          name="arrow-back-ios"
          size={28}
        />
        <Text style={style.CartTitle}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={foods}
        renderItem={({item}) => <CartItem item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
                Total Price
              </Text>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
                $ 85.15
              </Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <PrimaryButton
                onPress={() => paymentGateway()}
                title="CHECKOUT"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  CartTitle: {
    // height: 50,
    top: -2,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  cartImage: {
    height: 70,
    width: 70,
  },
  cartItems: {
    height: 90,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  itemPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  countBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
