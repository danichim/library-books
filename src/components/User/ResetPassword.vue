<template>
  <div>
      <h3 class="text-center">Reset your password</h3>
      <el-row v-if="showButton">
        <el-col :span="12" :offset="6">
          <el-col :span="12" :offset="4">
          <el-input placeholder="Enter email" v-model="fieldEmail">
              <template slot="append">@assist.ro</template>
            </el-input>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button @click="resetPassword" type="text">Reset password</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row v-if="!showButton">
        <el-col :span="24" class="text-center" v-html="text">
        </el-col>
      </el-row>
  </div>
</template>

<script>
import firebase from '../../../node_modules/firebase';
import { getUser } from '../../auth';

const currentUser = getUser();

export default {
    name: 'resetPassword',
    data() {
      return {
        text: '',
        fieldEmail: '',
        showButton: true
      };
    },
    methods: {
      resetPassword() {
        if (this.fieldEmail.length > 3) {
          firebase.auth().sendPasswordResetEmail(this.fieldEmail+'@assist.ro');
          this.text = `An email was sent to your address: <strong>${this.fieldEmail}@assist.ro</strong>`;
          this.showButton = false;
        }
      }
    },
};
</script>
