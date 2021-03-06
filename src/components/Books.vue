<template>
  <div class="book-container">
    <el-row v-loading.body="loading">
      <div class="product-list-container clearfix">
        <article class="product-list-item clearfix" v-for="book in filterBooks">
          <a @click="details(book['.key'])" class="product-list-item-image-container cursor-hover" v-if="book.image">
              <img :class="{ grayscale : book.borrow }" class="product-list-item-image" :src="book.image.thumbnail" alt="alternative-image">
          </a>
          <div class="product-list-item-price">
            <div class="price-container">
              <div class="price-old-container clearfix">
                <span class="price-percent">Pagini</span>
              </div>
              <span class="price-good">{{book.pageCount}}</span>
            </div>
          </div>
          <div  :class="{ borrow : book.borrow }" class="product-list-item-info">
            <h1 class="product-list-item-title">
              {{ book.value }}
            </h1>
            <div class="book-subtitle" v-if="book.subtitle">{{ book.subtitle }}</div>
            <ul class="product-list-item-details">
              <li><strong>Autor</strong>: {{ book.authors.length > 1 ? book.authors.join(", ")  : book.authors[0]}}</li>
              <li><strong>Editura</strong>: {{book.publisher}}</li>
              <li><strong>Categorii</strong>: {{ book.categories.length > 1 ? book.categories.join(", ")  : book.categories[0] }}</li>
            </ul>
            <div class="product-list-item-share">
              <div>
                <el-button plain type="text" class="button" @click="details(book)">Details</el-button>
                <el-button plain type="text" class="button" @click="preview(book)">Preview</el-button>
                <el-badge :value="book.recommend.length" class="recommend" v-if="book.recommend">
                  <el-button plain type="text" class="button" @click="recommend(book)">Recommend</el-button>
                </el-badge>
                <el-button plain type="text" class="button" @click="recommend(book)" v-else>Be first who recommend</el-button>
                <el-button v-if="currentUser.administrator" plain type="text" class="button delete" @click="removeBook(book['.key'])">Delete</el-button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </el-row>
    <book-details></book-details>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import BookDetails from "./BookDetails";
import { database } from "../firebaseInstance";
import eventHub from "../EventHub";
import firebase from "firebase";
import _ from "lodash";
import { logout, getUser } from "../auth";

const currentUser = getUser();
const booksRef = database.ref("books");
const borrowsRef = database.ref("borrows");
const usersRef = database.ref("users");

export default Vue.extend({
  props: ["filtruCarti"],
  data() {
    return {
      loading: false,
      currentUser: currentUser,
      filtru: this.filtruCarti,
      filteredBooks: {}
    };
  },
  firebase: {
    books: booksRef,
    borrows: borrowsRef,
    users: usersRef
  },
  methods: {
    details(book) {
      eventHub.$emit("open-modal", book);
    },
    recommend(book) {
      //TODO: refactor this function
      var currentBookRef = booksRef.child(book[".key"]);
      if (!book.hasOwnProperty("recommend")) {
        var checkIfAlreadyReadBook = _.find(book.historyBorrow, function(h) {
          return h == currentUser.uid;
        });
        if (checkIfAlreadyReadBook) {
          currentBookRef.update({ recommend: [currentUser.uid] });
          this.$notify({
              title: 'Success',
              message: 'First who recommend this book.',
              type: 'success'
            });
        } else {
          console.log("cartea nu o fost citita");
          this.$notify.error({
            title: 'Error',
            message: 'Please read the book then recommend.'
          });
          //cartea nu a fost citita
        }
      } else {
        var checkIfAlreadyReadBook = _.find(book.historyBorrow, function(h) {
          return h == currentUser.uid;
        });
        if (checkIfAlreadyReadBook) {
          //ai citit cartea
          //check if already recommended
          var checkIfAlreadyRecommend = _.find(book.recommend, function(b) {
            return b == currentUser.uid;
          });
          if (!checkIfAlreadyRecommend) {
            book.recommend.push(currentUser.uid);
            currentBookRef.update({ recommend: book.recommend });
            //ai recomandat cartea
            this.$notify({
              title: 'Success',
              message: 'You recommend a book.',
              type: 'success'
            });
          } else {
            var removeCurrentIndex = _.findIndex(book.recommend, function(o) { return o == currentUser.uid; });
            //check if you already recommend
            book.recommend.splice(removeCurrentIndex);
            currentBookRef.update({ recommend: book.recommend });
            //deja ai recomandat cartea sterge recommend
            this.$notify({
              title: 'Remove',
              message: 'You remove the recommendation.',
              type: 'info'
            });
          }
        } else {
          console.log("cartea nu o fost citita");
          this.$notify.error({
            title: 'Error',
            message: 'Please read the book first then recommend.'
          });
          //nu ai citit cartea si nu o poti recomanda
        }
      }
    },
    preview(book) {
      var win = window.open(book.preview, "_blank");
      win.focus();
    },
    removeBook(key) {
      booksRef.child(key).remove();
      this.$notify({
        title: "Deleted",
        message: "Successfuly deleted book!",
        type: "success"
      });
      this.dialogVisible = false;
    }
  },
  created() {},
  computed: {
    filterBooks: function() {
      let filteredBooks = {};
      var vm = this;
      if (this.filtruCarti) {
        if (this.filtruCarti.length > 3) {
          return (filteredBooks = _.filter(this.books, function(b) {
            if (
              b.value.toLowerCase().includes(vm.filtruCarti.toLowerCase()) ||
              b.description.toLowerCase().includes(vm.filtruCarti.toLowerCase())
            ) {
              return b;
            }
          }));
        }
      } else {
        return this.books;
      }
    }
  },
  components: { BookDetails },
  mounted() {
    this.loading = true;
    booksRef.on("value", c => {
      //when data arrived
      this.loading = false;
    });
  }
});
</script>
<style>
.recommend {
  margin-left: 10px;
}
.borrow {
  border: 1px salmon solid;
  padding-left: 10px;
}
.grayscale {
  filter: gray; /* IE6-9 */
  -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
  filter: grayscale(1);
}
.product-list-container {
  border-bottom: solid 1px #b8b8b8;
  margin-bottom: 1.875em;
  overflow: hidden;
}

.product-list-item {
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
  width: 50%;
  border-top: solid 1px #b8b8b8;
  padding: 1.875em 0;
}

.product-list-container article:nth-child(2n + 1) {
  clear: left;
  border-right: solid 1px #b8b8b8;
  padding-right: 1.875em;
}

.product-list-container article:nth-child(2n + 1):before {
  content: "";
  display: block;
  background-color: #b8b8b8;
  width: 100%;
  height: 1px;
  position: absolute;
  top: -1px;
  left: 100%;
}

.product-list-container article:nth-child(2n + 1):after {
  content: "";
  display: block;
  background-color: #b8b8b8;
  width: 1px;
  height: 100%;
  position: absolute;
  top: 100%;
  right: -1px;
}

.product-list-container article:nth-child(2n) {
  clear: right;
  padding-left: 1.875em;
}

.product-list-item-image-container {
  float: left;
  display: block;
  width: 9.375em;
  height: 9.375em;
  margin-right: 0.625em;
}

.product-list-item-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.product-list-item-info {
  overflow: hidden;
}

.product-list-item-title {
  color: #404040;
  font-size: 1.25em;
  line-height: 1.2;
  font-weight: bold;
  text-transform: none;
  text-decoration: none;
  margin-bottom: 0.25em;
}

.product-list-item-title a {
  color: #404040;
  font-weight: bold;
  text-transform: none;
  text-decoration: none;
}

.product-list-item-title a:hover {
  text-decoration: underline;
}

.product-list-item-author,
.product-list-item-brand {
  display: block;
  line-height: 1.2;
  margin-bottom: 0.125em;
}

.product-list-item-brand,
.product-list-item-brand a {
  font-weight: 300;
}

.product-list-item-author a,
.product-list-item-brand a {
  color: #404040;
  text-transform: none;
  text-decoration: none;
}

.product-list-item-author a:hover,
.product-list-item-brand a:hover {
  text-decoration: underline;
}

.product-list-item-details {
  line-height: 1.4;
  margin-top: 1.25em;
}

.product-list-item-share {
  margin-top: 1.25em;
}

.product-list-item-share .button {
  vertical-align: middle;
}

.product-list-item-share .button.delete {
  margin-left: 10px;
}

.product-list-item-info-text {
  font-size: 0.875em;
  font-weight: 300;
  margin-right: 0.625em;
}

.product-list-item-share .social-icons {
  display: inline-block;
  vertical-align: middle;
}

.product-list-item-price {
  float: right;
  margin-left: 0.625em;
  font-size: 1.25em;
}
.price-container {
  cursor: default;
  line-height: 1;
}

.price-container .price-good {
  display: block;
  color: #f27928;
  font-size: 1.25em;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
}

.price-container .price-old-container {
  display: block;
  color: #404040;
  font-size: 0.75em;
  font-weight: 300;
  text-transform: none;
  margin-bottom: 0.5em;
}

.price-container .price-old {
  text-decoration: line-through;
}

.social-icons {
  line-height: 0;
}

.social-icons a {
  display: inline-block;
  width: 1.875em;
  height: 1.875em;
  margin-right: 0.625em;
  text-indent: 200%;
  white-space: nowrap;
  overflow: hidden;
  background: url(/img/images/sprites.png) no-repeat;
}

.social-icons .social-twitter {
  background-position: 0 -150px;
}

.social-icons .social-facebook {
  background-position: -50px -150px;
}

.social-icons .social-google {
  background-position: -100px -150px;
}

.social-icons .social-instagram {
  background-position: -150px -150px;
}

.social-icons .social-wishlist {
  background-position: -100px -250px;
}

.social-icons .social-library {
  background-position: -150px -250px;
}

.el-menu--dark {
  display: table;
  width: 100%;
}

html {
  min-height: 100%; /* make sure it is at least as tall as the viewport */
  position: relative;
}

@media screen and (max-width: 1024px) {
  .product-list-item {
    width: 100%;
  }
}
</style>
