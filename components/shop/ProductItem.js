import React from 'react';
import {View,Text,Image,StyleSheet,Button,TouchableOpacity}from 'react-native';
import Colors from '../../constant/Colors';

const ProductItem=props=>{
    return (
        <TouchableOpacity onPress={props.onViewDetail}>
        <View style={styles.product}>
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:props.image}}/>
        </View>
        <View style={styles.details}>
         <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price}</Text>
        </View>
        <View style={styles.actions}>
            <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
            <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart}/>
        </View>
    </View>
    </TouchableOpacity>
    )
};

const styles= StyleSheet.create({
   product:{
       elevation:5,
       borderRadius:10,
       backgroundColor:'white',
       height:300,
       margin:20
   },
   image:{
       width:'100%',
       height:'100%',
   },
   title:{
       fontSize:15,
       marginVertical:4,
       alignItems:'center'
   },
   price:{
       fontSize:14,
       color:'#888',
   },
   actions:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       height:'25%',
       paddingHorizontal:20,
   },
   details:{
       alignItems:'center',
       height:'15%',
       padding:10,
   },
   imageContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
   }
   


}) 

export default ProductItem;