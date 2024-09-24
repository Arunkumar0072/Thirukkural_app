import { View, Text,Dimensions ,Image} from 'react-native'
import React, { useEffect } from 'react'
import ThirukkuralSplashimg from '../assets/ThirukkuralSplashimg.png'
import thirukkuralSplash1 from '../assets/thirukkuralSplash1.jpg'
export default function SplashScreen({navigation}) {
    const{height,width}=Dimensions.get('screen')
    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate('HomeScreen')
        }, 3000);
    },[])
  return (
    <View style={{width:width,height:height,backgroundColor:'#5a0000'}} className='  items-center '>
      <Image tintColor={'white'} style={{width:width,height:height*.8,resizeMode:'contain'}} className=''  source={ThirukkuralSplashimg}></Image>
      <Text style={{top:height*.65}} className='text-gray-300 font-bold text-3xl text-center  absolute'>திருக்குறள்</Text>
    </View>
  )
}