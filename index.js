/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import * as firebase from "firebase"
import { name as appName } from './app.json';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL,PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from 'react-native-dotenv'

if (firebase.apps.length == 0) {
    firebase.initializeApp({
        apiKey: (API_KEY) ,
        authDomain: (AUTH_DOMAIN),
        databaseURL: (DATABASE_URL),
        projectId: (PROJECT_ID),
        storageBucket: (STORAGE_BUCKET) ,
        messagingSenderId: (MESSAGING_SENDER_ID) ,
        appId: (APP_ID),
        measurementId: (MEASUREMENT_ID)
    });
}else{
    firebase.app()
}
AppRegistry.registerComponent(appName, () => App);
