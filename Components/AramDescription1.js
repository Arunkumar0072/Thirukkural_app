import { View, Text ,Dimensions,Image,TouchableOpacity,ScrollView} from 'react-native'
import React,{useState} from 'react'
import { array } from './AramCollection'
import stop from '../assets/stop.png'
import play from '../assets/play.png';
import backarrow from '../assets/backarrow.png' 
import forwardarrow from '../assets/forwardarrow.png'
import heartnotfill from '../assets/favoritenotfill.png'
import favorite from '../assets/favourite.png' 
import { poorularray } from './PoorulCollection';
import { englisharray } from './AramEnglishCollection';
import home from '../assets/home.png'
import { poorulenglisharray } from './PoorulEnglishCollection';
import Tts from 'react-native-tts';
import pause from '../assets/pause.png'
export default function AramDescription1({navigation,route}) {
    const{set}=route.params;
    const{lang}=route.params
    const{height,width}=Dimensions.get('screen')
    const[favoriteimg,set_favoriteimg]=useState(false)

    const val=(lang==='Tamil'?array:lang==='English'?englisharray:array).find(e=>e.id===set.id)
    function handlepageingincrese()
    {
        if(set.id<38){
        let increse=(lang==='Tamil'?array:lang==='English'?englisharray:array).find(e1=>e1.id===set.id+1)
        navigation.navigate('AramDescription1',{set:increse,lang:lang})
        }else{
            navigation.navigate('PoorulDescription1',{set:(lang==='Tamil'? poorularray[0]:lang==='English'?poorulenglisharray[0]:poorularray),lang:lang})
        }
    }
    function handlepageingdecrease(){
        let decrease=(lang==='Tamil'?array:lang==='English'?englisharray:array).find(e1=>e1.id===set.id-1)
        if(decrease!=undefined){
        navigation.navigate('AramDescription1',{set:decrease,lang:lang})
        }else{
            navigation.navigate('HomeScreen')
        }

    }
    const[changeicon,set_changeicon]=useState(true)
    const SpeakFunction=()=>
    {
        if(changeicon===true){
        // Tts.speak(`அதிகாரம்`+set.id+set.name+set.title+set.subtitle+val.desc.map(e=>'குறள்'+e.count+(lang==='Tamil'?e.option1+e.option2:e.translate)),Tts.setDefaultRate(0.6, true))
      Tts.speak(`'அதிகாரம்'${set.id}${set.name}${set.title}${set.subtitle}${val.desc.map(e=>'குறள்'+e.count+(lang==='Tamil'?e.option1+e.option2:e.translate))}`,Tts.setDefaultRate(0.6, true))
        Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon(true)
        })
        
        set_changeicon(false)
        }else{
            Tts.stop()
            set_changeicon(true)
        }
    }
   function StopFunction()
    {
        set_changeicon(true)
        Tts.stop();
    }
  return (
    <View style={{height:height,width:width}} className=' items-center '>
        <View style={{height:height*.06,width:width}} className='bg-red-800 px-5 flex-row items-center'>
            <Text style={{width:width*.7}} className='text-white  text-lg tracking-wide font-bold'>{set.id}: {set.name}</Text>
            <View className='flex-row  absolute right-5 space-x-5'>
                <TouchableOpacity onPress={()=>SpeakFunction()}>
                    <Image tintColor={'white'} source={changeicon?play:pause}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>StopFunction()}>
                    <Image tintColor={'white'} source={stop}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{width:width,height:height*.04}} className=' justify-center items-center'>
            <Text className='text-red-900 text-lg font-bold'>{set.title} : {set.subtitle}</Text>
        </View>
        <View style={{width:width*.97,height:height*.77}} className='bg-white mb-1'>
            <ScrollView>
                {
                   val.desc.map((e,index)=>
                    <TouchableOpacity onPress={()=>navigation.navigate('AramDescription2',{variable:e.count,lang})} key={index} style={{width:width*.97}} className='border-b-2  border-b-gray-300 px-2 py-2 '>
                        <Text  className='text-black text-sm '>{lang==='Tamil'? e.option1:e.translate}</Text>
                        {lang==='Tamil'?<Text className='text-black text-sm '>{lang==='Tamil'? e.option2:null}</Text>:null}
                        <Text style={{paddingRight:width*.1}} className='text-red-900  self-end font-bold'>{lang==='Tamil'?'குறள் : ':lang==='English'?'Kural : ':array} {e.count}</Text>
                    </TouchableOpacity>
                   )
                }
            </ScrollView>
        </View>
        <View style={{width:width,height:height*.07}} className=' flex-row items-center justify-evenly '>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')&StopFunction()} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className='rounded-full  justify-center items-center'>
                <Image tintColor={'white'} source={home}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handlepageingdecrease()&StopFunction()} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className='rounded-full  justify-center items-center'>
                <Image tintColor={'white'} source={backarrow}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>set_favoriteimg(!favoriteimg)} activeOpacity={1} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className=' rounded-full justify-center items-center'>
                <Image tintColor={'white'}  source={favoriteimg?favorite:heartnotfill}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handlepageingincrese()&StopFunction()} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className=' rounded-full justify-center items-center'>
                <Image   tintColor={'white'} source={forwardarrow}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}