import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../colors/Colors';
import { selectDoc, SignOut } from '../../../utitlities/Utility';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import Video from 'react-native-video';
import { Alert } from 'react-native';

const query = async (data) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/amitesh11/ANNUR-god",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    Snackbar.show({
      text: err.message,
      duration: Snackbar.LENGTH_SHORT
    })
  }
}

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  // const selectPdf = () => {
  //   return selectDoc();
  // }

  const handleSignOut = () => {
    try {
      SignOut();
      console.log('Signed Out');
    } catch (e) {
      console.log(e);
    }
  }

  const user = auth().currentUser;
  function summarizeText(inputText) {
    const apiUrl = `https://randomshit11-bart-peagsus-doc.hf.space/predict?text=${inputText}`;
  
    return fetch(apiUrl, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        console.log("Response:", response);
        return response.json();
      })
      .then((data) => {
        const summary = data.result; // Assuming your FastAPI endpoint returns a "result" field
        console.log("Summary:", summary);
        setOutputText(summary);
        toggleModal();
        return data; // Return the response data
      })
      .catch((error) => {
        console.error("Failed to summarize text:", error);
        throw error; // Rethrow the error
      });
  }
  

  return (
    <View style={styles.container}>
      <Video
        source={require('../../../images/letters.mp4')}// Set the path to your video file
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={true}
      />
      <KeyboardAvoidingView style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#0B1339', marginTop: 30, paddingBottom: 50 }}>
          Summarizer
        </Text>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}>
          <StatusBar backgroundColor={COLORS.bgLineGradOne} barStyle='dark-content' />

          <TextInput style={styles.input}
            value={inputText}
            onChangeText={text => setInputText(text)}
            placeholder="Enter your text here..."
            textAlignVertical='top'
            placeholderTextColor='white'
            multiline={true}
            spellCheck={false}
          />
          {/* <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingBottom: 5, marginTop: -15 }}>
            Output
          </Text>
          <TextInput style={styles.output}
            value={outputText} // Display the outputText
            placeholder="Summary"
            textAlignVertical='top'
            placeholderTextColor='white'
            multiline={true}
          /> */}

          <TouchableOpacity
            style={{
              width: '90%',
              paddingVertical: 14,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0B1339',
              borderRadius: 10,
              elevation: 8,
              shadowColor: '#3a86ff',
              marginBottom: 12,
            }}
            onPress={() => summarizeText(inputText)}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>SUMMARIZE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '90%',
              paddingVertical: 14,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 8,
              shadowColor: '#3a86ff'
            }}
            onPress={() => handleSignOut()}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeaderText}>Summary</Text>
              <ScrollView style={styles.modalTextContainer}>
                <Text selectable style={styles.modalText}>{outputText}</Text>
              </ScrollView>
              <TouchableOpacity onPress={() => toggleModal()} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  input: {
    width: '90%',
    height: '60%',
    borderRadius: 10,
    borderColor: '#3a86ff',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: -300,
    backgroundColor: 'black',
    padding: 20,
    shadowColor: '#3a86ff'
  },
  output: {
    width: '90%',
    height: '20%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 30,
    marginTop: 0,
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    shadowColor: '#3a86ff',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
 
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust the width to make the modal larger
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign : 'center',
  },
  modalTextContainer: {
    maxHeight : 200, // Adjust the maximum height as needed
  },
  modalText: {
    fontSize: 12,
    color: 'black',
    textAlign : 'center',
  },
  closeButton: {
    backgroundColor: '#0B1339',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
  },
})

export default Home;