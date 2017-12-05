<template>
  <div id="app">
    <article class="main" v-bind:class="{'start': !user.uid}">
      <div class="login" v-show="!user.uid">
        <h3 class="text-center">Login</h3>
        <div id="firebaseui-auth-container"></div>
      </div>
    </article>
    <reset-password />
  </div>
</template>

<script>
  import firebase from 'firebase';
  import ResetPassword from './User/ResetPassword';
  import { init, getUser } from '../auth';

  const user = getUser();
  const initApp = function initApp() {
    init();
  };

  export default {
    name: 'login',
    data() {
      return {
        user,
        email: '',
        password: '',
        nume: '',
      };
    },
    methods: {
    },
    events: {
    },
    components: { ResetPassword }
  };
</script>
