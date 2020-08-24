import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CartItem = props =>{
    return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
<Text style={styles.quantity}>{props.quantity}  </Text>
<Text style={styles.title}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
<Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
          {props.deletable&& (<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
              <FontAwesome name="trash"
              size ={23}
              color="red"/>
          </TouchableOpacity>)}

      </View>
    </View>
    )
};

const styles= StyleSheet.create({
    cartItem:{
        padding:20,
        flexDirection:'row',
        marginHorizontal:100,
        marginLeft:2
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        //fontFamily:'open-sans',
        color:'#888',
        fontSize:15,
        color:'black',
        marginRight:10,
        marginLeft:2
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:15,
        marginRight:5,
        color:'black'
    },
    amount:{
        //fontFamily:'open-sans-bold',
        fontSize:15,
        marginLeft:2,
        marginRight:10,
        color:'#000505'
    
    },
    deleteButton:{
        marginLeft:1,
        marginRight:30
    }
});

export default CartItem;