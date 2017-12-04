<template>

  <div class="main-container">
    <h3 class="text-center">Browse Books</h3>
    <el-row :gutter="20" v-if="filtru">
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
</template>

<script>
import firebase from "firebase";
import { database } from "../../firebaseInstance";
import Books from "../Books";
import _ from "lodash";

export default {
  name: "dashboard",
  data: () => {
    return {
      textFiltru: "",
      answer: "",
      filtru: true
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
  components: { Books },
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

