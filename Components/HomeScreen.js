import { View, Text ,Dimensions,Image,TouchableOpacity,ScrollView, ImageBackground} from 'react-native'
import React, { useState } from 'react'
import favourite from '../assets/favourite.png';
import search from '../assets/search.png';
import share from '../assets/share.png';
import more from '../assets/more.png'
import user from '../assets/user.png'
import language from '../assets/language.png'
import close from '../assets/close.png'
import { array } from './AramCollection'
import { poorularray } from './PoorulCollection';
import { Innbamarray } from './InnbamCollection';
import { englisharray } from './AramEnglishCollection';
import { poorulenglisharray } from './PoorulEnglishCollection';
import { InnbamEnglisharray } from './InnbamEnglishCollection';
import tamilimg from '../assets/tamilimg.jpg'
import englishimg from '../assets/englishimg.jpg'
import keralaimg from '../assets/kerala.jpg'
import hindiimg from '../assets/hindiimg.jpg'
export default function HomeScreen({navigation}) {
    const{height,width}=Dimensions.get('screen')
    const[colorchange1,set_colorchange1]=useState('1')
    const[filecall,set_filecall]=useState('Aram')
    function colorchange(l)
    {
      if(l==='1'){
          set_colorchange1('1')
          set_filecall('Aram')
      }else if(l==='2'){
        set_colorchange1('2')
        set_filecall('Poorul')
      }else{
        set_colorchange1('3')
        set_filecall('Innbam')
      }
    }
   const[languagepage,set_languagepage]=useState(false)
   const[changelanguage,set_changelanguage]=useState('Tamil')

   const[langtamil,set_langtamil]=useState(true)
   const[langenglish,set_langenglish]=useState(false)
   const[langhindi,set_langhindi]=useState(false)
   const[langmalayalam,set_langmalayalam]=useState(false)
   const[available,set_available]=useState('')
   function languageselection(l)
   {
        if(l==='Tamil'){
        set_langtamil(true)
        set_langenglish(false)
        set_langhindi(false)
        set_langmalayalam(false)
        set_changelanguage('Tamil')
        setTimeout(()=>{
          set_languagepage(false)
        },500)

        }else if(l==='English'){
          set_langtamil(false)
          set_langenglish(true)
          set_langhindi(false)
        set_langmalayalam(false)
        set_available('')
        set_changelanguage('English')
        setTimeout(()=>{
          set_languagepage(false)
        },500)
        }else if(l==='hindi'){
          set_langtamil(false)
          set_langenglish(false)
          set_langhindi(true)
          set_langmalayalam(false)
          set_available('')
          setTimeout(()=>{
            set_languagepage(false)
          },500)
          set_available('Currently this Language is not Available')
        }
        else if(l==='kerala'){
          set_langtamil(false)
          set_langenglish(false)
          set_langhindi(false)
        set_langmalayalam(true)
        setTimeout(()=>{
          set_languagepage(false)
        },500)
        set_available('Currently this Language is not Available')
        }
   }
    // function languagechecking()
    // {
    //   if(langtamil===true){
    //     set_changelanguage('Tamil')
    //     set_languagepage(false)
    //     set_available('')
    //   }else if(langenglish===true){
    //     set_changelanguage('English')
    //     set_languagepage(false)
    //     set_available('')
    //   }else{
    //     set_available('Currently this Language is not Available')
    //   }
    //}
  return (
    <View style={{width:width,height:height}} className=' items-center bg-white'>
        <View style={{height:height*.12,width:width,backgroundColor:'#7b0100'}} >
            <View style={{height:height*.07,width:width}} className='justify-between  items-center flex-row'>
              <Text className='text-white text-xl absolute font-bold left-5'>{changelanguage==='Tamil'?'திருக்குறள்':'Thirukkural'} </Text>
              <View className='flex-row space-x-4 absolute right-5'>
              <TouchableOpacity className='p-1' onPress={()=>set_languagepage(true)}>
                <Image tintColor={'white'} source={language}/>
              </TouchableOpacity>
                {/* <TouchableOpacity>
                <Image tintColor={'white'} source={favourite}/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image tintColor={'white'} source={search}/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image tintColor={'white'} source={share}/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Image tintColor={'white'} source={more}/> 
                </TouchableOpacity>  */}

              <TouchableOpacity className='p-1' onPress={()=>navigation.navigate('Userpage')}>
                  <Image tintColor={'white'} source={user}/>
              </TouchableOpacity>
              </View>
            </View>
            <View style={{height:height*.04,width:width}} className='flex-row items-center '>
              <TouchableOpacity onPress={()=>colorchange('1')} style={{width:width*.34,height:height*.035}} className=' justify-center border-r-2 border-r-red-900'>
                  <Text style={{color:colorchange1==='1'?'white':'#cbd5e1',fontSize:colorchange1==='1'?16:14}} className=' text-center font-bold'>{changelanguage==='Tamil'?'அறம்':'Aram'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>colorchange('2')} style={{width:width*.33,height:height*.035}} className=' justify-center border-r-2  border-r-red-900'>
                  <Text style={{color:colorchange1==='2'?'white':'#cbd5e1',fontSize:colorchange1==='2'?16:14}} className='text-sm text-center text-white font-bold'>{changelanguage==='Tamil'?'பொருள்':'Poorul'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>colorchange('3')} style={{width:width*.33,height:height*.035}} className=' justify-center border-r-2  border-r-red-900'>
                  <Text style={{color:colorchange1==='3'?'white':'#cbd5e1',fontSize:colorchange1==='3'?16:14}} className='text-sm text-center text-white font-bold'>{changelanguage==='Tamil'?'இன்பம்':'Innbam'}</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{width:width,height:height*.83}} >
              <ScrollView >
                    { filecall==='Aram'?
                    (changelanguage==='Tamil'?array:changelanguage==='English'?englisharray:array).map((e,index)=>
                        <TouchableOpacity onPress={()=>navigation.navigate('AramDescription1',{set:e,lang:changelanguage})} key={index} style={{width:width}} className='flex-row items-center justify-between border-b-2 p-3 border-b-gray-300 px-5'>
                             <View className='flex-row'>
                              <Text className='text-black text-sm font-semibold'>{e.id}</Text>  
                              <Text style={{width:width*.65}} className='text-black  text-sm font-bold pl-8 '>{e.name}</Text>  
                            </View>
                            <Text style={{color:'#7b0100'}} className='  text-sm font-bold'>{e.size}</Text> 
                        </TouchableOpacity>
                      )
                      :filecall==='Poorul'?
                      (changelanguage==='Tamil'? poorularray:changelanguage==='English'?poorulenglisharray:poorularray).map((e,index)=>
                      <TouchableOpacity onPress={()=>navigation.navigate('PoorulDescription1',{set:e,lang:changelanguage})} key={index} style={{width:width}} className='flex-row items-center justify-between border-b-2 p-3 border-b-gray-300 px-5'>
                          <View className='flex-row'>
                            <Text className='text-black text-sm font-semibold'>{e.id}</Text>  
                            <Text style={{width:width*.65}} className='text-black  text-sm font-bold pl-8 '>{e.name}</Text>  
                          </View>
                          <Text  style={{color:'#7b0100'}} className='text-sm font-bold'>{e.size}</Text> 
                      </TouchableOpacity>
                    ):filecall==='Innbam'?
                    (changelanguage==='Tamil'? Innbamarray:changelanguage==='English'?InnbamEnglisharray:Innbamarray).map((e,index)=>
                        <TouchableOpacity onPress={()=>navigation.navigate('InnbamDescription1',{set:e,lang:changelanguage})} key={index} style={{width:width}} className='flex-row items-center justify-between border-b-2 p-3 border-b-gray-300 px-5'>
                            <View className='flex-row'>
                              <Text className='text-black text-sm font-semibold'>{e.id}</Text>  
                              <Text style={{width:width*.65}} className='text-black  text-sm font-bold pl-8 '>{e.name}</Text>  
                            </View>
                            <Text  style={{color:'#7b0100'}} className=' text-sm font-bold'>{e.size}</Text> 
                        </TouchableOpacity>
                      ):null
                      
                  }
              </ScrollView>
        </View>

        {
          languagepage===true?
          <View style={{width:width,height:height*.9,position:'absolute',top:height*.07}} className='bg-slate-50 rounded-xl  items-center space-y-2 '>
              <TouchableOpacity style={{width:width*.1,height:height*.04}}  onPress={()=>set_languagepage(false)} className=' self-end mt-2 justify-center items-center mr-2 '>
                  <Image className=' p-3' source={close}/>
              </TouchableOpacity>
            <View style={{width:width*.9,marginBottom:height*.18}} className=''>
                <Text className='text-black text-xl font-bold text-center'>Choose your language</Text>
                <View className=' mt-10 flex-row  justify-evenly'>
                  <TouchableOpacity onPress={()=>languageselection('Tamil')} style={{width:width*.35,height:height*.2}} activeOpacity={0.5} className='rounded-3xl bg-black justify-end items-center'>
                      <Image style={{width:width*.35,height:height*.2,opacity:langtamil?.5:1}}   className='rounded-3xl 'source={tamilimg}/>
                      <Text style={{bottom:height*.03,color:langtamil?'green':'white'}} className='absolute  text-lg font-bold'>{langtamil?'தமிழ்':'Tamil'}</Text>
                      <Text style={{bottom:height*.002,color:langtamil?'green':'white'}} className='absolute  text-lg font-bold'>{langtamil?'Tamil':'தமிழ்'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>languageselection('English')}  style={{width:width*.35,height:height*.2}} activeOpacity={0.5} className='rounded-3xl bg-black justify-end items-center'>
                      <Image style={{width:width*.35,height:height*.2,opacity:langenglish?.5:1}}   className='rounded-3xl 'source={englishimg}/>
                      <Text style={{bottom:height*.03,color:langenglish?'green':'white'}} className='absolute  text-lg font-bold'>{langenglish?'English':'English'}</Text>
                      <Text style={{bottom:height*.002,color:langenglish?'green':'white'}} className='absolute  text-base font-bold'>{langenglish?'English':'English'}</Text>
                  </TouchableOpacity>
                </View>
                <View className=' mt-10 flex-row  justify-evenly'>
                  <TouchableOpacity onPress={()=>languageselection('hindi')} style={{width:width*.35,height:height*.2}} activeOpacity={0.5} className='rounded-3xl bg-black justify-end items-center'>
                      <Image style={{width:width*.35,height:height*.2,opacity:langhindi?.5:1}}   className='rounded-3xl' source={hindiimg}/>
                      <Text style={{bottom:height*.03,color:langhindi?'green':'white'}} className='absolute  text-lg font-bold'>{langhindi?'हिंदी':'hindi'}</Text>
                      <Text style={{bottom:height*.002,color:langhindi?'green':'white'}} className='absolute  text-lg font-bold'>{langhindi?'hindi':'हिंदी'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>languageselection('kerala')}  style={{width:width*.35,height:height*.2}} activeOpacity={0.5} className='rounded-3xl bg-black justify-end items-center'>
                      <Image style={{width:width*.35,height:height*.2,opacity:langmalayalam?.5:1}}   className='rounded-3xl 'source={keralaimg}/>
                      <Text style={{bottom:height*.03,color:langmalayalam?'green':'white'}} className='absolute  text-lg font-bold'>{langmalayalam?'മലയാളം':'Malayalam'}</Text>
                      <Text style={{bottom:height*.002,color:langmalayalam?'green':'white'}} className='absolute  text-base font-bold'>{langmalayalam?'Malayalam':'മലയാളം'}</Text>
                  </TouchableOpacity>
                </View>
            </View>
            {
              available!=''?<Text className='text-red-700 text-base font-bold'>{available}</Text>:null
            }
            {/* <TouchableOpacity onPress={()=>languagechecking()} style={{width:width*.9,height:height*.05}} activeOpacity={.7} className='bg-pink-700 justify-center rounded-full items-center '>
                <Text className='text-white text-base font-bold'>Save</Text>
            </TouchableOpacity> */}
          </View>:null
        }
    </View>
  )
}