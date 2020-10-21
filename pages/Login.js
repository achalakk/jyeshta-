// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, { Component } from 'react';
import { View, Text,TextInput, SafeAreaView,StyleSheet,TouchableHighlight,Alert, ImageBackground,Image} from 'react-native';
import { COMMONPATH } from '../core/utils';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as Font from 'expo-font';

  import { AppLoading } from 'expo';

export default class Login extends Component{
  constructor(props) {
    super(props);
   

    //setting default state
    this.state = {
      mobile:'',
      fontloading:false
    }
  }
  showProgressBar= () => {
    this.setState({loading: true})
  };
  hideProgressBar= () => {
    this.setState({loading: false})
  };
  async componentDidMount() {
    await Font.loadAsync({
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          
        }) 
         this.setState({ fontloading: true })
  
      }  
  Submit= () => { 
    this.showProgressBar();
  const { mobile } = this.state;
  //const { user_id } = this.state;
  
 console.log(this.state.mobile);
  if(mobile==''){
    Alert.alert("All Fields Are Mandatory")
    this.hideProgressBar()
    return
  }
 console.log("sdadaas"); 
  
 /*if(this.state.image=='undefined'||this.state.image==''||this.state.image=='null'||this.state.image==null){
    Alert.alert("Please Upload Image Or Document")
    this.hideProgressBar()
    return
  }*/


  const formData = new FormData();
   formData.append('phone_number', mobile);
   
  console.log(formData);
  //return false;
  fetch(COMMONPATH+'user/login', {
    method: 'POST',
    body: formData,

  })
    .then(response => response.json())
    .then(responseJson => {
      this.hideProgressBar()
      console.log(responseJson);
      console.log(mobile);
      // If server response message same as Data Matched

      if (responseJson.response == 'success') {
        this.props.navigation.navigate('OtpScreen',{
          mobile: mobile
        });
       
       // alert('OTP');
      //  Actions.requesterdashboard({type:ActionConst.RESET});
        // Actions.orders()
      } else {
      //  Toast.show('You registered successfully');   
        this.props.navigation.navigate('Register',{
        mobile: mobile
      });
       // alert('Order Was Placed Not Successfully');
      }
    })
    .catch(error => {
      console.error(error);
    });
};

  render(){
    if (!this.state.fontloading) {
      return <AppLoading />;
    }
    
    if (this.state.fontloading) {
     
  return (
    <SafeAreaView style={{ flex: 1 }}>
       
      <ImageBackground
        style={{flex: 1}}
        //We are using online image to set background
        source={
          require('../assets/c_2.jpg')
        }
        //You can also set image from your project folder
        //require('./images/background_image.jpg')
      >
      

      <View style={styles.container}>

        
           
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>


      <Image
        style={styles.Wel_icon}
        source={require('../assets/login.png')}
      />

      <View style={styles.overlay} />  
     
      
      <Text style={styles.titleText}>
        Enter Your Phone Number
        
        
      </Text>
      <Text numberOfLines={5} style={styles.baseText}>We will send you the 4 digit verification code
      {"\n"}{"\n"}
      </Text>
         
         <TextInput style={styles.input} autoCapitalize={'none'} maxLength={10} placeholder='Mobile Number' placeholderTextColor = "#dedede"
           value={this.state.mobile} keyboardType="numeric"
           onChangeText={mobile => this.setState({ mobile })} />
          {/*onChangeText={(mobile) => this.onChanged(mobile)}*/} 
         
          <TouchableHighlight onPress={this.Submit}   >
      <Text style={styles.btn}> 
        Login </Text>
      </TouchableHighlight>
      </View>
   
        
        
        
      </View>
      </ImageBackground>
    </SafeAreaView>
    
  );
 }
}
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontFamily : "Poppins-Regular",
    },
  centerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily : "Poppins-Regular",
  },
  baseText: {
    color : "#D2E9F5",
    fontFamily : "Poppins-Regular",

  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color : "#D2E9F5",
    fontFamily : "Poppins-Regular",
     marginBottom : 10,
  
  },
 
  
  welcometxt: {
    fontSize: 22,
    color : "#D2E9F5",
    justifyContent : "center",
    alignContent: "center",
    alignSelf : "center",
    position : "relative",
    marginBottom : 20,
    fontFamily : "Poppins-Regular",
  
  },
  input: {
    borderWidth: 1,  // size/width of the border
    borderColor: '#fff',  // color of the border
  padding : 10,
  borderRadius : 5,
    height: 55,
    width : wp("80%"),
    color :"#fff",
    padding : 10,
    fontSize : 15,
    paddingLeft :20,
    fontFamily : "Poppins-Regular",
},
 button2: {
  marginTop: 10,
  fontFamily : "Poppins-Regular",
},
sidebyside : {
 
  flexDirection : 'row',
  flexWrap: "wrap",
  flex : 2,
  justifyContent : "center",
  fontFamily : "Poppins-Regular",
},
MainContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  margin: 10,
  fontFamily : "Poppins-Regular",
},
btn:{
  backgroundColor:"#fff",
  color: "#9602c0",
  padding : 12,
  paddingLeft : 20,
  paddingRight :20,
  fontSize: 16,
  height:50,
  textAlign:"center",
  borderRadius: 5,
  marginTop :10,  
  marginBottom: 10,
  width : wp("80%"),
  top:5,
  fontFamily : "Poppins-Regular",
    },
   
Wel_icon:{
 width: 180,
 height : 180,
 alignItems: "center",
 alignSelf : "center",
 bottom: 0,
 position: "relative",
 alignItems: 'center',
 justifyContent: 'center',
 marginBottom : 5,
 top: -50,
 fontFamily : "Poppins-Regular",
}

});

//export default ProfileScreen;