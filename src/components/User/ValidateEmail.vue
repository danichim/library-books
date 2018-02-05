<template>
  <div>
    <div class="main-container">
    <h3 class="text-center">Validate Your Account</h3>
    <el-row>
      <el-col :span="24" class="text-center">
        Check your inbox or resend!
      </el-col>
    </el-row>
    <el-row v-if="showButton">
      <el-col :span="24" class="text-center">
        <el-button @click="resendEmail" type="default">Send email now!</el-button>
      </el-col>
    </el-row>
    <el-row><p class="text-center" v-if="!showButton" v-html="txt"></p></el-row>
    </div>
  </div>
</template>

<script>
import firebase from '../../../node_modules/firebase';
import { getUser } from '../../auth';

const currentUser = getUser();

export default {
    name: 'validateEmail',
    data() {
      return {
        txt: 'c',
        showButton: true,
        currentUser: currentUser
      };
    },
    methods: {
      resendEmail() {
        if (!this.currentUser.emailVerified) {
          firebase.auth().currentUser.sendEmailVerification();
          this.txt = `An email was send to your address: <strong>${this.currentUser.email}</strong> go to <a href="http://mail.assist.ro" target="_blank">inbox</a>`;
          this.showButton = false;
        }
      }
    },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}
</style>
