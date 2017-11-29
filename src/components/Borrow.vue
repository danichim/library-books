<template lang="html">
  <div>
    <el-tooltip content="Are you sure? Click this button once you are in possesion of the book." placement="top">
      <el-button @click="borrowBook()" type="primary" :disabled="isItDisabled">{{buttonContent}}</el-button>
    </el-tooltip>
    {{bookIsAt()}}
  </div>

</template>

<script>
import Vue from 'vue';
import eventHub from '../EventHub';
import { database } from '../firebaseInstance'
import firebase from 'firebase';
import moment from 'moment';

const booksRef = database.ref('books');
const borrowsRef = database.ref('borrows');
const usersRef = database.ref('users');

export default Vue.extend({
  props: ['bookKey'],
  firebase: {
    borrows: borrowsRef,
    users: usersRef
  },
  data() {
    return {
      buttonContent: "Borrow",
      currentlyAt: "There is currently no one in possesion of the book.",
      isItDisabled: false
    };
  },
  methods: {
    borrowBook () {

        const userBorrowsRef = database.ref(`borrows/`);
        userBorrowsRef.child(this.bookKey).update({currentlyAt: firebase.auth().currentUser.uid, date: new Date()});
        this.buttonContent = "Borrowed"
        this.isItDisabled = true;
    },
    bookIsAt() {
      var vm = this;
      console.log(vm.bookKey);
      console.log(this.bookKey);
      const book = vm.borrows.filter(e => e['.key'] === vm.bookKey)[0];

      if (!book) {
        this.buttonContent = "Borrow"
        this.isItDisabled = false;
        return "There is currently no one in possesion of the book.";
      }

      const date = vm.borrows.filter(e => e['.key'] === vm.bookKey)[0].date;
      const since = moment(date).fromNow();
      const getCurrentlyAtId = book.currentlyAt;
      const atThisId = vm.users.filter(e => e['uid'] === getCurrentlyAtId)[0];
      const displayName = atThisId.displayName;

      if(firebase.auth().currentUser.uid === atThisId.uid) {
        this.buttonContent = "Borrowed"
        this.isItDisabled = true;
        return "You currently have this book."
      }

      this.buttonContent = "Borrow"
      this.isItDisabled = false;
      return `This book is currently at ${displayName}. It has been here since ${since}`;

    }
  }
});
</script>

<style lang="css">
  .mt15 {
    margin-top: 15px;
  }
</style>
