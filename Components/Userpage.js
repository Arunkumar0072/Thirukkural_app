import { View, Text, Dimensions, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, TextInput, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import backarrow from '../assets/backarrow.png'
import edit from '../assets/edit.png'
import userimg from '../assets/userimg.png'
import camera from '../assets/camera.png'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import gallery from '../assets/gallery.png'
import storage from '@react-native-firebase/storage';
import radioChecked from '../assets/radioChecked.png'
import radioUnchecked from '../assets/radioUnchecked.png'
import calendar from '../assets/calendar.png'
import DatePicker from 'react-native-date-picker'
export default function Userpage({ navigation }) {
    const { height, width } = Dimensions.get('screen')
    const [userName, setuserName] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Gender, setGender] = useState('')
    const [DOB, setDOB] = useState('')
    const [userimage, setuserimage] = useState('')
    const val = auth().currentUser
    const useremail = val.email !== null ? val.email : val.phoneNumber != null ? val.phoneNumber : null


    useEffect(() => {
        getData()
    }, [])
    async function OnUploadFile(url) {
        await storage().ref(useremail + "/profile.png").putFile(url)
            .then((response) => {
                // console.log(response);
                // console.log(response.metadata.fullPath);
                GettingURl(response.metadata.fullPath)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    async function GettingURl(path) {
        //    console.log('Gettingurl'+path);
        const res = await storage().ref(path).getDownloadURL();
        //    console.log(res); 
        setuserimage(res)
        firestore()
            .collection('UserData')
            .doc(useremail)
            .update({
                userphoto: res
            })
            .then(() => {
                console.log('User updated in userpage!');
                getData()
            }).catch((Error) => {
                console.log(Error.message)
            });
    }
    async function getData() {
        const userdatas = await firestore().collection('UserData').doc(useremail).get();
        // console.log(userdatas);
        if (userdatas._data != undefined) {
            setuserName(userdatas._data.name === undefined ? '' : userdatas._data.name)
            setEmail(userdatas._data.email === undefined ? '' : userdatas._data.email)
            let num = userdatas._data.phoneNumber === undefined ? '' : userdatas._data.phoneNumber
            setPhone(num.substring(3, 14))
            setDOB(userdatas._data.DateofBirth === undefined ? '' : userdatas._data.DateofBirth)
            setGender(userdatas._data.gender === undefined ? '' : userdatas._data.gender)
            setuserimage(userdatas._data.userphoto === undefined ? '' : userdatas._data.userphoto)
            if (userdatas._data.gender === 'Male') {
                RadioFunction(true)
            } else if (userdatas._data.gender === 'Female') {
                RadioFunction(false)
            }
            // console.log(userdatas._data.userphoto);
        } else {
            firestore()
                .collection('UserData')
                .doc(useremail)
                .set({
                    name: '',
                    email: '',
                    phoneNumber: useremail,
                    DateofBirth: '',
                    gender: '',
                    userphoto: ''
                })
                .then(() => {
                    console.log('User added in userpage!');
                    getData()
                }).catch((Error) => {
                    console.log(Error.message)
                });
        }
    }
    const validateEmail = (email) => {
        if (String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
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
    const [SuccessMessage, setSuccessMessage] = useState('')
    const [UserNameColorChange, setUserNameColorChange] = useState(false)
    const [NumberColorValidation, setNumberColorValiadtion] = useState(false)
    const [EmailColorValidation, setEmailColorValidation] = useState(false)
    function onSave() {
        // console.log(isNaN(Phone));
        if (Phone.length === 10 && !isNaN(Phone) && validateEmail(Email) && ValidateUserName(userName)) {
            let num = '+91' + Phone
            firestore()
                .collection('UserData')
                .doc(useremail)
                .update({
                    name: userName,
                    email: Email,
                    phoneNumber: num,
                    gender: Gender,
                    DateofBirth: DOB,
                    userphoto: userimage
                })
                .then(() => {
                    console.log('User added!');
                    setSuccessMessage('User Data Is Updated')
                    setUserEditPage(true)
                    setNumberColorValiadtion(false)
                    setEmailColorValidation(false)
                    setUserNameColorChange(false)
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 1000)
                }).catch((Error) => {
                    console.log(Error.message)
                });
        }
        if ((Phone.length === 10 && (!isNaN(Phone)))) {
            setUserEditPage(false)
            setNumberColorValiadtion(false)
        } else {
            setNumberColorValiadtion(true)
        }
        if (validateEmail(Email)) {
            setUserEditPage(false)
            setEmailColorValidation(false)
        } else {
            setEmailColorValidation(true)
        }
        if (ValidateUserName(userName)) {
            setUserEditPage(false)
            setUserNameColorChange(false)
        } else {
            setUserNameColorChange(true)
        }
    }


    function LogoutFunction() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const [PhotoPick, setPhotoPick] = useState(false)
    function openCameraFunction() {
        ImagePicker.openCamera({
            width: width * .23,
            height: height * .1,
            cropping: true,
            showCropFrame: false,
            cropperCircleOverlay: true,

        }).then(image => {
            // console.log(image);
            OnUploadFile(image.path);
            setPhotoPick(false)
        }).catch(error => {
            console.log('canceled');
        });
    }
    function openGalleryFunction() {
        ImagePicker.openPicker({
            width: width * .23,
            height: height * .1,
            cropping: true,
            cropperCircleOverlay: true,
        }).then(image => {
            // console.log(image);
            OnUploadFile(image.path);
            setPhotoPick(false)
        });
    }
    const [ShowModal, setShowModal] = useState('')
    const [date, setDate] = useState(new Date())
    const [RadioSwap, setRadioSwap] = useState('')
    function RadioFunction(l) {
        if (l === true) {
            setRadioSwap(l)
            setGender('Male')
        } else {
            setRadioSwap(l)
            setGender('Female')
        }

    }
    const [UserEditPage, setUserEditPage] = useState(true)

    return (
        <View style={{ width: width, height: height }} className='bg-white items-center'>
            <View style={{ width: width, height: height * .25, backgroundColor: '#7b0100' }} className=' mb-5  items-center rounded-b-3xl'>
                <View style={{ width: width * .9 }} className='flex-row justify-between  items-center mt-5 '>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-red-800 p-1 rounded-full'>
                        <Image tintColor={'white'} source={backarrow}></Image>
                    </TouchableOpacity>
                    <Text className='text-xl tracking-wide font-bold text-white'>Profile</Text>
                    <TouchableOpacity onPress={() => LogoutFunction()} >
                        <Text className='text-white text-lg font-bold'>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: height * .04, width: width * .9 }} className=' items-center '>
                    <TouchableOpacity style={{ width: width * .24, height: height * .1, marginRight: width * .04 }} onPress={() => setPhotoPick(true)} className='justify-end '>
                        <Image style={{ width: width * .23, height: height * .1 }} className='rounded-full bg-black' source={userimage.length > 0 ? { uri: userimage } : userimg.length > 0 ? { uri: userimg } : userimg}></Image>
                        <TouchableOpacity onPress={() => setPhotoPick(true)} className='absolute self-end'>
                            <Image tintColor={'white'} source={camera}></Image>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setUserEditPage(false)} className='bg-red-800 flex-row eleva space-x-3 rounded-full items-center p-1 self-end'>
                        {!UserEditPage ? null : <Text className='text-white font-bold text-base pl-2'>Edit</Text>}
                        <Image tintColor={'white'} source={edit} />
                    </TouchableOpacity>
                </View>

                {/* here favoite icon like that put if you want */}
            </View>
            <View className='items-center self-center' style={{ width: width * .9, height: height * .65 }}>
                <View className='items-center self-center ' style={{ width: width * .9, height: height * .5 }}>
                    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
                        <Text style={{ position: 'relative', left: 4, top: userName === '' ? height * .038 : null }} className='font-bold  self-start'>UserName</Text>
                        {UserEditPage ?
                            <View style={{ width: width * .9, height: height * .056, position: 'relative', left: 4 }} className='justify-center '>
                                <Text className=' text-base text-black font-bold ' >{userName}</Text>
                            </View>
                            : <TextInput value={userName} onChangeText={(userName) => setuserName(userName)} className='border-b-2  text-base  font-bold border-b-gray-300 ' style={{ width: width * .9 }}></TextInput>}
                        {
                            UserNameColorChange ? <Text className='text-red-600 font-bold'>Invalid UserName</Text> : null
                        }
                        <Text style={{ position: 'relative', left: 4, top: Email === '' ? height * .038 : null }} className='font-bold mt-5 self-start'>Email</Text>
                        {UserEditPage ?
                            <View style={{ width: width * .9, height: height * .056, position: 'relative', left: 4 }} className='justify-center '>
                                <Text className=' text-base text-black font-bold ' >{Email}</Text>
                            </View>
                            :
                            <TextInput value={Email} onChangeText={(Email) => setEmail(Email)} className='border-b-2  text-base  font-bold  ' style={{ width: width * .9, borderBottomColor: EmailColorValidation ? 'red' : 'gray' }}></TextInput>}
                        {
                            EmailColorValidation ? <Text className='text-red-600 font-bold'>Invalid Email</Text> : null
                        }
                        <Text style={{ position: 'relative', left: 4, top: Phone === '' ? height * .038 : null }} className='font-bold  self-start mt-5'>Phone no</Text>
                        {UserEditPage ?
                            <View style={{ width: width * .9, height: height * .056, position: 'relative', left: 4 }} className='justify-center '>
                                {Phone != '' ? <Text className=' text-base text-black font-bold ' >+91{Phone}</Text> : null}
                            </View>
                            :
                            <View style={{ width: width * .9, borderBottomColor: NumberColorValidation ? 'red' : 'gray' }} className='border-b-2 flex-row items-center '>
                                <Text className='text-black text-base font-bold'>+91</Text>
                                <TextInput maxLength={10} keyboardType='number-pad' value={Phone} onChangeText={(Phone) => setPhone(Phone)} className='  text-base   font-bold '
                                    style={{ width: width * .9 }} ></TextInput>
                            </View>}
                        {
                            NumberColorValidation ? <Text className='text-red-600 font-bold'>Invalid phoneNumber</Text> : null
                        }
                        <Text style={{ position: 'relative', left: 4, top: Gender === '' ? height * .038 : null }} className='font-bold mt-5'>Gender</Text>
                        <View style={{ width: width * .9, position: 'relative', left: 4, height: height * .06, borderBottomWidth: UserEditPage ? null : 2, borderBottomColor: '#d1d5db' }} className='flex-row  space-x-10 items-center '>
                            {
                                Gender != '' ? (<Text className='text-base  font-bold  text-black' >{Gender}</Text>) : null
                            }
                            {!UserEditPage ?
                                <View className='flex-row space-x-5 absolute left-20'>
                                    <View className='flex-row items-center space-x-1'>
                                        <TouchableOpacity onPress={() => RadioFunction(true)}>
                                            <Image source={RadioSwap ? radioChecked : radioUnchecked} />
                                        </TouchableOpacity>
                                        <Text className='text-black font-bold'>Male</Text>
                                    </View>
                                    <View className='flex-row items-center space-x-1'>
                                        <TouchableOpacity onPress={() => RadioFunction(false)}>
                                            {RadioSwap === '' ? <Image source={radioUnchecked}></Image> : <Image source={RadioSwap ? radioUnchecked : radioChecked} />}
                                        </TouchableOpacity>
                                        <Text className='text-black font-bold'>Female</Text>
                                    </View>
                                </View> : null}
                        </View>
                        <Text style={{ position: 'relative', left: 4, top: DOB === '' ? height * .038 : null }} className='font-bold mt-5 self-start'>Date of Birth</Text>
                        <View className='flex-row items-center justify-between ' style={{ width: width * .9, borderBottomWidth: UserEditPage ? null : 2, borderBottomColor: '#d1d5db', height: height * .06, position: 'relative', left: 4 }}>
                            <Text className='text-base  font-bold  text-black' >{DOB}</Text>
                            {
                                !UserEditPage ? <TouchableOpacity className='p-1 rounded-full right-5  bg-gray-200' onPress={() => !UserEditPage ? setShowModal(true) : null}>
                                    <Image className='' source={calendar} />
                                </TouchableOpacity> : null
                            }
                        </View>

                        <DatePicker
                            modal
                            mode='date'
                            // theme='dark'

                            open={ShowModal}
                            date={date}
                            // minimumDate={new Date('2000-01-01')}

                            onConfirm={(date) => {
                                console.log(date);
                                let a = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                                setDOB(a)
                                setShowModal(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setShowModal(false)
                            }}
                        />

                        {/* <TouchableOpacity style={{width:width*.5,height:height*.05}} className='bg-red-700 justify-center items-center rounded-full self-center mt-5' onPress={()=>setShowModal(false)}>
                             <Text className='text-white font-bold text-base'>Cancel</Text>
                         </TouchableOpacity> */}
                    </ScrollView>
                </View>
                {
                    SuccessMessage != '' ?
                        <Text className='text-base text-black font-bold text-center mb-5'>{SuccessMessage}</Text>
                        : null
                }
                {
                    PhotoPick === true ?
                        (<View style={{ width: width, height: height * .18, top: height * .5 }} className='bg-gray-200 absolute justify-around'>
                            <TouchableOpacity onPress={() => openCameraFunction()} style={{ width: width, height: height * .05 }} className='bg-gray-200 space-x-5 flex-row justify-center items-center'>
                                <Image source={camera}></Image>
                                <Text className='text-black text-base font-bold '>Open Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openGalleryFunction()} style={{ width: width, height: height * .05 }} className='bg-gray-200 space-x-5 flex-row justify-center items-center'>
                                <Image source={gallery}></Image>
                                <Text className='text-black text-base font-bold '>Open Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPhotoPick(false)} style={{ width: width, height: height * .05 }} className='bg-gray-300 space-x-5 flex-row justify-center items-center'>
                                <Text className='text-black text-base font-bold '>Cancel</Text>
                            </TouchableOpacity>
                        </View>) : null
                }
                {PhotoPick || UserEditPage ? null :
                    <TouchableOpacity onPress={() => onSave()} style={{ width: width * .5, height: height * .05 }} className='bg-red-700 self-center mt-5 justify-center items-center rounded-full '>
                        <Text className='text-white font-bold text-xl'>Save</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

//  console.log(useremail)
// const phonenumber=auth().currentUser.providerId
// console.log(phonenumber)

// const docemail=auth().currentUser.email
// const docnumber=auth().currentUser.phoneNumber
// console.log(docemail)
// console.log(docnumber);
// const docid=docemail!=null?docemail:docnumber!=null?docnumber:null


// useEffect(()=>{
//     setEmail(docemail!=null?docemail:'')
//     setPhone(docnumber!=null?docnumber:'')
// },[])