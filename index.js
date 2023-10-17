/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBudk7baupqxL-c-Wfa4kfNwXkbTfa5XHc',
  projectId: 'nlp-project-8d2f2',
  storageBucket: 'nlp-project-8d2f2.appspot.com',
  messagingSenderId: '378996940462',
  appId: '1:378996940462:android:dc5761c734e07e74d6d73f',
};

initializeApp(firebaseConfig);


AppRegistry.registerComponent(appName, () => App);
