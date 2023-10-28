import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import OnBoarding from './OnBoarding';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Introduction = ({ navigation }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoLoaded) {
      if (videoRef.current) {
        videoRef.current.seek(0);
        videoRef.current.setNativeProps({ paused: false });
      }
    }
  }, [videoLoaded]);

  const { width, height } = Dimensions.get('window');

  const handleScreenPress = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp page
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Video
          source={require('../../../images/ANNUAL-INSIGHT.mp4')}
          style={{ ...styles.video, width, height }}
          resizeMode="cover"
          repeat
          onEnd={() => {
            if (videoRef.current) {
              videoRef.current.seek(0);
            }
          }}
          onLoad={() => setVideoLoaded(true)}
          ref={videoRef}
        />
      </View>
      
      <TouchableOpacity
        activeOpacity={1} // Set activeOpacity to 1 to remove the opacity effect
        style={styles.fullScreenTouchable}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("OnBoarding")}
          style={{
            width: '95%',
            paddingVertical: 16,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            borderRadius: 10,
            elevation: 8,
            shadowColor: 'black',
            flexDirection: 'row', // Allow items to be in a row
          }}
        >
          <Text style={styles.touchToStartText}>Get Started  </Text>
          <Text>
            <FontAwesomeIcon icon={faArrowRight} color="white" style={{ marginLeft: 10, paddingLeft:10 }} />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1320',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  fullScreenTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Align the text at the bottom
    alignItems: 'center',
  },
  touchToStartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Introduction;
