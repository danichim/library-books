<template>
  <el-menu :router="true" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="dashboard" class="logo-header"><img src="../assets/logo-assist.png" alt="" width="100"></el-menu-item>
    <el-menu-item index="dashboard">Browse</el-menu-item>
    <el-menu-item v-if="isAdmin" index="admin">Admin</el-menu-item>
    <el-menu-item v-if="isLoggedIn" index="books">My Books</el-menu-item>
    <el-menu-item index="resources">Resources</el-menu-item>
    <el-menu-item index="nas">NAS</el-menu-item>
    <el-submenu v-if="isLoggedIn" class="toggle-login2" index="2">
      <template slot="title">{{ displayName }}</template>
      <el-menu-item index="2-2" v-on:click="logout">Logout</el-menu-item>
    </el-submenu>
    <el-menu-item v-else class="toggle-login2" v-bind:class="{ hidden: isLoggedIn }" index="5"><router-link v-bind:to="'login'">Login</router-link></el-menu-item>
  </el-menu>
</template>

<script>
  import firebase from 'firebase';
  import { logout, getUser, usersRef } from '../auth';

  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isLoggedIn: false,
        isAdmin: false,
        displayName: ""
      };
    },
    methods: {
      logout: logout,
      firebase: firebase,
    },
    mounted() {
      var newUser = {};
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        usersRef.child(user.uid).once('value')
          .then((dataSnapshot) => {
            newUser = dataSnapshot.val();
            if (newUser) {
              this.displayName = newUser.displayName;
              this.isLoggedIn = newUser;
              this.isAdmin = newUser.administrator;
            }
          });
        }
      });
    }
  });
</script>

<style>
  .el-menu--horizontal .el-menu-item a, .el-menu--horizontal .el-menu-item a:hover {
    text-decoration: none;
  }
  .toggle-login {
    float: right!important;
    margin-right: 2em!important;
  }
  .logo-header {
    margin-left: 2em!important;
    background-color: #fff;
    opacity: 1;
  }
  .logo-header:hover {
    opacity: 0.7;
    background-color: #fff!important;
  }
</style>
