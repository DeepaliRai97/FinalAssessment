import React,{useEffect,useState} from 'react';
import { FlatList,Text,StyleSheet, View,TouchableOpacity } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

const SortScreen = props => {
  const [data, setData] = useState([]);
  const [check1,setCheck1]=useState(true)
  const [check2,setCheck2]=useState(false)
  useEffect(() => {
    initz();
  }, []);
  const initz = async () => {
    const res = await Axios.post(
      'https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse',
      {
        category_id: 13,
        filter: '',
        page_num: 1,
        sort: '',
        customer_id: 96,
        wcode: 'DWK,HWH,S71',
      },
    );
  console.log(res.data.data.items);
    let newData = res.data.data.items
     newData.sort(
      (a, b) => parseInt(a.price) - parseInt(b.price),
    );
    setData(newData);
  };
  const init2 = async () => {
    const res = await Axios.post(
      'https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse',
      {
        category_id: 13,
        filter: '',
        page_num: 1,
        sort: '',
        customer_id: 96,
        wcode: 'DWK,HWH,S71',
      },
    );
   console.log(res.data.data.items);
     let newData = res.data.data.items
     newData.sort(
      (a, b) => parseInt(b.price) - parseInt(a.price),
    );
    setData(newData);
  };
return (
    <View>
    <TouchableOpacity style={styles.icon} 
      onPress={()=>{props.navigation.navigate('Cart')}}>
      <FontAwesome
         name="shopping-cart"
         color="#05375a"
         size={25} 
       /></TouchableOpacity>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <CheckBox
      disabled={false}
      value={check1}
      onValueChange={async (newValue) => {setCheck1(newValue)
      setCheck2(!newValue)
      if(newValue==true){
        await initz()
      }
      }}
    />
    <Text>Price high To Low</Text>
    </View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <CheckBox
      disabled={false}
      value={check2}
      onValueChange={async (newValue) => {setCheck2(newValue)
      setCheck1(!newValue)
      if(newValue==true){
        await init2()
      }
      }}
    />
     <Text>Price Low to High</Text>
    </View>
    <FlatList
       data={data}
       keyExtractor={(item,index)=>index.toString()}
      renderItem={itemData=>
    <ProductItem 
        image={itemData.item.images} 
        title={itemData.item.name} 
        price={itemData.item.price}
        onViewDetail={()=>{
        props.navigation.navigate('ProductDetail',{
        productId:itemData.item.product_id,
        productTitle:itemData.item.name,
        productImage:itemData.item.images,
    })
}} 
onAddToCart={()=>{
    dispatch(cartActions.addToCart(itemData.item));
}}/>}
    />
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
  }
})

export default SortScreen;

