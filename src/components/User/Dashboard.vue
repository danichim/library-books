<template>
  <div class="main-container" v-if="currentUser.emailVerified">
    <h3 class="text-center">Browse Books</h3>
    <el-row :gutter="20">
      <el-col :span="11" :offset="5">
        <el-input
          placeholder="Search book"
          v-model="textFiltru"
          size="medium"/>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button @click="clearFilter" type="text">Reset</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20"><p class="text-center"><span v-if="textFiltru.length > 0">{{ answer }}</span></p></el-row>
    <el-row >
      <books :filtruCarti="textFiltru"></books>
    </el-row>
  </div>
  <validate-email v-else />
</template>

<script>
import firebase from "firebase";
import { database } from "../../firebaseInstance";
import Books from "../Books";
import ValidateEmail from "../User/ValidateEmail";
import ResetPassword from "../User/ResetPassword";
import _ from "lodash";
import { logout, getUser } from '../../auth';

const currentUser = getUser();

export default {
  name: "dashboard",
  data: () => {
    return {
      textFiltru: "",
      answer: "",
      txt: '',
      filtru: true,
      currentUser: currentUser
    };
  },
  methods: {
    getBooksFiltered: _.debounce(function() {
      if (this.textFiltru.length < 4) {
        this.answer = "Search need more than 3 chars. ;-)";
        return
      }
      this.answer = 'Results for : ' + this.textFiltru;
    }, 500),
    clearFilter() {
      if (this.textFiltru.length) {
        this.textFiltru = "";
      }
    }
  },
  components: { Books, ValidateEmail, ResetPassword },
  watch: {
    textFiltru: function() {
      if (this.textFiltru.length === 0) {
        this.answer = "All books";
        return;
      }
      this.answer = "Waiting for you to stop typing...";
      this.getBooksFiltered();
    }
  }
};
</script>

