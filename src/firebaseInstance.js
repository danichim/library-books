import firebase from 'firebase';
import config from '../config/firebase.config';

firebase.initializeApp(config);

const database = firebase.database();

export { database };
