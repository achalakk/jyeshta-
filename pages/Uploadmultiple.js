// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, { Component } from 'react';
import { ScrollView,TouchableOpacity, StyleSheet,Button, View,style, Text,Image,
  SafeAreaView,KeyboardAvoidingView,TextInput,Alert,platform,AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//const Uploadblog = ({ route, navigation }) => {
  export default class Uploadblog extends Component{
    state = {
      image: 'null',
     name:'',
     type:'',
     LocalImage:[],
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
        LocalImage:[],
         multipleUrl:[],
         imagename:'',
   
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
   Saveupload = () => { Alert.alert("All Fields Are Mandatory");
    this.showProgressBar();
    const { message } = this.state;
    //const { user_id } = this.state;
    
   console.log(this.state.LocalImage);
    if(message==''){
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
     formData.append('message', message);
     //formData.append('user_id','19')
     
     this.state.LocalImage.forEach((item) => {
       formData.append("file[]", {
         uri: item,
         type: "image/jpeg",
         name: item.split('/').pop(),
       });
     });
    /* formData.append('file',{
      uri: this.state.LocalImage,
      type: 'image/jpeg', // or photo.type
      name: this.state.LocalImage
    });*/
    console.log(formData);
    //return false;
    fetch('http://localhost/jyeshta/api/v1/other/getbanner', {
      method: 'GET',
      body: formData,
 
    })
      .then(response => response.json())
      .then(responseJson => {
        this.hideProgressBar()
        console.log(responseJson);
        // If server response message same as Data Matched
 
        if (responseJson.status.response == 1) {
          alert('Order Was Placed Successfully');
        //  Actions.requesterdashboard({type:ActionConst.RESET});
          // Actions.orders()
        } else {
          alert('Order Was Placed Not Successfully');
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
LocalImage: this.state.LocalImage.concat([result.uri]),type:result.type,show:true,visible:false
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
 LocalImage: this.state.LocalImage.concat([result.uri]),type:result.type,show:true,visible:false
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
          marginBottom: 16
        }}>
        Upload Your Blog
      </Text>
      <TextInput label="message"
               multiline={true}
              numberOfLines={10}
               underlineColorAndroid = "transparent"
               placeholder = "Message"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.message}
              />
           <View >
                 <Button title="Pick an image from camera roll"  onPress={this._pickImage}/>
           </View>
           <View>
                 <Button onPress={this._takePhoto} title="Take a photo" />
           </View>
           <View style={styles.MainContainer}>
      
          <View style={styles.sidebyside} > 
         {
         this.state.LocalImage.map(dest=>{
           
        {
             return  <Image resizeMode="cover"  source={{ uri:dest }} style={{ width: 120, height: 120, marginRight : 5 }}/>
           
          //this.state.show ? (
           
         
         //   ) : null
           }
      })
    }


       {/*}    {
             this.state.show ?(
         this.state.LocalImage.map(dest=>{
         
            return  this.state.show ? (<Image source={{uri:dest}} style={{ width: 200, height: 200, }} />
           ) : null
           //this.state.imagename=this.state.imagename.split('/').pop();
         //{
           //this.state.show ? (
              
         //}
         })
             ):null
        }*/}
           </View> 
         </View>
           
             <Button
             title="Submit"
           onPress={this.Saveupload}
          />
            

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
  },
  input: {
    margin: 15,
    height: 200,
    borderColor: '#7a42f4',
    width:300,
    borderWidth: 1,
    //textAlignVertical:top
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
}
});
//export default Uploadblog;