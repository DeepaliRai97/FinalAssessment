import React from 'react';
import {View,FlatList,Text,StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = props => {
       const orders = useSelector(state=>state.orders.orders);
       return (
       <View>
           <Text style={styles.order}> Your Orders</Text>
       <FlatList
       data={orders}
       keyExtractor={item=>item.id}
       renderItem={itemData=><OrderItem 
        amount={itemData.item.totalAmount}
       date={itemData.item.readableDate}
       items={itemData.item.items}
       />}
       />
       </View>
       )
};

const styles= StyleSheet.create({
    order:{
    alignItems:'center',
    textAlign:"center",
    flexDirection:'row',
    marginHorizontal:10,
    justifyContent:'flex-end',
    marginTop:10,
    fontSize:20,
    fontWeight:'bold',
    backgroundColor:'red',
    padding:10
  },
  amount:{
      marginTop:10
  }
})

export default OrderScreen;