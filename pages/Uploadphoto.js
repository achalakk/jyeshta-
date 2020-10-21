// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,TouchableHighlight,StyleSheet,Button, View,style, Text,Image, color,size,
  SafeAreaView,KeyboardAvoidingView,TextInput,Alert,platform,AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COMMONPATH } from '../core/utils';
import * as Font from 'expo-font';


//const Uploadblog = ({ route, navigation }) => {
  export default class Uploadphoto extends Component{
    state = {
      image: 'null',
     name:'',
     type:'',
     LocalImage:'',
    multipleUrl:[],
    selectedItems: []
    }
    constructor(props) {
      super(props);
     
  
      //setting default state
      this.state = {
        selectedItems:[],
        show: false,
        visible:false,
        LocalImage:'',
         multipleUrl:[],
         imagename:'',
		user_id:this.props.route.params.user_id,
        image:'',
      message:'',
     };
    }
    
    showProgressBar= () => {
      this.setState({loading: true})
    };
    hideProgressBar= () => {
      this.setState({loading: false})
    };
    componentDidMount() {
      this.getPermissionAsync()
   }
   Saveupload = () => { //Alert.alert("All Fields Are Mandatory");
    this.showProgressBar();
    const { user_id } = this.state;
    
   console.log(this.state.LocalImage);
       /*if(this.state.image=='undefined'||this.state.image==''||this.state.image=='null'||this.state.image==null){
      Alert.alert("Please Upload Image Or Document")
      this.hideProgressBar()
      return
    }*/
 
 
    const formData = new FormData();
     formData.append('user_id',this.state.user_id)
     
   /*  this.state.LocalImage.forEach((item) => {
       formData.append("file[]", {
         uri: item,
         type: "image/jpeg",
         name: item.split('/').pop(),
       });
	 });*/
	 formData.append('photo',this.state.LocalImage)
	      console.log(formData);
    //return false;
    fetch(COMMONPATH+'user/upload-photo', {
      method: 'POST',
      body: formData,
 
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideProgressBar()
        console.log(responseJson);
        // If server response message same as Data Matched
 
        if (responseJson.response == 'success') {
          alert('Photo Uploaded Successfully');
        //  Actions.requesterdashboard({type:ActionConst.RESET});
          // Actions.orders()
        } else {
          alert('Failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
 
   getPermissionAsync = async () => {
    if (Constants.platform.ios) {const { status } = await  Permissions.askAsync(Permissions.CAMERA_ROLL)
if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this  work!')
     }
}
}

_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    base64:true,
    aspect: [4, 3]
    //quality: 1
  });
  let imageUri = result ?   `data:image/jpg;base64,${result.base64}` : null
  //imageUri && {uri: imageUri}
  this.state.multipleUrl.push(imageUri)
   this.setState({
LocalImage: result.uri,type:result.type,show:true,visible:false
})


}
_takePhoto = async () => {
const {
status: cameraPerm
} = await Permissions.askAsync(Permissions.CAMERA)
const {
status: cameraRollPerm
} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
// only if user allows permission to camera AND camera roll
if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
let result = await ImagePicker.launchCameraAsync({
    base64: true,
    allowsEditing: false,
    aspect: [4, 3],
})

//  if (!result.cancelled) {
  //  this.setState({ image: result.uri,type:result.type,show:true,visible:false });
  //}
  if (!result.cancelled) {
    let imageUri = result ? `data:image/jpg;base64,${result.base64}` : null
 this.state.multipleUrl.push(imageUri)
 this.setState({
 LocalImage: result.uri,type:result.type,show:true,visible:false
 //,image:result.uri
     })

}
}
}
_renderImages() {
  let images = []
  this.state.LocalImage.map((item, index) => {
     images.push(
       <Image  key={index} source={item ? { uri: item } : null}  style={{ width:   100, height: 100 }} />
       )
     })
  return images
}

    render(){
   
      const { navigate } = this.props.navigation;
     
return (

  <ScrollView showsVerticalScrollIndicator={true}>

  <SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1, padding: 16 }}>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 25,
        //  textAlign: 'center',
          marginBottom: 10
        }}>
        Upload Photo
      </Text>
      <View style={styles.MainContainer}>
      
           <View style={styles.sidebyside} > 
         
           
        
         <Image resizeMode="cover"  source={{ uri:this.state.LocalImage }} style={{ width: wp("90%"), height: hp("30%"), marginRight : 5,padding :5, borderColor: "#dedede", borderWidth:1, marginBottom: 1, }}/>
       
       </View> 
         </View>

          
           <View  >
           <TouchableHighlight onPress={this._pickImage}   >
      <Text style={styles.btn}> <MaterialCommunityIcons name="image" color={color} size={size} />
        {""} Choose from camera roll </Text>
      </TouchableHighlight>


           </View>
           
           <Text> (Or) </Text>
           <View>
           <TouchableHighlight onPress={this._takePhoto}   >
      <Text style={styles.btn2}> <MaterialCommunityIcons name="camera" color={color} size={size} />
        {""} Take a photo </Text>
      </TouchableHighlight>

                
           </View>
           
         
       

<TouchableHighlight onPress={this.Saveupload} >
      <Text style={styles.btn}>  Submit </Text>
      </TouchableHighlight>
            

      {/*<TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Go to Home Tab</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Details')}>
        <Text>Open Detail Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Text>Open Profile Screen</Text>
      </TouchableOpacity>*/}
    </View>
     </View>
</SafeAreaView>
</ScrollView>
 );
};
  }
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
    fontFamily : "Poppins-Regular",
  },
  input: {
    margin: 15,
    height: 200,
    borderColor: '#7a42f4',
    width:300,
    borderWidth: 1,
    fontFamily : "Poppins-Regular",
    //textAlignVertical:top
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
  backgroundColor:"#4e0273",
  color: "#fff",
  padding : 10,
  fontSize: 16,
  height:45,
  textAlign:"center",
  borderRadius: 5,
  marginTop :10,  
  marginBottom: 10,
  width : wp("90%"),
  top:5,
  fontFamily : "Poppins-Regular",
    },


    
btn2:{
  backgroundColor:"#132660",
  color: "#fff",
  padding : 10,
  fontSize: 16,
  height:45,
  textAlign:"center",
  borderRadius: 5,
  marginTop :10,  
  marginBottom: 10,
  width : wp("90%"),
  top:5,
  fontFamily : "Poppins-Regular",
    },

  msgbox: {

     backgroundColor : "#fff",
     width : wp("90%"),
     padding: 15,
     height: hp("22%"),
     borderRadius: 5,
     color: "#000",
     borderWidth: 1,
     borderColor: "#dedede",
     fontSize: 15,
     fontFamily : "Poppins-Regular",

  }  
});
//export default Uploadblog;