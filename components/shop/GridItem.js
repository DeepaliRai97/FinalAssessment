import React from 'react';
import {View,Text,Image,StyleSheet,Button,TouchableOpacity,Dimensions}from 'react-native';

const GridItem=props=>{
   
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
        </View>
    </TouchableOpacity>
    )
};

const styles= StyleSheet.create({
   product:{
       elevation:5,
       borderRadius:5,
       backgroundColor:'white',
       height:160,
       width:160,
       margin:20
   },
   image:{
       width:'100%',
       height:'100%',
   },
   title:{
       fontSize:9,
       marginVertical:4,
   },
   price:{
       fontSize:10,
       color:'#888',
   },
   actions:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       height:'5%',
       paddingHorizontal:5,
   },
   details:{
       alignItems:'center',
       height:'15%',
       padding:10,
   },
   imageContainer:{
        width:'50%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
   }
   


}) 

export default GridItem;