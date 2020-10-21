import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

// import ImageView from '../src/ImageView';
import ImageView from 'react-native-image-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {COMMONPATH} from "../core/utils";
 
const {width} = Dimensions.get('window');
const images1 = [
    {
        source: {
            uri:
                'https://avatars.mds.yandex.net/get-pdb/49816/d9152cc6-bf48-4e44-b2d5-de73b2e94454/s800',
        },
        title: 'London',
    },
   
    {
        source: {
            uri:
                'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
        },
        title: 'Paris',
    },

    {
      source: {
          uri:
              'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
      },
      title: 'Paris',
  },

  {
    source: {
        uri:
            'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
    title: 'Paris',
},

];





export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isImageViewVisible: false,
            images:this.props.route.params.data.result,
            //images:[],
            likes: [...this.props.route.params.data.result ].reduce((acc, image) => {
                return acc;

            }, {}),
        };

        this.renderFooter = this.renderFooter.bind(this);
    }
   

    renderFooter({title}) {
        const {likes} = this.state;

        return (
            <View style={styles.footer}>
                <Text style={styles.footerText}>{title}</Text>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => {
                        const imageLikes = likes[title] + 1;
                        this.setState({likes: {...likes, [title]: imageLikes}});
                    }}
                >
                    <Text style={styles.footerText}> Download </Text>

                    <Text style={[styles.footerText, {marginLeft: 7}]}>
                        {likes[title]}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {isImageViewVisible, imageIndex} = this.state;
      

        return (
            <View style={styles.container}>


              <View style={styles.gallery_view}>
                <View style={styles.gallery}>
                    {this.state.images.map((image, index) => (
                        <TouchableOpacity
                            key={image.title}
                            onPress={() => {
                                this.setState({
                                    imageIndex: index,
                                    isImageViewVisible: true,
                                });
                            }}
                        >
                            <Image
                                style={styles.gallery_pic}
                                source={image.source}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                </View>
               
                <ImageView
                    glideAlways
                    images={this.state.images}
                    imageIndex={imageIndex}
                    animationType="fade"
                    isVisible={isImageViewVisible}
                    renderFooter={this.renderFooter}
                    onClose={() => this.setState({isImageViewVisible: false})}
                    onImageChange={index => {
                        console.log(index);
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: '#fff',
      
       margin :10,
        paddingTop: Platform.select({ios: 0, android: 10}),
    },
  
    footer: {
        width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    footerButton: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    footerText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },

    gallery_view: {

      justifyContent :"flex-start",
     
    },


    gallery: {

    flexDirection : "row",
    flexWrap :"wrap",      
    justifyContent: "center"
          
    },

    gallery_pic: {
    width : wp("44%"),
      height : 180,
      margin: 5,
      borderRadius:5,
      justifyContent:"flex-start"
     
    }
});
