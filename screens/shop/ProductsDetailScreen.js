import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constant/Colors';
import * as cartActions from '../../store/actions/cart';
import Axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from "react-native-share";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const productImage = props.navigation.getParam('productImage');
    const selectedProduct =
        useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    const data = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();
    const [review, setReview] = useState([])
    useEffect(() => {
        initz()
    }, [])
    const initz = async () => {
             const result = await Axios.get(
            `https://preprod.vestigebestdeals.com/api/rest/getreview/productId/${productId}`,
    );
        setReview(result.data.data.reviewlist)
        console.log(result.data);
    }
    const myCustomShare = async () => {
        const shareOptions = {
            title: 'Share Info',
            url: selectedProduct.imageUrl,
            message: `Price ${selectedProduct.price} ${productId} `
        }
        try {
            const shareResponse = await Share.open(shareOptions);
        } catch (error) {
            console.log('Error=>', error);
        }
    }
    return (<View>
        <TouchableOpacity style={styles.icon} onPress={myCustomShare}><FontAwesome
            name="share"
            color="#05375a"
            size={30}
        /></TouchableOpacity>
            <Image style={styles.image}
                source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary}
                    title="Add to Cart" onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price} </Text>
            <Text style={styles.specialPrice}> 
             Save ${selectedProduct.price-selectedProduct.specialPrice}</Text>
            <FlatList 
            data={review}
            keyExtractor={(item)=>item.id}
            renderItem={itemData=>(
            <View>
                <Text style={styles.date}>{itemData.item.date}</Text>
                <Text style={styles.name}>{itemData.item.nickname}</Text>
                <Text style={styles.detail}>{itemData.item.detail}</Text>
                <Text style={styles.title}>{itemData.item.title}</Text>
            </View>
          )
          }/> 
        </View>
    )

}
ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        textDecorationLine:'line-through',
        textDecorationStyle:'solid'
    },
    detail: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    },
    img: {
        width: '50%',
        height: '70%',
        marginTop:20
    },
    icon: {
        alignItems: 'center',
        textAlign: "center",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal:10
     },
    name:{
        color:'#000080',
        fontWeight:'bold',
        fontSize:15,
        marginLeft:10
    },
    detail:{
        alignItems:'center',
        alignContent:'center',
        color:'#800000',
        marginLeft:10
    },
    date:{
        alignSelf:'flex-end',
        color:'#000080',
        fontWeight:'bold',
        marginRight:10
    },
    title:{
        color:'#000080',
        marginLeft:10
    },
    specialPrice:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:20,
        marginTop:5,
        marginBottom:5
    }
});

export default ProductDetailScreen;

/*<TouchableOpacity>
<ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}
    scrollEventThrottle={1}
    showsHorizontalScrollIndicator={false} height={35} style={styles.image}>
    {data.map((item, index) => {
        return (
            <Image key={index} source={{ uri: item.imageUrl }} style={styles.img} />
        )
    })}
</ScrollView>
</TouchableOpacity>*/
