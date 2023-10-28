import React,{useState,useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/appScreens/Home/Home';
import OnBoarding from './src/screens/authentication/OnBoarding/OnBoarding';
import SIgnIn from './src/screens/authentication/SignIn/SignIn';
import SignUp from './src/screens/authentication/SignUp/SignUp';
import { NativeBaseProvider, extendTheme } from 'native-base';
import auth from '@react-native-firebase/auth';
import Introduction from './src/screens/authentication/OnBoarding/Introduction';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import storage from '@react-native-firebase/storage';
// import { firebase } from '@react-native-firebase/app';

function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  // Handle user state changes
  const  onAuthStateChanged = (user) =>  {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  
  
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      <NavigationContainer>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Stack.Navigator
          screenOptions={{
            headerShown : false,
            
          }}>
            {
              user ? (
                <Stack.Screen name='Home' component={Home} />
                
              ) : (
                <>
                <Stack.Screen name ="Introduction" component={Introduction} />
                <Stack.Screen name='OnBoarding' component={OnBoarding} />
                <Stack.Screen name='SignIn' component={SIgnIn} />
                <Stack.Screen name='SignUp' component={SignUp} />
                
                </>
              )
            }
          {/* <Stack.Screen name='OnBoarding' component={OnBoarding} />
          <Stack.Screen name='SignIn' component={SIgnIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='Home' component={Home} /> */}
          </Stack.Navigator>
        </ScrollView>
      </NavigationContainer>
    </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#9DD9D2'
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default App;
