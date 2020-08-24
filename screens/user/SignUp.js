import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import  Feather  from 'react-native-vector-icons/Feather';
//import AsyncStorage from '@react-native-community/async-storage';
const Realm = require('realm');
import {addUser} from '../../database/UserSchema';



const SignUp = ({ navigation }) => {
const [data, setData] = React.useState({
    firstname:'',
    lastname: '',
    email: '',
    password: '',
    uri:'',
    check_textInputChange: false,
    secureTextEntry: true,
    check_firstnameInputChange: false,
    check_lastnameInputChange: false,
    isValidUser:true,
    isValidEmail:true,
    isValidPassword:true,
});
  const firstnameInputChange = (val) => {
    if (val.trim().length >= 5 ) {
      setData({
        ...data,
        firstname: val,
        check_firstnameInputChange: true,
        isValidUser:true
      });
    } else {
      setData({
        ...data,
        firstname: val,
        check_firstnameInputChange: false,
        isValidUser:false
      });
    }
  }
  const lastnameInputChange = (val) => {
    if ( val.trim().length>=3) {
      setData({
        ...data,
        lastname: val,
        check_lastnameInputChange: true,
        isValidUser:true
      });
    } else {
      setData({
        ...data,
        lastname: val,
        check_lastnameInputChange: false,
        isValidUser:false
      });
    }
  }
  const textInputChange = (val) => {
    if (val.trim().length >= 10) {
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
    if (val.trim().length >= 8){
    setData({
      ...data,
      password: val,
      isValidPassword:true,
    });
  }else{
    setData({
      ...data,
      password: val,
      isValidPassword:false
    })
  }
}
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  const onPressSubmit = async () => {
    console.log('hy');
    const emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const usernamereg = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if(emailreg.test(data.email)!==true) return alert("Please enter correct email")
    if(usernamereg.test(data.firstname)!==true) return alert("Please enter correct firstname")
    if(usernamereg.test(data.lastname)!==true) return alert("Please enter correct lastname")
    if (data.firstname.length == 0) return alert("Please enter name first");
    if (data.lastname.length == 0) return alert("Please enter name first");
    if (data.email.length == 0) return alert("Please enter email first");
    if (data.password.length == 0) return alert("Please enter password first");
  const dataTosent = {
      firstname:data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      //uri:''
    }
    console.log(dataTosent.firstname)
               addUser(dataTosent)
                alert('Account created successfully')
                navigation.navigate('Sign')
            
    /*await AsyncStorage.setItem('name', data.name)
    const storedEmail = await AsyncStorage.getItem('email')
    console.log(storedEmail);
    await AsyncStorage.setItem('email', data.email)
    await AsyncStorage.setItem('password', data.password)
    navigation.navigate('Sort')*/
  }
return (
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>FirstName</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20} />
          <TextInput placeholder="firstname"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => firstnameInputChange(val)}
            />
          {data.check_textInputChange ?
            <Feather name="check-circle"
              color="green"
              size={20} />
            : null}
        </View>
        {data.isValidUser?null:<Text style={styles.errorMsg}>FirstName must be 5 characters long</Text>}
        <Text style={styles.text_footer}>LastName</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20} />
          <TextInput placeholder="lastname"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => lastnameInputChange(val)}
            />
          {data.check_textInputChange ?
            <Feather name="check-circle"
              color="green"
              size={20} />
            : null}
        </View>
        {data.isValidUser?null:<Text style={styles.errorMsg}>LastName must be 3 characters long</Text>}
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
            onChangeText={(val) => handlePasswordChange(val)}
          />
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
          <TouchableOpacity onPress={onPressSubmit}
            style={styles.signIn}>
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>
           </View>
      </View>
    </View>
  )
}

export default SignUp;

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
    borderTopLeftRadius: 20,
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
    marginTop: 10,
  },
  signIn: {
    borderWidth: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#2F4F4F',
    marginTop: 10
  },
  textSign: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  errorMsg:{
    color:'#FF0000'
  }
})