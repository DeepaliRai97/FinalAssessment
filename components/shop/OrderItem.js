import React ,{useState} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import CartItem from './CartItem';

const OrderItem = props =>{
    const [showDetails,setShowDetails] = useState(false);
     return (
     <View style={styles.OrderItem}>
         <View style={styles.summary}>
             <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
             <Text style={styles.date}>{props.date}</Text>
         </View>
       <Button title={showDetails?"Hide Details":"Show Details"}
       onPress={()=>{
           setShowDetails(prevState => !prevState);
       }}
       />
       {showDetails && <View style= {styles.detailItem}>
           {props.items.map(cartItem=><CartItem 
            key = {cartItem.productId}
            quantity={cartItem.quantity} 
            amount={cartItem.sum} 
            title={cartItem.productTitle}/>)}
           </View>}
     </View>
     )
};

const styles= StyleSheet.create({
   OrderItem:{
    elevation:5,
    borderRadius:10,
    backgroundColor:'white',
    
    margin:20,
    padding:10,
    alignItems:'center'
 },
   summary:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       width:'100%'
   },
   totalAmount:{
       fontWeight:'bold',
       fontSize:16,

   },
   date:{
       fontSize:16,
       color:'#888'
   },
   detailItem:{
       width:'100%'
   }
   
});

export default OrderItem;