import firebase from 'firebase';
import config from '../config/firebase';

firebase.initializeApp(config);

const database = firebase.database();

export { database };
