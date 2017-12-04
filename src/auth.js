import firebase from 'firebase';
import firebaseUiAuthCss from './vendors/firebase-ui-auth.css'; /* eslint no-unused-vars: 0 */
import firebaseui from 'firebaseui';
import { database } from './firebaseInstance';
import config from '../config/globalConf';

const user = {
  displayName: '',
  email: '',
  emailVerified: false,
  photoURL: '',
  uid: '',
  administrator: false,
  intern: false
};

const usersRef = database.ref('users');

const initAuthUI = function initAuthUI() {
  // firebaseui is imported by script tag
  // FirebaseUI config.
  const uiConfig = {
    signInSuccessUrl: '/dashboard',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/',
  };

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
};

const init = function init() {
  firebase.auth().onAuthStateChanged((theUser) => {
    if (theUser) {
      user.displayName = theUser.displayName;
      user.email = theUser.email;
      user.emailVerified = theUser.emailVerified;
      user.photoURL = theUser.photoURL;
      user.uid = theUser.uid;
      user.administrator = theUser.uid === config.adminRole;
      user.lastLoggedIn = new Date();
      user.intern = theUser.email.includes('@assist.ro');
      if (!theUser.emailVerified && user.intern && !theUser.sentEmail) {
        firebase.auth().currentUser.sendEmailVerification();
        user.sentEmail = true;
      }
      usersRef.child(firebase.auth().currentUser.uid).update(user);
      firebase.auth().currentUser.reload()
    } else {
      user.displayName = '';
      user.email = '';
      user.emailVerified = false;
      user.photoURL = '';
      user.uid = '';
      user.administrator = false;
      user.intern = false;
      user.sentEmail = false;
      user.createdDate = new Date();
      initAuthUI();
    }
  }, (error) => {
    console.log(error);
  });
};

const getUser = function getUser() {
  return user;
};

const logout = function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.replace('/login');
  }, (error) => {
    // An error happened.
    console.log(error);
    window.location.reload();
  });
};

export { init, getUser, logout, usersRef };
