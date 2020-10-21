import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button, onPress, TouchableHighlight } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

class RModal extends Component {
	state = {
		isModalVisible: false
	};
	toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  
	render() {
		return (
      <ScrollView>
        <View style={styles.container}>
				<View style={styles.avtar}>
					<Image
						source={require('../assets/user.jpg')}
						style={styles.avataricon}
					/>
					<Text style={styles.font16}> Vamsi Krishna </Text>
					<Text style={styles.font16}> +91 9949688421 </Text>
				</View>
				<ScrollView style={{ marginBottom: 40 }}>
					<View>
						<TouchableOpacity style={styles.listfont} onPress={onPress}>
							<Text style={styles.list}> Profile </Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.listfont} onPress={onPress}>
							<Text style={styles.list}> People Pulse </Text>
						</TouchableOpacity>

    				<TouchableOpacity style={styles.listfont} onPress={onPress}>
							<Text style={styles.list}> Support </Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.listfont} onPress={onPress}>
							<Text style={styles.list}> About Jyeshta </Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.listfont} onPress={() => this.toggleModal()}>
							<Text style={styles.list}> Languages </Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<Modal
					transparent={true}
					onBackdropPress={() => this.toggleModal()}
					isVisible={this.state.isModalVisible}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>

            <Text style={styles.modalText}> Choose Your Preferred Language </Text>
							<Text style={styles.modalText}> English     </Text>
							<Text style={styles.modalText}> Telugu     </Text>
             

							<TouchableHighlight
								style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
								onPress={() => {
									this.toggleModal();
								}}
							>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>
			</View>
      
      </ScrollView>
			
		);
	}
}

export default RModal;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	},
	avtar: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		alignSelf: 'center',
		backgroundColor: '#391f5c',
		width: wp('100%'),
		height: hp('27%'),
		paddingTop: 30
	},
	avataricon: {
		width: 80,
		height: 80,
		backgroundColor: '#000',
		justifyContent: 'center',
		borderRadius: 100,
		marginBottom: 10,
		alignSelf: 'center'
	},

	font16: {
		fontSize: 16,
		textAlign: 'justify',
		lineHeight: 24,
		fontFamily : "Poppins-Regular",
				alignSelf: 'center',
		color: '#fff'
	},

	font18: {
		fontSize: 18,
		fontFamily : "Poppins-Regular",
				textAlign: 'justify',
		lineHeight: 24,
		alignSelf: 'center'
	},

	listfont: {
		paddingLeft: 15,
		fontFamily : "Poppins-Regular",
		borderBottomColor: '#dedede',
		borderBottomWidth: 1,
		margin: 10
	},
	list: {
		fontSize: 18,
		paddingBottom: 14,
		paddingTop: 10,
		fontFamily : "Poppins-Regular",
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		fontFamily : "Poppins-Regular",
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontFamily : "Poppins-Regular",
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontFamily : "Poppins-Regular",
	}
});