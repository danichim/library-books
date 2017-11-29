<template>
  <div class="main-container">
    <h3 class="text-center">Browse Books</h3>
    <el-row :gutter="20" v-if="filtru">
      <el-col :span="11" :offset="5">
        <el-input
          placeholder="Cauta cartea"
          v-model="textFiltru"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button @click="clearFilter" type="text">Reset</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="filtru"><p class="text-center">{{ answer }}</p></el-row>
    <el-row :gutter="20">
      <books></books>
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
      answer: "All books",
      filtru: false
    };
  },
  methods: {
    getBooksFiltered: _.debounce(function() {
      if (this.textFiltru.length < 3) {
        this.answer = "Cautarea se face dupa 3 caractere. ;-)";
        return
      }
      this.answer = "Thinking...";
      var vm = this;
      //TODO: call to filter books by this.textFiltru
    }, 500),
    clearFilter() {
      if (this.textFiltru.length) {
        this.textFiltru = "";
        //TODO: reset all books
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

