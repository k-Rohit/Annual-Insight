import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Corrected icon name
import { ScrollView } from 'native-base';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signInAnonymously, SignInWithEmailAndPassword, signInWithGoogle } from '../../../utitlities/Utility';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Snackbar from 'react-native-snackbar';

const SignUp = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(false);

    const [showError, setshowError] = useState(false)
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    })
    const getErrors = (email, password) => {
        const newErrors = {
            email: '',
            password: '',
        };

        if (!email) {
            newErrors.email = "Please enter a valid email";
        } else if (!email.includes("@") || !email.includes(".com")) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password || password.length < 8) {
            newErrors.password = "Please enter a valid password (Check the length must be more than 8 characters)";
        }
        return newErrors;
    };


    const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    elevation: 8,
                    shadowColor: '#3a86ff',
                    marginHorizontal: 10,
                }}>
                <FontAwesomeIcon icon={iconName} size={32} color="white" style={{ marginRight: 10 }} />
                <Text style={{ color: 'white', fontSize: 16 }}>{buttonTitle}</Text>
            </TouchableOpacity>
        );
    };

    const handleSignIn = () => {
      const newErrors = getErrors(email, password); // Corrected the order of arguments
      if (Object.values(newErrors).some(error => error !== '')) {
          setshowError(true);
          setErrors(newErrors);
          console.log(newErrors);
      } else {
        setshowError(false);
        handleSignin({email: email, password: password});
        // console.log("Signed In");
      }
  }

  const handleSignin = ({email,password}) => {
    SignInWithEmailAndPassword({email, password})
    .then(() => 
    ToastAndroid.show("Logged In Successfully", ToastAndroid.SHORT))
    .catch((err) => {
        console.log(err.message);
            Snackbar.show({
                text : "Please check your credentials",
                duration : Snackbar.LENGTH_SHORT
            })
    })
  }

    const handleEmailChange = (email:string) => {
        // Clear the email error when the user types
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        setEmail(email);
      };
    
    const handlePasswordChange = (password  :string) => {  
        setErrors((prevErrors) => ({ ...prevErrors, password:''}));
        setPassword(password);
    }


    return (
        <KeyboardAvoidingView >
            <View>
                <TouchableOpacity
                    style={{
                        width: 40,
                        aspectRatio: 1 / 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 15,
                        paddingVertical: 10,
                        zIndex: 5,
                    }}>
                    <FontAwesomeIcon icon={faCircleArrowLeft} size={32} />
                </TouchableOpacity>
                <ScrollView
                    scrollEnabled={true}
                    style={{ paddingTop: 60 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginVertical: 8,
                            fontSize: 40,
                            marginBottom: 60,
                            color: 'black',
                            letterSpacing: 1,
                            fontWeight: '900',
                            fontFamily: 'arial',
                        }}>
                        Sign In
                    </Text>
                    <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
                        {/* Email */}
                        <View style={{
                            width: '95%',
                            marginBottom: 20
                        }}>
                            <TextInput
                                style={{
                                    paddingVertical: 12,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: 'black',
                                    borderRadius: 10,
                                    backgroundColor: 'white'
                                }}
                                placeholder="Enter your email"
                                placeholderTextColor='#00000090'
                                value={email}
                                onChangeText={handleEmailChange}
                            />
                             {showError && errors.email !== '' && <Text style={{ color: 'red', padding:5,fontWeight:'400' }}>{errors.email}</Text>}
                        </View>

                        {/* Password */}
                        <View style={{
                            width: '95%',
                            marginBottom: 20
                        }}>
                            <TextInput
                                style={{
                                    paddingVertical: 12,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: 'black',
                                    borderRadius: 10,
                                    backgroundColor: 'white'
                                }}
                                placeholder="Enter your password"
                                placeholderTextColor='#00000090'
                                secureTextEntry = {true}
                                value={password}
                                onChangeText={handlePasswordChange}
                            
                            />
                            {
                              hidePassword && <TouchableOpacity>

                              </TouchableOpacity>
                            }
                            {showError && errors.password !== '' && <Text style={{ color: 'red', padding:5,fontWeight:'400' }}>{errors.password}</Text>}

                        </View>

                        {/* Confirm Password */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleSignIn()}
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
                                // marginBottom: 10
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 17
                                }}
                            >Sign In</Text>
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 30
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#0d1321',
                                opacity: 0.4,
                                marginHorizontal: 10,
                                fontWeight: 'bold',

                            }}
                        >Or continue with</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                        <LoginWithIcon iconName={faGoogle} onPress={() => signInWithGoogle()} buttonTitle="Google"/>
                        
                        <LoginWithIcon iconName={faUser} onPress={() => signInAnonymously()} buttonTitle="Anonymous" />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                        style=
                        {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <View style={{ padding: 8 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: 'black'
                                }}>
                                Not a member
                                <Text
                                    style={{
                                        color: '#0077b6',
                                        marginLeft: 10
                                    }}>
                                    Sign Up now
                                </Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUp;
