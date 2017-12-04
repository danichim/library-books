import firebase from 'firebase';
import config from '../config/globalConf';

firebase.initializeApp(config);

const database = firebase.database();

export { database };
