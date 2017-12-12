<template lang="html">
  <div>
    <br/>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-tooltip content="Are you sure? Click this button once you are in possesion of the book." placement="top">
          <el-button @click="borrowBook()" type="primary" :disabled="isItDisabled">{{buttonContent}}</el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="8">
        <el-button @click="contactBooked()" type="warning" v-if="isItDisabled && !isItAtMe">Contact </el-button>
      </el-col>
      <el-col :span="8">
        <el-button @click="cancelBorrow()" type="default" v-if="isItAtMe">Cancel</el-button>
      </el-col>
      <el-col :span="24">
        {{bookIsAtHim}}<br/>{{txt}}
      </el-col>
    </el-row>
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
const userBorrowsRef = database.ref(`borrows/`);

export default Vue.extend({
  props: ['bookKey'],
  firebase: {
    books: booksRef,
    borrows: borrowsRef,
    users: usersRef,
    userBorrows: userBorrowsRef
  },
  data() {
    return {
      buttonContent: "Borrow",
      currentlyAt: "There is currently no one in possesion of the book.",
      isItDisabled: false,
      isItAtMe: false,
      currentUser: firebase.auth().currentUser,
      currentBookInfo: '',
      txt: ''
    };
  },
  computed: {
    bookIsAtHim() {
      this.bookIsAt()
    },
    contactHim() {
      return this.currentBook = _.find(this.userBorrows, ['.key', this.bookKey]);
    }
  },
  methods: {
    borrowBook () {
      //TODO: refactor this function
      if (!this.currentBookInfo.hasOwnProperty('historyBorrow')) {
        booksRef.child(this.bookKey).update({ borrow: true, historyBorrow: [this.currentUser.uid] });
        userBorrowsRef.child(this.bookKey).update({currentlyAt: this.currentUser.uid, date: new Date(), email: this.currentUser.email, value: _.find(this.books, ['.key', this.bookKey]).value});
        this.buttonContent = "Borrowed"
        this.isItDisabled = true;
      } else {
        var self = this;
        var checkIfAlreadyReadBook = _.find(this.currentBookInfo.historyBorrow, function(h) { return h == self.currentUser.uid })
        if (checkIfAlreadyReadBook) {
          booksRef.child(this.bookKey).update({ borrow: true });
        } else {
          this.currentBookInfo.historyBorrow.push(this.currentUser.uid);
          booksRef.child(this.bookKey).update({ borrow: true, historyBorrow: this.currentBookInfo.historyBorrow });
        }
        userBorrowsRef.child(this.bookKey).update({currentlyAt: this.currentUser.uid, date: new Date(), email: this.currentUser.email, value: _.find(this.books, ['.key', this.bookKey]).value});
        this.buttonContent = "Borrowed"
        this.isItDisabled = true;
      }
    },
    contactBooked () {
      let currentBookLet = _.find(this.userBorrows, ['.key', this.bookKey]);
      var confirm = window.confirm('Are you sure?');
      if (confirm == true) {
        var mailWindow = window.open('mailto:' + currentBookLet.email + '?subject=' + currentBookLet.value + '%26body=Hi%2C%20url%20is%3Ahttp%3A%2F%2Flibrary.assist.ro',  '_blank');
        mailWindow.blur();
        setTimeout(function(){ mailWindow.close(); }, 50);
      }
    },
    bookIsAt() {
      var vm = this;
      const book = vm.borrows.filter(e => e['.key'] === vm.bookKey)[0];

      if (!book) {
        this.buttonContent = "Borrow"
        this.isItDisabled = false;
        this.isItAtMe = false;
        this.txt = "There is currently no one in possesion of the book."
        return;
      }

      const date = vm.borrows.filter(e => e['.key'] === vm.bookKey)[0].date;
      const since = moment(date).fromNow();
      const getCurrentlyAtId = book.currentlyAt;
      const atThisId = vm.users.filter(e => e['uid'] === getCurrentlyAtId)[0];
      const displayName = atThisId.displayName;
      const cc = atThisId;

      if(vm.currentUser.uid === atThisId.uid) {
        this.buttonContent = "Borrowed"
        this.isItDisabled = true;
        this.isItAtMe = true;
        this.txt = "You currently have this book."
        return
      }

      this.buttonContent = "Borrowed"
      this.isItDisabled = true;
      this.isItAtMe = false;
      this.txt = `This book is currently at ${displayName}. It has been here since ${since}`;
      return
    },
    cancelBorrow() {
      this.buttonContent = "Borrow"
      this.isItDisabled = false;
      this.isItAtMe = false;
      this.txt = "There is currently no one in possesion of the book."
      //remove from db
      userBorrowsRef.child(this.bookKey).remove();
      booksRef.child(this.bookKey).update({ borrow: false });
    }
  },
  mounted() {
    var self = this;
    booksRef.on('value', (c) => { //when data arrived
      c.forEach(function(noteSnapshot) {
        if (self.bookKey === noteSnapshot.getKey()) {
          self.currentBookInfo = noteSnapshot.val();
        }
      });
    })
  }
});
</script>

<style lang="css">
  .mt15 {
    margin-top: 15px;
  }
</style>
