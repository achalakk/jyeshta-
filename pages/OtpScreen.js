import React, { Component } from "react";
import { View, Text,TextInput, SafeAreaView,StyleSheet,TouchableHighlight,Alert,ImageBackground,Image} from 'react-native';
import PropTypes from "prop-types";
import { COMMONPATH } from '../core/utils';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as Font from 'expo-font';


const getOTPTextChucks = (inputCount, inputCellLength, text) => {
  let otpText =
    text.match(new RegExp(".{1," + inputCellLength + "}", "g")) || [];

  otpText = otpText.slice(0, inputCount);

  return otpText;
};

class OTPTextView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: getOTPTextChucks(
        props.inputCount,
        props.inputCellLength,
        props.defaultValue
      ),
      otp:'',
      mobile: this.props.route.params.mobile
    };

    this.inputs = [];
  }
  showProgressBar= () => {
    this.setState({loading: true})
  };
  hideProgressBar= () => {
    this.setState({loading: false})
  };
  
  componentDidMount = () => {
    
    {/*const formData = new FormData();
    formData.append('phone_number', this.props.route.params.mobile);
    
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
       // If server response message same as Data Matched
 
       if (responseJson.response == 'success') {
         alert('Order Was Placed Successfully');
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
     });   */} 
  }
  
  basicValidation = (text) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  onTextChange = (text, i) => {
    const { inputCellLength, inputCount, handleTextChange } = this.props;

    if (text && !this.basicValidation(text)) {
      return;
    }

    this.setState(
      (prevState) => {
        let { otpText } = prevState;

        otpText[i] = text;
        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(""));
        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      }
    );
  };

  onInputFocus = (i) => {
    const { otpText } = this.state;

    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join("")) {
      this.inputs[prevIndex].focus();
      return;
    }

    this.setState({ focusedInput: i });
  };

  onKeyPress = (e, i) => {
    const val = this.state.otpText[i] || "";

    if (e.nativeEvent.key === "Backspace" && i !== 0 && !(val.length - 1)) {
      this.inputs[i - 1].focus();
    }
  };

  clear = () => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
      }
    );
  };

  setValue = (value) => {
    const { inputCount, inputCellLength } = this.props;
    this.setState(
      {
        otpText: getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        this.props.handleTextChange(value);
      }
    );
  };
  Submit= () => { 
    this.showProgressBar();
    //console.log(setValue(this.state.otpText));
  //const { mobile } = this.state;
  //const { user_id } = this.state;
  const {otp}=this.state.otpText.join('');
   console.log(this.state.otpText.join(''));
 
  const formData = new FormData();
   formData.append('phone_number', this.props.route.params.mobile);
   formData.append('user_otp', this.state.otpText.join(''));
   formData.append('fcm_token', '3224');
   
  console.log(formData);
  
  //return false;
  fetch(COMMONPATH+'user/otp-verify', {
    method: 'POST',
    body: formData,

  })
    .then(response => response.json())
    .then(responseJson => {
      this.hideProgressBar()
      console.log(responseJson);
      // If server response message same as Data Matched

      if (responseJson.response == 'failed') {
        alert('OTP did not match');
      } else
        {
        this.props.navigation.navigate('Home',{
          mobile: this.state.mobile,
          user_id:responseJson.result.user_id
        });
      
      }
    })
    .catch(error => {
      console.error(error);
    });
};
Resend= () => { 
  this.showProgressBar();
  //console.log(setValue(this.state.otpText));
//const { mobile } = this.state;
//const { user_id } = this.state;

const formData = new FormData();
 formData.append('phone_number', this.state.mobile);
 
console.log(formData);

//return false;
fetch(COMMONPATH+'user/resend-otp', {
  method: 'POST',
  body: formData,

})
  .then(response => response.json())
  .then(responseJson => {
    this.hideProgressBar()
    console.log(responseJson);
    // If server response message same as Data Matched

    if (responseJson.response == 'success') {
    alert("OTP Sent Successfully");
    } else
      {
     alert("OTP did not match");
    }
  })
  .catch(error => {
    console.error(error);
  });
};
  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      ...textInputProps
    } = this.props;

    const { focusedInput, otpText } = this.state;

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      const inputStyle = [
        styles.textInput,
        textInputStyle,
        { borderColor: offTintColor },
      ];

      if (focusedInput === i) {
        inputStyle.push({ borderColor: tintColor });
      }

      TextInputs.push(
        <TextInput
          ref={(e) => {
            this.inputs[i] = e;
          }}
          key={i}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoFocus={false}
          value={otpText[i] || ""}
          style={inputStyle}
          maxLength={this.props.inputCellLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={(text) => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={(e) => this.onKeyPress(e, i)}
          {...textInputProps}
        />
      );
    }

    return  <SafeAreaView style={{ flex: 1 }}>
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
        source={require('../assets/otp.png')}
      />


          <View  style={{ textAlign:"center", alignContent:"center", alignSelf:"center", justifyContent:"center"
        }}> 
            <Text style={styles.titleText}>
        OTP Verification
        
        
      </Text>
      <Text numberOfLines={5} style={styles.baseText}>You will get a OTP via SMS
      
      </Text>
      </View>
      
            <View style={{flexDirection: "row", justifyContent:"space-between", width:wp("80%")}}>{TextInputs}</View>
            <TouchableHighlight onPress={this.Submit}   >
      <Text style={styles.btn}> 
        Submit </Text>

       

      </TouchableHighlight >
      <TouchableHighlight onPress={this.Resend}   >
      <Text style={styles.baseText}> Didn't receive OTP? RESEND
      </Text>
      </TouchableHighlight>
        </View></View>
        </ImageBackground>
        </SafeAreaView>;
  }
}

OTPTextView.propTypes = {
  defaultValue: PropTypes.string,
  inputCount: PropTypes.number,
  containerStyle: PropTypes.any,
  textInputStyle: PropTypes.any,
  inputCellLength: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  handleTextChange: PropTypes.func,
  inputType: PropTypes.string,
  keyboardType: PropTypes.string,
};

OTPTextView.defaultProps = {
  defaultValue: "",
  inputCount: 4,
  tintColor: "#3CB371",
  offTintColor: "#DCDCDC",
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => {},
  keyboardType: "numeric",
};
const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    alignItems:"center",
    alignSelf :"center",
    textAlign:"center",
    fontFamily : "Poppins-Regular",

  },
  textInput: {
    padding: 10,
    margin : 5,
    borderWidth: 1,
    borderColor: "rgb(249, 250, 252)",
    height: 60,
    width: 60,
    lineHeight : 35,
    borderRadius: 5,
    textAlign: 'center',
    fontFamily : "Poppins-Medium",
    marginBottom : 10,
    fontSize: 28,
    color : "#fff",
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
  top: -30,
 
 },

 titleText: {
  fontSize: 20,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign : "center",
  alignSelf : "center",
  color : "#D2E9F5",
  fontFamily:'Poppins-Medium',

},
baseText: {
  color : "#D2E9F5",
marginTop : 7,
marginBottom : 15,
fontFamily : "Poppins-Regular",
},

});

export default OTPTextView;