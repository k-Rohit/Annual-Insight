// import React from 'react';
// import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { COLORS } from '../../../colors/Colors';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

// // Import the image using require
// const legallensLogo = require('../../../images/tech-logo.png');

// const OnBoarding = ({navigation}) => {

//   const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
//     return (
//         <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={onPress}
//             style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: 'black',
//                 borderRadius: 10,
//                 paddingHorizontal: 20,
//                 paddingVertical: 14,
//                 elevation: 10,
//                 shadowColor: '#3a86ff',
//                 marginHorizontal: 10,
              
//             }}>
//             <FontAwesomeIcon icon={iconName} size={32} color="white" style={{ marginRight: 10 }} />
//             <Text style={{ color: 'white', fontSize: 18 }}>{buttonTitle}</Text>
//         </TouchableOpacity>
//     );
// };



//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLineGradOne} />
//       {/* <Text>OnBoarding</Text> */}
//       <View style={styles.imageContainer}>
//         <Image source={legallensLogo} style={styles.logoImage} />
//       </View>
//       <View style={styles.contentContainer}>
//         <View style={styles.title}>
//           <Text style={styles.description}>Annual Reports Summarizer</Text>
//           <Text style={styles.caption}>Effortless Report Insights</Text>

//         </View>
//         <View style={styles.buttonContainer}>
//           <LoginWithIcon iconName={faUserPlus} onPress={()=>navigation.navigate("SignUp")} buttonTitle="Register"/>
//           <LoginWithIcon iconName={faRightToBracket} onPress={()=>navigation.navigate("SignIn")} buttonTitle="Sign In"/>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor : "#E3E4E9"
//   },
//   imageBackground: {
//     backgroundColor: '#3C60BA', // Set the background color here
//     paddingHorizontal: 60, // Keep the width padding the same
//     paddingVertical: 100, // Adjust the height padding to increase height
//     borderRadius: 20,
//     marginTop: 60,
//     // Optional: Add borderRadius for a rounded background
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 10, // 10-pixel spacing
//   },
//   title: {
//     alignItems: 'center',
//   },
//   description: {
//     padding: 20,
//     fontSize: 26,
//     color: 'black',
//     marginBottom : 0
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10, // 10-pixel spacing
//   },
//   button: {
//     width: '40%',
//     backgroundColor: '#6F91E5', // Set your desired background color
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 10,
//     margin: 5,
//   },
//   caption: {
//     fontSize: 18, // Adjust the font size as needed
//  // Adjust the font weight as needed
//     color: 'black',
//     padding : 3 ,
//     paddingTop : 0,
//     marginBottom : 50,
//     fontStyle : 'italic',
//     fontWeight : 'bold',
//   },
//   button1: {
//     width: '40%',
//     backgroundColor: '#ACBFEE', // Set your desired background color
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 10,
//     margin: 5,
//   },
//   imageContainer: {
//     width: 200, // Set width and height to create a circular container
//     height: 200,
//     borderRadius: 100, // Use half of the width or height to create a circle
//     backgroundColor: 'transparent', // Set background to transparent
//     overflow: 'hidden', // Clip the image to the circular shape
//     margin: 20, // Adjust margin as needed
//     marginTop : 150
//   },
//   logoImage: {
//     width: '100%', // Make the image fill the circular container
//     height: '100%',
//   },

// });

// export default OnBoarding;



import React from 'react';
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video'; // Import the video component
import { COLORS } from '../../../colors/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const legallensLogo = require('../../../images/tech-logo.png');

const OnBoarding = ({ navigation }) => {
  const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white', // Use transparent for the background
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 14,
          elevation: 10,
          shadowColor: '#3a86ff',
          marginHorizontal: 10,
        }}>
        <FontAwesomeIcon icon={iconName} size={32} color="black" style={{ marginRight: 10 }} />
        <Text style={{ color: 'black', fontSize: 18 }}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../../images/stocks.mp4')} // Set the path to your video file
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={true}
        muted={true} // You may want to mute the video
      />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLineGradOne} />
      <View style={styles.imageContainer}>
        <Image source={legallensLogo} style={styles.logoImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.title}>
          <Text style={styles.description}>Annual Reports Summarizer</Text>
          <Text style={styles.caption}>Effortless Report Insights</Text>
        </View>
        <View style={styles.buttonContainer}>
          <LoginWithIcon iconName={faUserPlus} onPress={() => navigation.navigate("SignUp")} buttonTitle="Register" />
          <LoginWithIcon iconName={faRightToBracket} onPress={() => navigation.navigate("SignIn")} buttonTitle="Sign In" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent', // Set the background to transparent
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imageBackground: {
    backgroundColor: '#3C60BA', // Set the background color here
    paddingHorizontal: 60, // Keep the width padding the same
    paddingVertical: 100, // Adjust the height padding to increase height
    borderRadius: 20,
    marginTop: 60,
    // Optional: Add borderRadius for a rounded background
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10, // 10-pixel spacing
  },
  title: {
    alignItems: 'center',
  },
  description: {
    padding: 20,
    fontSize: 26,
    color: 'white',
    marginBottom : 0
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10, // 10-pixel spacing
  },
  button: {
    width: '40%',
    backgroundColor: '#6F91E5', // Set your desired background color
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  caption: {
    fontSize: 18, // Adjust the font size as needed
 // Adjust the font weight as needed
    color: 'white',
    padding : 3 ,
    paddingTop : 0,
    marginBottom : 50,
    fontStyle : 'italic',
    fontWeight : 'bold',
  },
  button1: {
    width: '40%',
    backgroundColor: '#ACBFEE', // Set your desired background color
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  imageContainer: {
    width: 200, // Set width and height to create a circular container
    height: 200,
    borderRadius: 100, // Use half of the width or height to create a circle
    backgroundColor: 'white', // Set background to transparent
    overflow: 'hidden', // Clip the image to the circular shape
    margin: 20, // Adjust margin as needed
    marginTop : 150
  },
  logoImage: {
    width: '100%', // Make the image fill the circular container
    height: '100%',
    backgroundColor : 'white',
    borderColor : 'white'
  },

});

export default OnBoarding;
