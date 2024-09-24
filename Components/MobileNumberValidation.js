import { View, Text, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import Thiruvalluvarlogo from '../assets/Thiruvalluvarlogo.png'

export default function MobileNumberValidation({ navigation }) {
  const { height, width } = Dimensions.get('screen')
  const [MobileNumber, setMobileNumber] = useState('')
  const [InvalidMessage, setInvalidMessage] = useState('')
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [InvalidConfirmCode, setInvalidConfirmCode] = useState('')
  async function signInWithPhone(phoneNumber) {
    console.log('+91' + phoneNumber);
    const Number = '+91' + phoneNumber;
    try {
      if (phoneNumber.length === 10) {
        const confirmation = await auth().signInWithPhoneNumber(Number);
        setConfirm(confirmation);
        // console.log('phone number');
        setInvalidMessage('')
      } else {
        setInvalidMessage('Invalid-phone-number please Enter 10 Digit')
      }
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/too-many-requests') {
        setInvalidMessage('auth/too-many-requests Happend Please Try later')
      }
      if (error.code === 'auth/invalid-phone-number') {
        setInvalidMessage('Invalid Mobile Number')
      }
    }
  }

  async function confirmCode() {
    try {
      const responce = await confirm.confirm(code);
      console.log(responce)
      setInvalidConfirmCode('')
    } catch (error) {
      console.log('Invalid code.');
      console.log(error.code);
      if (error.code === 'auth/invalid-verification-code') {
        setInvalidConfirmCode('invalid-verification-code')
      } if (error.code === 'auth/unknown') {
        setInvalidConfirmCode('Field is Empty')
      }
    }
  }


  return (
    <View>
      {
        !confirm ? (
          <View style={{ width: width, height: height }} className='bg-red-800 items-center px-10 py-10'>
            <Image style={{ width: width * .2, borderRadius: 50, height: height * .1 }} source={Thiruvalluvarlogo} className='mb-10'></Image>
            <Text className='text-white font-bold text-xl mb-10'>Verify Using Mobile Number</Text>
            <Text className='text-gray-300 font-bold text-base'>Please Enter Your Mobile Number</Text>
            <Text className='text-gray-300 tracking-wide font-bold text-base'>Don't Want Country code (default India)</Text>
            <KeyboardAvoidingView className='mt-10 items-center'>
              <TouchableOpacity style={{ width: width * .8 }} className='flex-row border-2 border-gray-300 rounded-full  items-center'>
                <Text className='text-white font-bold text-base  absolute' style={{ paddingLeft: width * .02 }} >+91</Text>
                <TextInput maxLength={10} onChangeText={(MobileNumber) => setMobileNumber(MobileNumber)} placeholderTextColor={'white'} keyboardType='number-pad' style={{ width: width * .8, paddingLeft: width * .1 }}
                  className='text-white font-bold text-base' placeholder='Enter Your Number'></TextInput>
              </TouchableOpacity>
              {
                InvalidMessage != '' ? <Text className='text-white text-center font-bold'>{InvalidMessage}</Text> : null
              }
              <TouchableOpacity onPress={() => signInWithPhone(MobileNumber)} style={{ width: width * .7, height: height * .05 }} className='bg-white mt-10 justify-center items-center rounded-full'>
                <Text className='text-base text-black font-bold '>Send Verification Code</Text>
              </TouchableOpacity>
              <View className='flex-row mt-5 items-center'>
                <Text className='text-white font-bold text-base'>Already Have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Loginpages')}>
                  <Text className='text-orange-500  font-bold text-lg'>Login</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>) :

          <View style={{ width: width, height: height }} className='bg-red-800 items-center px-10 py-10'>
            <Image style={{ width: width * .2, borderRadius: 50, height: height * .1 }} source={Thiruvalluvarlogo} className='mb-10'></Image>
            <Text className='text-white font-bold text-xl mb-10'>Please Enter The OTP</Text>
            {/* <Text className='text-gray-300 font-bold text-base'>Please Enter Your Mobile Number</Text>
    <Text className='text-gray-300 tracking-wide font-bold text-base'>Don't Want Country code (default India)</Text> */}
            <KeyboardAvoidingView className=' items-center'>
              <TextInput onChangeText={(code) => setCode(code)} placeholderTextColor={'white'} keyboardType='number-pad' style={{ width: width * .8 }} className='text-white  font-bold text-base rounded-full border-2 border-gray-300 px-3' placeholder='Enter Your OTP' />
              {
                InvalidConfirmCode != '' ? <Text className='text-white font-bold text-base text-center'>{InvalidConfirmCode}</Text> : null
              }
              <TouchableOpacity onPress={() => confirmCode()} style={{ width: width * .7, height: height * .05 }} className='bg-white mt-10 justify-center items-center rounded-full'>
                <Text className='text-base text-black font-bold'>Verifying OTP</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>

          </View>}
    </View>
  )
}