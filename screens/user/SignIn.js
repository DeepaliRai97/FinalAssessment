import React, { Component, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, Platform, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import  Feather  from 'react-native-vector-icons/Feather';
import 'react-native-gesture-handler';
//import AsyncStorage from '@react-native-community/async-storage';
import {PersonupdatesDatas} from '../../database/UserSchema';
import Realm from 'realm';


const SignIn = ({ navigation }) => {
 const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidEmail:true,
    isValidPassword:true,
  });
  const textInputChange = (val) => {
    if (val.trim().length >=10) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidEmail:true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidEmail:false
      });

    }
  }
  const handlePasswordChange = (val) => {
    if (val.trim().length >=8){
    setData({
      ...data,
      password: val,
      isValidPassword:true
    
    });
  }else{
    setData({
      ...data,
      password: val,
      isValidPassword:false
    
    })
  }
  }
const handleValidEmail=(val)=>{
    if(val.trim().length>=10){
      setData({
        ...data,
        isValidEmail:true
      })
    }else {
      setData({
        ...data,
        isValidEmail:false
      })
    }
}

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const getData = async() => {
    let realm;
    realm = new Realm({schema: [PersonupdatesDatas]});
    var userData = realm.objects('PersonupdatesSchemas');
    console.log(userData);
    for (let valData of userData) {
      if (valData.email == data.email && valData.password == data.password) {
       navigation.navigate('ProductsOverview');
      }
    else{
      alert("Don't Have an Account Let's SignUp");}
  }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20} />
          <TextInput placeholder="email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)} 
            onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
            />
          {data.check_textInputChange ?
            <Feather name="check-circle"
              color="green"
              size={20} />
            : null}
        </View>
        {data.isValidEmail?null:<Text style={styles.errorMsg}> Enter Valid Email</Text>}
        <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
          <FontAwesome
            name="lock"
            color="#05375a"
            size={20} />
          <TextInput placeholder="password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)} />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ?
              <Feather name="eye-off"
                color="grey"
                size={20} /> : <Feather name="eye"
                  color="grey"
                  size={20} />}
          </TouchableOpacity>
          </View>
          {data.isValidPassword?null:<Text style={styles.errorMsg}>Password must be 8 characters long</Text>}
          <View style={styles.button}>
          <TouchableOpacity onPress={getData}
            style={styles.signIn}>
            <Text style={styles.textSign}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate("SiUp") }}
            style={styles.signIn} >
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.With}> Or Login With</Text>
          </View>
      </View>
      <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.facebook}
       onPress={()=>{navigation.navigate('FaceBook')}}>
         <Text style={styles.text}>Facebook</Text>
         <FontAwesome
                name="facebook"
                color="#000000"
                size={25} 
         />
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebook}
       onPress={()=>{props.navigation.navigate('Cart')}}>
         <Text style={styles.text}>Gmail</Text>
         <FontAwesome
                name="envelope"
                color="#000000"
                size={30} 
          />
       </TouchableOpacity>
    </View>
   </View>
  )
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4F4F'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 10
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  signIn: {
    borderWidth: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#2F4F4F',
    marginTop: 5,
    alignContent:'flex-start'
  },
  textSign: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  facebook: {
    borderWidth: 30,
    height: 30,
     alignItems: 'flex-start',
    borderRadius: 10,
    borderColor: '#fff',
    marginTop: 15,
    justifyContent:'center',
    marginLeft:10,
    marginRight:10
    },
    text:{
      fontSize:15,
      textAlign:'center'
    },
    btnContainer:{
      flexDirection:'row',
      justifyContent:"space-between",
      marginBottom:100
    },
    With:{
      marginTop:50
    },
    errorMsg:{
      color:'#FF0000'
    }

})