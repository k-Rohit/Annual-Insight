import auth from '@react-native-firebase/auth';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import { useEffect } from 'react';


    GoogleSignin.configure({
        offlineAccess: true,
        forceCodeForRefreshToken: true,
        webClientId : '378996940462-cogfo9nk238ru994tprbvbj114asqi0c.apps.googleusercontent.com'
    })



export const createAccoungWithEmailAndPassword = (email,password) => {
    return auth().createUserWithEmailAndPassword(email,password)
}

export const SignOut = () => {
    auth().signOut();
}

export const signInWithGoogle = async () => {
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // // Get the users ID token
    // const { idToken } = await GoogleSignin.signIn();
  
    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
    try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    setState({ userInfo });
    // navigation.navigate("Home")
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      console.log("Not able to get user")
    }
  }
}



export const signInAnonymously = () => {
    return auth().signInAnonymously();
}
export const SignInWithEmailAndPassword = ({email,password}) => {
    return auth().signInWithEmailAndPassword(email, password)
}

export const selectDoc = async () => {
    try{
        const doc = await DocumentPicker.pick({
            type : [DocumentPicker.types.allFiles],
            // copyTo: 'documentDirectory'
        });
        console.log(doc);
        return doc;
    }catch(err){
       if(DocumentPicker.isCancel(err)){
            console.log(err)
       }
    }
    
}


export const uploadSelectedFile = async () => {
    const doc = await selectDoc(); // Await the promise
  
    if (doc) {
      const { name, type, uri } = doc[0];
      try {
        const storageRef = storage().ref('gs://nlp-project-8d2f2.appspot.com/' + name);
        await storageRef.putFile(uri);
  
        const downloadURL = await storageRef.getDownloadURL();
        console.log('File uploaded to:', downloadURL);
  
        // You can return the download URL or use it as needed
        return downloadURL;
      } catch (err) {
        console.log(err);
      }
    }
  };


function setState(arg0: { userInfo: import("@react-native-google-signin/google-signin").User; }) {
    throw new Error('Function not implemented.');
}

