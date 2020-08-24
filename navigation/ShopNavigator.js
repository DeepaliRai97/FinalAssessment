import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductsDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import SortScreen from '../screens/shop/SortScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SignIn from '../screens/user/SignIn';
import SignUp from '../screens/user/SignUp';
import FaceBook from '../screens/user/FaceBook';
import OrderScreen from '../screens/shop/OrderScreen';

const DrawerNavigator = createDrawerNavigator({
    Profile:{
        screen:ProfileScreen,
        navigationOptions:({headerShown:false})
    },
    ProductsOverview:{
        screen:ProductsOverviewScreen,
        navigationOptions:({headerShown:false})
    }
    
},
{
    contentComponent:ProfileScreen
}
)
const ProductsNavigator = createStackNavigator({
      Sign: {
        screen:SignIn,
        navigationOptions:({headerShown:false})
    },
      SiUp:
      {screen:SignUp,
       navigationOptions:({headerShown:false})},
     FaceBook:{
        screen:FaceBook
    },
    Profile:{
    screen:DrawerNavigator,
    navigationOptions:({headerShown:false})
},
    Sort:{
    screen:SortScreen
},
    orders:{
       screen:OrderScreen,
       navigationOptions:({headerShown:false})
    },
      Cart:CartScreen,
    ProductDetail:ProductDetailScreen,
},
);
const SwitchNavigator = createSwitchNavigator({
    ProfileScreen:{
           screen:ProductsNavigator
       },
    },
)
 export default createAppContainer(SwitchNavigator);

 //const [tabBarLabel,setTabBarLabel]=useState("ProductOverview")

/*const AllProducts = createMaterialBottomTabNavigator({
   Sort:{
            screen:SortScreen,
        },
   /* GridScreen:{
            screen:GridScreen,
        },*/
    /*ProductOverview:{
            screen:ProductsOverviewScreen,
           /* navigationOptions: ({ navigation }) => ({

            
                tabBarLabel:"ProductOverview",

                tabBarOnPress: ({ navigation }) => { 
                    //setTabBarLabel("ProductOverview")
                    var  tabBarLabel="ProductOverview"
                  if(tabBarLabel=="ProductOverview") 
                  { 
                  navigation.navigate('GridScreen');
                  tabBarLabel="GridScreen"
                  }
                  else{
                      navigation.navigate('GridScreen')
                  }
                  
            },
        
                }),
         },
    
        })*/
