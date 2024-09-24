import { View, Text,Dimensions,Image,TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { poorularray } from './PoorulCollection'
import shareimg from '../assets/shareimg.png'
import checkbox from '../assets/check_box.png'
import settings from '../assets/settings.png';
import play from '../assets/play.png';
import stop from '../assets/stop.png'
import backarrow from '../assets/backarrow.png'
import forwardarrow from '../assets/forwardarrow.png'
import heartnotfill from '../assets/favoritenotfill.png'
import favorite from '../assets/favourite.png'
import home from '../assets/home.png'
import { poorulenglisharray } from './PoorulEnglishCollection'
import Tts from 'react-native-tts';
import pause from '../assets/pause.png'
export default function PoorulDescription2({navigation,route}) {
  const{height,width}=Dimensions.get('screen')
  const[favoriteimg,set_favoriteimg]=useState(false)

  let {variable}=route.params
  let{lang}=route.params
  let description=(lang==='Tamil'? poorularray:lang==='English'?poorulenglisharray:poorularray).find(e=>e.desc.find(e=>e.count===variable))
  let dp=description.desc.find(e=>e.count===variable)

  function handlepageingincrese()
  {
    if(variable<1080){
    navigation.navigate('PoorulDescription2',{variable:(variable+1),lang:lang})
    }else{
        navigation.navigate('InnbamDescription2',{variable:(1081),lang:lang})
    }
  }
  function handlepageingdecrease()
  {
      if(variable>381){
      navigation.navigate('PoorulDescription2',{variable:(variable-1),lang:lang})
      }else{
          navigation.navigate('AramDescription2',{variable:(380),lang:lang})
      }
  }

  const[changeicon1,set_changeicon1]=useState('Changeicon1')
  const[changeicon2,set_changeicon2]=useState('Changeicon2')
  const[changeicon3,set_changeicon3]=useState('Changeicon3')
  const[changeicon4,set_changeicon4]=useState('Changeicon4')
  const[changeicon5,set_changeicon5]=useState('Changeicon5')
  const[changeicon6,set_changeicon6]=useState('Changeicon6')
  const[changeicon7,set_changeicon7]=useState('Changeicon7')
  
  function handlevoice(l,b){
      if(changeicon1===b){
          Tts.speak(l)
          Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon1('Changeicon1')
          }) 
          set_changeicon1('') 
      }else if(changeicon1===''){
          Tts.stop()
          set_changeicon1('Changeicon1')
      }
      if(changeicon2===b){
          Tts.speak(l);
          Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon2('Changeicon2')
          })
          set_changeicon2('')  
      }else if(changeicon2===''){
          Tts.stop()
          set_changeicon2('Changeicon2')
      }
      if(changeicon3===b){
          Tts.speak(l);
          Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon3('Changeicon3')
          })
          set_changeicon3('')  
      }else if(changeicon3===''){
          Tts.stop()
          set_changeicon3('Changeicon3')
      }
      if(changeicon4===b){
          Tts.speak(l);
          Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon4('Changeicon4')
          })
          set_changeicon4('')  
      }else if(changeicon4===''){
          Tts.stop()
          set_changeicon4('Changeicon4')
      }
      if(changeicon5===b){
          Tts.speak(l);
          Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon5('Changeicon5')
          })
          set_changeicon5('')  
      }else if(changeicon5===''){
          Tts.stop()
          set_changeicon5('Changeicon5')
      }
      if(changeicon6===b){
          Tts.speak(l);
          Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon6('Changeicon6')
          })
          set_changeicon6('')  
      }else if(changeicon6===''){
          Tts.stop()
          set_changeicon6('Changeicon6')
      }
      if(changeicon7===b){
          Tts.speak(l);
          Tts.addEventListener('tts-finish',(Event)=>{
            set_changeicon7('Changeicon7')
          })
          set_changeicon7('')  
      }else if(changeicon7===''){
          Tts.stop()
          set_changeicon7('Changeicon7')
      }
  }
  
  function changeiconsdecrease()
{
    Tts.stop()
    handlepageingdecrease()
    set_changeicon1('Changeicon1')
    set_changeicon2('Changeicon2')
    set_changeicon3('Changeicon3')
    set_changeicon4('Changeicon4')
    set_changeicon5('Changeicon5')
    set_changeicon6('Changeicon6')
    set_changeicon7('Changeicon7')
}
function changeiconsincrease()
{
    Tts.stop()
    handlepageingincrese()
    set_changeicon1('Changeicon1')
    set_changeicon2('Changeicon2')
    set_changeicon3('Changeicon3')
    set_changeicon4('Changeicon4')
    set_changeicon5('Changeicon5')
    set_changeicon6('Changeicon6')
    set_changeicon7('Changeicon7')
}
return (
  <View style={{width:width,height:height}} className='  items-center'>
      <View style={{width:width,height:height*.06,backgroundColor:'#620100'}} className='flex-row px-5 border-b-2 border-b-red-950 items-center'>
          <Text className='text-white text-lg font-bold'>{lang==='Tamil'?'குறள் : ':lang==='English'?'Kural : ':array} {dp.count}</Text>
          <View className='flex-row  absolute right-5 space-x-5 '>
              {/* <TouchableOpacity  style={{width:width*.06,height:height*.03}} className='justify-center'>
                  <Image tintColor={'white'} style={{width:width*.05,height:height*.025}} source={checkbox}/>
              </TouchableOpacity>
              <TouchableOpacity style={{width:width*.06,height:height*.03}} className='justify-center'>
                  <Image tintColor={'white'}  style={{width:width*.05,height:height*.025}}  source={settings}/>
              </TouchableOpacity> */}
              <TouchableOpacity style={{width:width*.05,height:height*.02}} className='justify-center'>
                  <Image tintColor={'white'} resizeMode='contain' style={{width:width*.05,height:height*.025}}  source={shareimg}/>
              </TouchableOpacity>
          </View>
      </View>
      <View style={{width:width,backgroundColor:'#620100'}} className='px-2 space-y-1 justify-around'>
          <Text className=' text-center font-bold text-white text-sm '>{description.title}/{description.subtitle}/{description.name}</Text>
          <Text className='text-white   '>{lang==='Tamil'?dp.option1:dp.translate}</Text>
          {lang==='Tamil'? <Text className='text-white '>{dp.option2}</Text>:null}
          <View className='flex-row self-center  '>
              <TouchableOpacity onPress={()=>handlevoice(lang==='Tamil'?dp.option1+dp.option2:dp.translate,'Changeicon1')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                  <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={changeicon1==='Changeicon1'?play:pause}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>Tts.stop()&&set_changeicon1('Changeicon1')} style={{width:width*.1,height:height*.04}} className='justify-center'>
                  <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={stop}/>
              </TouchableOpacity>
          </View>
      </View>
      <View style={{width:width*.95,height:height*.68}} className=' mt-2'>
          <ScrollView>
          { 
                lang!='English'?
               <View style={{width:width*.95}} className='bg-white mb-2'>
                    <View style={{width:width*.95,height:height*.05,backgroundColor:'#620100'}} className='flex-row items-center'>
                        <Text style={{paddingLeft:width*.1}} className='text-white text-lg font-bold '>மணக்குடவர் உரை</Text>
                        <View className='flex-row items-center absolute right-2 '>
                            <TouchableOpacity onPress={()=>handlevoice(dp.kudavar,'Changeicon2')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={changeicon2==='Changeicon2'?play:pause}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Tts.stop()&&set_changeicon2('Changeicon2')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={stop}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='px-2 py-2 leading-6 font-semibold text-black'>{dp.kudavar}</Text>
                </View>:null
                }
                { 
                lang!='English'?
                <View style={{width:width*.95}} className='bg-white mb-2'>
                    <View style={{width:width*.95,height:height*.05,backgroundColor:'#620100'}} className='flex-row items-center'>
                        <Text style={{paddingLeft:width*.1}} className='text-white text-lg font-bold '>மு.வரதராசனார் உரை</Text>
                        <View className='flex-row items-center absolute right-2 '>
                            <TouchableOpacity onPress={()=>handlevoice(dp.muva,'Changeicon3')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={changeicon3==='Changeicon3'?play:pause}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Tts.stop()&&set_changeicon3('Changeicon3')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={stop}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='px-2 py-2 leading-6 font-semibold text-black'>{dp.muva}</Text>
                </View>:null
                }
                { 
                lang!='English'?
                <View style={{width:width*.95}} className='bg-white mb-2'>
                    <View style={{width:width*.95,height:height*.05,backgroundColor:'#620100'}} className='flex-row items-center'>
                        <Text style={{paddingLeft:width*.1}} className='text-white text-lg font-bold '>மு.கருணாநிதி உரை</Text>
                        <View className='flex-row items-center absolute right-2 '>
                            <TouchableOpacity onPress={()=>handlevoice(dp.muka,'Changeicon4')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={changeicon4==='Changeicon4'?play:pause}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Tts.stop()&&set_changeicon4('Changeicon4')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={stop}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='px-2 py-2 leading-6 font-semibold text-black'>{dp.muka}</Text>
                </View>:null}
                { 
                lang!='English'?
                <View style={{width:width*.95}} className='bg-white mb-2'>
                    <View style={{width:width*.95,height:height*.05,backgroundColor:'#620100'}} className='flex-row items-center'>
                        <Text style={{paddingLeft:width*.1}} className='text-white text-lg font-bold '>சாலமன் பாப்பையா உரை</Text>
                        <View className='flex-row items-center absolute right-2 '>
                            <TouchableOpacity onPress={()=>handlevoice(dp.saalaman,'Changeicon5')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={changeicon5==='Changeicon5'?play:pause}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>Tts.stop()&&set_changeicon5('Changeicon5')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                                <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={stop}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className='px-2 py-2 leading-6 font-semibold text-black'>{dp.saalaman}</Text>
                </View>:null}
              <View style={{width:width*.95}} className='bg-white mb-2'>
                  <View style={{width:width*.95,height:height*.05,backgroundColor:'#620100'}} className='flex-row items-center'>
                      <Text style={{paddingLeft:width*.1}} className='text-white text-lg font-bold '>{lang==='Tamil'?'ஆங்கில மொழிபெயர்ப்பு':lang==='English'?'Translation':null}</Text>
                      <View className='flex-row items-center absolute right-2 '>
                          <TouchableOpacity onPress={()=>handlevoice(lang==='Tamil'?dp.translate:dp.option1+dp.option2,'Changeicon6')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                              <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={changeicon6==='Changeicon6'?play:pause}/>
                          </TouchableOpacity>
                          <TouchableOpacity  onPress={()=>Tts.stop()&&set_changeicon6('Changeicon6')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                              <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={stop}/>
                          </TouchableOpacity>
                      </View>
                  </View>
                  <Text className='px-2   text-base leading-6 font-semibold text-black'>{lang==='Tamil'?dp.translate:dp.option1}</Text>
                    {lang==='English'?<Text className='px-2  text-base leading-6 font-semibold text-black'>{dp.option2}</Text>:null}
              </View>
              <View style={{width:width*.95}} className='bg-white mb-2'>
                  <View style={{width:width*.95,height:height*.05,backgroundColor:'#620100'}} className='flex-row items-center'>
                      <Text style={{paddingLeft:width*.1}} className='text-white text-lg font-bold '>{lang==='Tamil'?'ஆங்கில  உரை':lang==='English'?'Explanation':null}</Text>
                      <View className='flex-row items-center absolute right-2 '>
                          <TouchableOpacity onPress={()=>handlevoice(dp.englishway,'Changeicon7')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                              <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={changeicon7==='Changeicon7'?play:pause}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>Tts.stop()&&set_changeicon7('Changeicon7')} style={{width:width*.1,height:height*.04}} className='justify-center '>
                              <Image tintColor={'white'} resizeMode='contain' style={{width:width*.1,height:height*.035}}  source={stop}/>
                          </TouchableOpacity>
                      </View>
                  </View>
                  <Text className='px-2 py-2 text-base leading-6 font-semibold text-black'>{dp.englishway}</Text>
              </View>
          </ScrollView>                 
      </View>
      <View style={{width:width,height:height*.07}} className=' flex-row items-center justify-evenly '>
      <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')&Tts.stop()} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className='rounded-full  justify-center items-center'>
                <Image tintColor={'white'} source={home}/>
            </TouchableOpacity>
          <TouchableOpacity onPress={()=>changeiconsdecrease()} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className='rounded-full  justify-center items-center'>
              <Image tintColor={'white'} source={backarrow}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>set_favoriteimg(!favoriteimg)} activeOpacity={1} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className=' rounded-full justify-center items-center'>
              <Image tintColor={'white'}  source={favoriteimg?favorite:heartnotfill}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>changeiconsincrease()} style={{width:width*.11,height:height*.05,backgroundColor:'#620100'}} className=' rounded-full justify-center items-center'>
              <Image   tintColor={'white'} source={forwardarrow}/>
          </TouchableOpacity>
      </View>
  </View> 
)
} 