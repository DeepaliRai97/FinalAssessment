import React, { Component } from 'react';
import {View,Text,TouchableOpacity,ImageBackground,TextInput,StyleSheet,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from "react-native-image-picker";
import{ TouchableRipple} from 'react-native-paper';
import {addUri} from '../../database/UriSchema';
//import {UriData} from '../../database/UriSchema';
//import Realm from 'realm';

const Realm = require('realm');
export default class ProfileScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
          filePath: {},
          uri:'',
          //updateUri:''
          
          
        };
      }
      chooseFile = () => {
         var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              filePath: source,
            });
            this.setState({uri: this.state.filePath.uri});
          }
        });
        const uriToSent ={
            uri: this.state.uri,

        }
         console.log(uriToSent.uri)
         addUri(uriToSent)

         /*const getUri = async() => {
            let realm;
            realm = new Realm({schema: [UriData]});
            var userData = realm.objects('UriSchema');
            console.log(userData);
            for (let valData of userData) {
              if (valData.uri == uriToSent.uri) {
                updateUri()
              }
            else{
              alert("Don't Have an Account Let's SignUp");}
            }}*/
      
    };
    render(){
        
    return(
        <View style={styles.container}>
            <View style={{margin:20}}>
               <View style={{alignItems:'center'}}>
               
                   <TouchableOpacity onPress={this.chooseFile.bind(this)}>
                     <View style={styles.component}>
                       <ImageBackground source={{
                        uri:'data:image/jpeg;base64,' + this.state.filePath.data,
                       }}
                       style={{height:100,width:100,backgroundColor:'#000000',borderRadius:50}}
                       imageStyle={{borderRadius:50}}
                       
                       //color="#000000"
                       >
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                    <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>John Doe</Text>
                    </View>
                   <View style={styles.menuWrapper}>
               <TouchableRipple onPress={()=>{this.props.navigation.navigate('orders')}}>
                   <View style={styles.menuItem}>
                       <FontAwesome
                name="shopping-cart"
                color="#05375a"
                size={25} />
                       <Text style={styles.menuItemText}>My Cart</Text>
                   </View>
               </TouchableRipple>
           </View>
           <View style={styles.menuWrapper}>
               <TouchableRipple onPress={()=>{this.props.navigation.navigate('Sign')}}>
                   <View style={styles.menuItem}>
                       <FontAwesome
                name="sign-out"
                color="#05375a"
                size={25} />
                       <Text style={styles.menuItemText}>LogOut</Text>
                   </View>
               </TouchableRipple>
           </View>
                </View>
           </View>
        )
}
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    commandButton:{
        padding:15,
        borderRadius:15,
        backgroundColor:'#FF6347',
        alignItems:'center',
        marginTop:10
    },
    panel:{
        padding:20,
        backgroundColor:'#FFFFFF',
        paddingTop:20,
    },
    header:{
        backgroundColor:'#FFFFFF',
        shadowColor:'#333333',
        shadowOffset:{widht:-1,height:-3},
        shadowRadius:2,
        shadowOpacity:0.4,
        paddingTop:20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    panelHeader:{
        alignItems:'center',
    },
    panelHandle:{
        width:40,
        height:8,
        borderRadius:4,
        backgroundColor:'#00000040',
        marginBottom:10
    },
    panelTitle:{
        fontSize:27,
        height:35,
    },
    panelSubtitle:{
        fontSize:14,
        color:'gray',
        height:30,
        marginBottom:10,
    },
    panelButton:{
        padding:13,
        borderRadius:10,
        backgroundColor:'#FF6347',
        alignItems:'center',
        marginVertical:7
    },
    panelButtonTitle:{
        fontSize:17,
        fontWeight:'bold',
        color:'white',
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    actionError:{
        flexDirection:'row',
            marginTop:10,
            borderBottomWidth:1,
            borderBottomColor:'#FF0000',
            paddingBottom:5
        
    },
    textInput:{
        flex:1,
        marginTop:-12,
        paddingLeft:10,
        color:'#05357a',
    },
    component:{
        height:100,
        width:100,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    } ,
    camera:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    } ,
    iconStyle:{
        opacity:0.7,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:10
    },
    menuWrapper:{
        marginTop:20,

    },
    menuItem:{
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:30,
    },
    menuItemText:{
        color:'#777777',
        marginLeft:20,
        fontWeight:'600',
        fontSize:16,
        lineHeight:26
    },
    })