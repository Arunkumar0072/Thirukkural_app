import { View, Text, Dimensions, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Thiruvalluvarlogo from '../assets/Thiruvalluvarlogo.png'
import auth from '@react-native-firebase/auth';
import backarrow from '../assets/backarrow.png'
import firestore from '@react-native-firebase/firestore';
export default function Loginpages({ navigation }) {
  const { height, width } = Dimensions.get('screen')
  const [pageswap, setpageswap] = useState(true)
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [Invalid, setInvalid] = useState('')
  const [InvalidEmail, setInvalidEmail] = useState('')
  const [InvalidPassword, setInvalidPassword] = useState('')

  //create account
  const [createInvalid, setcreateInvalid] = useState('')
  const [AlreadyUsedEmail, setAlreadyUsedEmail] = useState('')
  const [InavalidEmail, setInavalidEmail] = useState('')
  const [InvalidPhoneNumber, setInvalidPhoneNumber] = useState('')
  const [createusername, setcreateusername] = useState('')
  const [createpassword, setcreatepassword] = useState('')
  const [Email, setEmail] = useState('')
  const [phone, setphone] = useState('')
  const [UserNameColorChange, setUserNameColorChange] = useState('')
  function Signpage() {

    // Login page
    if (username != '' && password != '') {
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          console.log('signed in success');
          navigation.navigate('SplashScreen')
          setInvalid('')
          setInvalidEmail('')
          setInvalidPassword('')
        })
        .catch(error => {
          console.log(error.message)
          if (error.code === 'auth/invalid-email') {
            setInvalidEmail('Invalid Email')
          } else if (error.code === 'auth/invalid-login') {
            setInvalidPassword('Invalid Password ')
          } else {
            setInvalid(error.message)
          }
        })
    } else {
      setInvalid('All Fields Required')
      console.log(Invalid);
    }

  }

  const validateEmail = (email) => {
    if (String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      return true;
    }
    else {
      return false;
    }
  };
  function ValidateUserName(Name) {
    if (String(Name).toLowerCase().match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      return false
    } else {
      return true
    }
  }
  //Create Account
  const [ProperEmailValidation, setProperEmailValidation] = useState('')
  const [WeekPassword, setWeekPassword] = useState('')
  function CreateAccount() {
    if (createpassword != '' && createusername != '' && Email != '' && phone != '') {
      if (ValidateUserName(createusername)) {
        setUserNameColorChange('')
        if (validateEmail(Email)) {
          setProperEmailValidation('')
          if (phone.length === 10) {
            setInvalidPhoneNumber('')
            auth()
              .createUserWithEmailAndPassword(Email, createpassword)
              .then(() => {
                SaveData()
                console.log('User account created ');
                setcreateInvalid('')
                setAlreadyUsedEmail('')
                setInavalidEmail('')
                setInvalidPhoneNumber('')
                setProperEmailValidation('')
                setWeekPassword('')
                navigation.navigate('SplashScreen')
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                  setAlreadyUsedEmail('That email address is already in use!')
                }
                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                  setInavalidEmail('That email address is invalid!')
                }
                setWeekPassword(error.code)
                // console.error(error);
              });
          } else {
            setInvalidPhoneNumber('Number Should 10 Digit')
          }
        } else {
          setProperEmailValidation('Please Enter a Proper Email')
        }
      } else {
        setUserNameColorChange('Special Characters should not use')
      }
    } else {
      setcreateInvalid('All Fields Required')
    }
  }
  function SaveData() {
    firestore()
      .collection('UserData')
      .doc(Email)
      .set({
        name: createusername,
        email: Email,
        phoneNumber: '+91' + phone,
        userpassword:createpassword
      }).then(() => {
        console.log('Useradd');
      }).catch((Error) => {
        console.log(Error.message)
      });
  }
  return (
    <View style={{ width: width, height: height }} className='items-center  bg-red-800'>
      {
        pageswap ?
          (<View style={{ width: width * .9, height: height * .8, marginTop: height * .05 }} className=''>
            <ScrollView>
              <Image style={{ width: width * .2, borderRadius: 50, height: height * .1 }} source={Thiruvalluvarlogo} className='mb-10'></Image>
              <Text style={{ fontStyle: 'italic' }} className='text-white font-bold text-2xl mb-5'>HELLO</Text>
              <Text style={{ fontStyle: 'italic' }} className='text-white text-lg font-bold mb-5'>Sign in to <Text className='text-gray-300  font-bold text-xl'>account!</Text></Text>
              <KeyboardAvoidingView className='mt-5 mb-10'>
                <TextInput onChangeText={(username) => setusername(username)} placeholder='User Email' placeholderTextColor={'white'} className='px-5 text-base text-white rounded-full font-bold border-2 border-gray-300 ' />
                {
                  InvalidEmail != '' ? <Text className='text-white text-center font-bold'>{InvalidEmail}</Text> : null
                }

                <TextInput onChangeText={(password) => setpassword(password)} placeholder='Password' placeholderTextColor={'white'} className='px-5 mt-5 text-base text-white rounded-full font-bold border-2 border-gray-300 ' />
                {
                  InvalidPassword != '' ? <Text className='text-white text-center font-bold'>{InvalidPassword}</Text> : null
                }
                <TouchableOpacity className='mt-5'>
                  <Text className='text-base self-end text-gray-300 '>Forgot Password?</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
              {
                Invalid != '' ? <Text className='text-white text-center font-bold'>{Invalid}</Text> : null
              }
              <TouchableOpacity onPress={() => Signpage()} style={{ width: width * .6, height: height * .05 }} className='bg-white justify-center mb-10 items-center self-center rounded-full'>
                <Text className='font-bold text-lg text-black'>Sign in</Text>
              </TouchableOpacity>
              <View className='flex-row self-center'>
                <Text className='self-center text-base text-white font-bold'>Don't Have an account ? </Text>
                <TouchableOpacity onPress={() => setpageswap(!pageswap)}>
                  <Text className='text-orange-600 font-bold text-lg'>Create</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: width * .65, height: height * .05 }} className='bg-white self-center  mt-5 justify-center rounded-full'>
                <TouchableOpacity onPress={() => navigation.goBack()} className='absolute rounded-full bg-red-800 p-2 mx-1'>
                  <Image source={backarrow}></Image>
                </TouchableOpacity>
                <Text style={{ marginLeft: width * .12 }} className='text-base text-black font-bold'>Mobile Number Verification</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>) :
          (<View style={{ width: width * .9, height: height * .8, marginTop: height * .05 }} className=''>
            <ScrollView>
              <Image style={{ width: width * .2, borderRadius: 50, height: height * .1 }} source={Thiruvalluvarlogo} className='mb-10'></Image>
              <Text className='text-white self-center font-bold tracking-widest text-2xl mb-5'>Create Account</Text>
              <KeyboardAvoidingView className='mt-5 mb-10'>
                <TextInput onChangeText={(createusername) => setcreateusername(createusername)} placeholder='UserName' placeholderTextColor={'white'} className='px-5 text-base text-white rounded-full font-bold border-2 border-gray-300 ' />
                {
                  UserNameColorChange ? <Text className='text-white text-center font-bold'>{UserNameColorChange}</Text> : null
                }
                <TextInput onChangeText={(Email) => setEmail(Email)} placeholder='Email' placeholderTextColor={'white'} className='px-5 mt-5 text-base text-white rounded-full font-bold border-2 border-gray-300' />
                {
                  AlreadyUsedEmail != '' ? <Text className='text-white text-center font-bold'>{AlreadyUsedEmail}</Text> : null
                }
                {
                  InavalidEmail != '' ? <Text className='text-white text-center font-bold'>{InavalidEmail}</Text> : null
                }
                {
                  ProperEmailValidation != '' ? <Text className='text-white text-center font-bold'>{ProperEmailValidation}</Text> : null
                }
                <TextInput onChangeText={(createpassword) => setcreatepassword(createpassword)} placeholder='Password' placeholderTextColor={'white'} className='px-5 mt-5 text-base text-white rounded-full font-bold border-2 border-gray-300 ' />
                {
                  WeekPassword != '' ? <Text className='text-white text-center font-bold'>{WeekPassword}</Text> : null
                }
                <View style={{ width: width * .9, height: height * .06 }} className='flex-row rounded-full border-2 mt-5 items-center px-5 border-gray-300 '>
                  <Text className='text-white font-bold text-base'>+91</Text>
                  <TextInput style={{ width: width * .77, height: height * .06 }} maxLength={10} onChangeText={(phone) => setphone(phone)} placeholder='Phone Number' keyboardType='number-pad'
                    placeholderTextColor={'white'} className='text-base  rounded-full  text-white  font-bold ' />
                </View>
                {
                  InvalidPhoneNumber != '' ? <Text className='text-white text-center font-bold'>{InvalidPhoneNumber}</Text> : null
                }
              </KeyboardAvoidingView>
              {
                createInvalid != '' ? <Text className='text-white text-center font-bold'>{createInvalid}</Text> : null
              }
              <TouchableOpacity onPress={() => CreateAccount()} style={{ width: width * .6, height: height * .05 }} className='bg-white mt-5 justify-center mb-10 items-center self-center rounded-full'>
                <Text className='font-bold text-lg text-black'>Create</Text>
              </TouchableOpacity>
              <View className='flex-row self-center'>
                <Text className='self-center text-base text-white font-bold'>Have an account ? </Text>
                <TouchableOpacity onPress={() => setpageswap(!pageswap)}>
                  <Text className='text-orange-600  font-bold text-lg'>Sign In</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>)
      }
    </View>
  )
}