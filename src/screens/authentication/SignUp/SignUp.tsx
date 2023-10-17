import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Corrected icon name
import { ScrollView } from 'native-base';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { createAccoungWithEmailAndPassword, signInAnonymously, SignInWithEmailAndPassword, signInWithGoogle } from '../../../utitlities/Utility';
import Snackbar from 'react-native-snackbar';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const SignUp = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const [showError, setshowError] = useState(false)
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    })
    const getErrors = (name:string, email:string, password:string, confirmPassword:string) => {
        const newErrors = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
        };

        if (!email) {
            newErrors.email = "Please enter a valid email";
        } else if (!email.includes("@") || !email.includes(".com")) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password || password.length < 8) {
            newErrors.password = "Please enter a valid password (Check the length must be more than 8 characters)";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!name) {
            newErrors.name = "Please enter name";
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

    const handleRegister = () => {
        const newErrors = getErrors(name,email, password,confirmPassword); // Corrected the order of arguments
        if (Object.values(newErrors).some(error => error !== '')) {
            setshowError(true);
            setErrors(newErrors);
            console.log(newErrors);
        } else {
            console.log("Signed In");
            handleSignUp(email,password);
        }
    };

    const handleSignUp = (email,password) => {
        createAccoungWithEmailAndPassword(email,password)
        .then(() => {
            ToastAndroid.show("Account Created",ToastAndroid.SHORT)
        }).catch((emailError) => {
            if (emailError.code === 'auth/email-already-in-use') {
                Snackbar.show({
                  text: 'Email Address is already in use',
                  textColor: 'accent',
                  duration: 3000,
                });
            }
                else if (emailError.message === 'The email address is badly formatted.') {
                    Snackbar.show({
                      text: 'Invalid Email Address',
                      textColor: 'accent',
                      duration: 3000,
                    });
                }
                    else {
                        // Handle other errors or log the error message
                        console.error(emailError.message);
                      }
        })
    }

    

    const handleEmailChange = (email:string) => {
        // Clear the email error when the user types
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        setEmail(email);
      };
    
    const handleNameChange = (name :string) => {
        setErrors((prevErrors) => ({ ...prevErrors, name:''}));
        setName(name);
    }

    const handlePasswordChange = (password  :string) => {  
        setErrors((prevErrors) => ({ ...prevErrors, password:''}));
        setPassword(password);
    }

    const handleConfirmPasswordChange = (password :string) => {
        setErrors((prevErrors) => ({ ...prevErrors, password:''}));
        setConfirmPassword(confirmPassword);
    }

    return (
        <KeyboardAvoidingView>
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
                    style={{ paddingTop: 30 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginVertical: 8,
                            fontSize: 40,
                            marginBottom: 40,
                            color: 'black',
                            fontWeight: '900',
                            fontFamily: 'arial',
                        }}>
                        Welcome
                    </Text>
                    <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
                        {/* Name */}
                        <View style={{
                            width: '95%',
                            marginBottom: 20
                        }}>
                            <TextInput
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: 'black',
                                    borderRadius: 10,
                                    backgroundColor: 'white'
                                }}
                                placeholder="Enter your name"
                                placeholderTextColor='#00000090'
                                value={name}
                                onChangeText={handleNameChange}
                            />
                            {showError && errors.name !== '' && <Text style={{ color: 'red', padding:5,fontWeight:'400' }}>{errors.name}</Text>}
                        </View>

                        {/* Email */}
                        <View style={{
                            width: '95%',
                            marginBottom: 20
                        }}>
                            <TextInput
                                style={{
                                    paddingVertical: 10,
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
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: 'black',
                                    borderRadius: 10,
                                    backgroundColor: 'white'
                                }}
                                placeholder="Enter your password"
                                placeholderTextColor='#00000090'
                                value={password}
                                onChangeText={handlePasswordChange}
                            
                            />
                            {showError && errors.password !== '' && <Text style={{ color: 'red', padding:5,fontWeight:'400' }}>{errors.password}</Text>}
                        </View>

                        {/* Confirm Password */}
                        <View style={{
                            width: '95%',
                            marginBottom: 20
                        }}>
                            <TextInput
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    fontSize: 14,
                                    color: 'black',
                                    borderRadius: 10,
                                    backgroundColor: 'white'
                                }}
                                placeholder="Confirm password"
                                placeholderTextColor='#00000090'
                                value={confirmPassword}
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            />
                            {showError && errors.confirmPassword !== '' && <Text style={{ color: 'red', padding:5,fontWeight:'400' }}>{errors.confirmPassword}</Text>}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleRegister()}
                            style={{
                                width: '95%',
                                paddingVertical: 14,
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
                                    fontSize: 16
                                }}
                            >Register</Text>
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
                        <LoginWithIcon iconName={faGoogle} 
                        onPress={
                            () => signInWithGoogle()
                            .then(() => {
                                ToastAndroid.show("Signed In",ToastAndroid.SHORT)
                            }).catch((err) => {
                                console.log(err.stack);
                                Snackbar.show({
                                    text : err,
                                    duration : 3000,
                                    textColor : 'white'
                                })
                            })
                        } 
                            buttonTitle="Google"/>
                        
                        <LoginWithIcon iconName={faUser} onPress={() => signInAnonymously()} buttonTitle="Anonymous" />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignIn")}
                        style=
                        {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <View style={{ padding: 8 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: 'black'
                                }}>
                                Already a member?
                                <Text
                                    style={{
                                        color: '#0077b6',
                                        marginLeft: 10
                                    }}>
                                    Sign In now
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

const styles = StyleSheet.create({});
