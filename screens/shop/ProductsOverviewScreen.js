import React,{useEffect,useState} from 'react';
import { FlatList,StyleSheet, View,TouchableOpacity ,Text} from 'react-native';
import{useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import GridItem from '../../components/shop/GridItem';
import * as cartActions from '../../store/actions/cart';
import Axios from 'axios';
import {setProduct} from '../../store/actions/products';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductsOverviewScreen = props => {
  
  const [screenlayout, setScreenLayout] = useState(true);

  const linear = () => {
    setScreenLayout(false);
  };
  const grid = () => {
    setScreenLayout(true);
  };

    const products=useSelector(state=>state.products.availableProducts);
    const dispatch=useDispatch();
    useEffect(()=>{
    initz()
    },[])
    const initz = async () => {
        var raw = {
          category_id: 13,
          filter: '',
          page_num: 1,
          sort: '',
          customer_id: 96,
          wcode: 'DWK,HWH,S71',
        };
     const result = await Axios.post(
          'https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse',
          raw,
        );
      console.log(result.data);
      const newArray = result.data.data.items.map((item,index)=>{
      console.log(item);
      
          return {
              id:item["product_id"],
              ownerId:'u1',
              imageUrl:item["images"],
              title:item.name,
              description:item.description,
              price:item.price,
              specialPrice:item.special_price
             }
        })
        dispatch(setProduct(newArray))
      };
     if(screenlayout===true)
       return (
            <View>
                <TouchableOpacity 
                      style={styles.icon} 
                      onPress={()=>{props.navigation.navigate('Cart')}}>
                <FontAwesome
                      name="shopping-cart"
                      color="#05375a"
                      size={25} 
                />
                </TouchableOpacity>
                <View style={styles.linear}>
                <FlatList
                  data={products}
                  keyExtractor={item=>item.id}
                  renderItem={itemData=>
                <ProductItem 
                  image={itemData.item.imageUrl} 
                  title={itemData.item.title} 
                  price={itemData.item.price}
                  onViewDetail={()=>{
                  props.navigation.navigate('ProductDetail',{
                  productId:itemData.item.id,
                  productTitle:itemData.item.title,
                  productImage:itemData.item.imageUrl,
                 })
              }} 
                onAddToCart={()=>{
                  dispatch(cartActions.addToCart(itemData.item));
                }}/>}
              />
              </View>
         <View style={styles.bottomData}>
        <TouchableOpacity style={styles.GridView}
            onPress={linear}>
        <Text style={styles.Grid}>Grid</Text>
        </TouchableOpacity>    
        <TouchableOpacity style={styles.Sortview}
        onPress={()=>{props.navigation.navigate('Sort')}}>
        <Text style={styles.Sorts}>Sort</Text>
        </TouchableOpacity>   
        </View> 
      </View>
    );
    else return (
      <View>
      <TouchableOpacity style={styles.icon}
             onPress={()=>{props.navigation.navigate('Cart')}}>
             <FontAwesome
              name="shopping-cart"
              color="#05375a"
              size={25} 
            />
      </TouchableOpacity>
      <View style={styles.linear}>
      <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={itemData=>
       <GridItem 
            image={itemData.item.imageUrl} 
            title={itemData.item.title} 
            price={itemData.item.price}
            onViewDetail={()=>{
            props.navigation.navigate('ProductDetail',{
            productId:itemData.item.id,
            productTitle:itemData.item.title
           })
        }} 
          onAddToCart={()=>{
                dispatch(cartActions.addToCart(itemData.item));
        }}/>}
          numColumns={2}
          key={2}
           />
           </View>
            <View style={styles.bottomData}>
        <TouchableOpacity style={styles.GridView}
            onPress={grid}>
        <Text style={styles.Grid}>Linear</Text>
        </TouchableOpacity>    
            
        <TouchableOpacity style={styles.Sortview}
        onPress={()=>{props.navigation.navigate('Sort')}}>
        <Text style={styles.Sorts}>Sort</Text>
        </TouchableOpacity>   
        </View> 

  </View>
  );
};
const styles = StyleSheet.create({
  icon:{
    alignItems:'center',
    textAlign:"center",
    flexDirection:'row',
    marginHorizontal:10,
    justifyContent:'flex-end'
  },
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    color:'#fff8dc'
  },
  item:{
    fontSize:23
  },
  icon:{
    alignItems:'center',
    textAlign:"center",
    flexDirection:'row',
    marginHorizontal:10,
    justifyContent:'flex-end'
  },
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    color:'#fff8dc'
  },
  item:{
    fontSize:23
  },
  linear:{
    height:"90%"
     
  },
  bottomData:{
    flexDirection:'row',
    backgroundColor:'#2F4F4F',
    flex:1,
    padding:10
},
  Grid:{
    fontWeight:'bold',
    fontSize:18,
    color:'#0000ff',
 },
  Sorts:{fontWeight:'bold',
  fontSize:18,
  color:'#0000ff',
},
  GridView:{flex:1,
    backgroundColor:'#2F4F4F',
    alignItems:'center',
    justifyContent:'center',
    padding:10
  },
  Sortview:{flex:1,
    backgroundColor:'#2F4F4F',
    alignItems:'center',
    justifyContent:'center',
    padding:10
  }
})


export default ProductsOverviewScreen;

 