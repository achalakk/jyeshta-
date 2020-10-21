// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, { Component } from 'react';
import { View, Text,TextInput, SafeAreaView,StyleSheet,TouchableHighlight,Alert,ImageBackground,Image} from 'react-native';
import { COMMONPATH } from '../core/utils';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default class Register extends Component{
  constructor(props) {
    super(props);
   //console.log(this.props.route.params.mobile);

    //setting default state
    this.state = {
      mobile:'',
      name:'',
      location:'',
      language:''
    }
  }
  showProgressBar= () => {
    this.setState({loading: true})
  };
  hideProgressBar= () => {
    this.setState({loading: false})
  };

  Submit= () => { 
    this.showProgressBar();
  const { mobile } = this.state;
  const { name } = this.state;
  const { location } = this.state;
  const { language}=1;
 console.log(this.state.mobile);
  if(mobile=='' || name=='' || location==''){
    Alert.alert("All Fields are Mandatory")
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
   formData.append('name', name);
   formData.append('phone_number', mobile);
   formData.append('location', location);
   formData.append('language_id', 1);
   
  console.log(formData);
  //return false;
  fetch(COMMONPATH+'user/registration', {
    method: 'POST',
    body: formData
    
  })
    .then(response => response.json())
    .then(responseJson => {
      this.hideProgressBar()
      console.log(responseJson);
      // If server response message same as Data Matched

      if (responseJson.response == 'success') {
        this.props.navigation.navigate('OtpScreen',{
          mobile: mobile
        });
         //  Actions.requesterdashboard({type:ActionConst.RESET});
        // Actions.orders()
      } else {
      //  Toast.show('You registered successfully');   
      //  this.props.navigation.navigate('Home');
        alert('Failed');
      }
    })
    .catch(error => {
      console.error(error);
    });
};
  render(){
   
    const { navigate } = this.props.navigation;
   
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
        source={require('../assets/register.png')}
      />

<Text style={styles.titleText}>    Welcome </Text>
      <Text numberOfLines={5} style={styles.baseText}> Please enter your personal info
      {"\n"}{"\n"}
      </Text>

             <TextInput style={styles.input} autoCapitalize={'none'} maxLength={10} placeholder='Mobile Number'
           value={this.state.mobile} keyboardType="numeric"
           onChangeText={mobile => this.setState({ mobile })} />
        
              <TextInput style={styles.input} autoCapitalize={'none'}  placeholder='Name'
           value={this.state.name} keyboardType="ascii-capable"
           onChangeText={name => this.setState({ name })} />
           <TextInput style={styles.input} autoCapitalize={'none'} placeholder='Location'
           value={this.state.location} keyboardType="name-phone-pad"
           onChangeText={location => this.setState({ location })} />
        
          {/*onChangeText={(mobile) => this.onChanged(mobile)}*/} 
         
          <TouchableHighlight onPress={this.Submit}   >
      <Text style={styles.btn}> 
        Register </Text>
      </TouchableHighlight>
      </View>
   
        
        
        
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    alignItems:"center",
    alignSelf :"center",
    textAlign:"center"

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
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
    fontFamily : "Poppins-Regular",
  },
  
  input: {
    borderWidth: 1,  // size/width of the border
    borderColor: '#ffff',  // color of the border
  padding : 10,
  borderRadius : 5,
    height: 50,
    width : wp("80%"),
    color :"#fff",
    padding : 10,
    marginBottom:15,
    fontFamily : "Poppins-Regular",
},
 button2: {
  marginTop: 10
},
sidebyside : {
 
  flexDirection : 'row',
  flexWrap: "wrap",
  flex : 2,
  justifyContent : "center"
},
MainContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  margin: 10,
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
 
  marginBottom: 10,
  fontFamily : "Poppins-Regular",
  width : wp("80%"),
  top:5
    },

    Wel_icon:{
      width: 150,
      height : 150,
      alignItems: "center",
      alignSelf : "center",
      bottom: 0,
      position: "relative",
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom : 5,
      top: -30,
     
     },
    
     titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color : "#D2E9F5",
      fontFamily:'Poppins-Medium',
    },
    baseText: {
      color : "#D2E9F5",
    marginTop : 7,
    marginBottom : 10,
    fontFamily : "Poppins-Regular",
    },
    

});

//export default ProfileScreen;