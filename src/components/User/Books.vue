<template>
  <div class="main-container">
    <el-row>
    <el-col :span="24">
      <div id="list">
        <h3 class="text-center">Your Books</h3>
        <el-row v-loading.body="loading" v-if="filterBooks.length > 0">
          <div class="product-list-container clearfix">
            <article class="product-list-item clearfix" v-for="book in filterBooks">
              <a @click="details(book['.key'])" class="product-list-item-image-container cursor-hover">
                  <img class="product-list-item-image" :src="book.image.thumbnail" alt="alternative-image">
              </a>
              <div class="product-list-item-price">
                <div class="price-container">
                  <div class="price-old-container clearfix">
                    <span class="price-percent">Pagini</span>
                  </div>
                  <span class="price-good">{{book.pageCount}}</span>
                </div>
              </div>
              <div class="product-list-item-info">
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
                    <el-button v-if="currentUser.administrator" plain type="text" class="button" @click="removeBook(book['.key'])">Delete</el-button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </el-row>
        <div v-else><span class="align-center">No found</span></div>
      <book-details></book-details>
    </div>
    </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Vuex from 'vuex';
  import BookDetails from '../BookDetails';
  import { database } from '../../firebaseInstance'
  import eventHub from '../../EventHub'
  import firebase from 'firebase';
  import _ from 'lodash';
  import { logout, getUser } from '../../auth';

  const currentUser = getUser();
  const booksRef = database.ref('books');
  const borrowsRef = database.ref('borrows');
  const usersRef = database.ref('users');
  const userBorrowsRef = database.ref(`borrows/`);

  export default Vue.extend({
    props: ['filtruCarti'],
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
      users: usersRef,
      userBorrows: userBorrowsRef
    },
    methods: {
      details(book) {
        eventHub.$emit('open-modal', book)
      },
      preview(book) {
        var win = window.open(book.preview, '_blank');
        win.focus();
      },
      removeBook(key) {
        booksRef.child(key).remove();
        this.$notify({
          title: 'Deleted',
          message: 'Successfuly deleted book!',
          type: 'success'
        });
        this.dialogVisible = false;
      }
    },
    created() {
    },
    computed: {
      filterBooks: function () {
        let filteredBooks = [];
        var vm = this;
        if (this.userBorrows.length) {
            _.filter(this.borrows, function(b) {
              if (vm.currentUser.uid === b['currentlyAt']) {
                filteredBooks.push(_.find(vm.books, ['.key', b['.key']]));
              }
            });
            return filteredBooks;
        } else {
          return this.borrows
        }
      },
    },
    components: { BookDetails },
    mounted() {
      this.loading = true;
      booksRef.on('value', (c) => { //when data arrived
        this.loading = false;
      })
    }
  });
</script>
<style scoped>
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

  .product-list-container article:nth-child(2n+1) {
    clear: left;
    border-right: solid 1px #b8b8b8;
    padding-right: 1.875em;
  }

  .product-list-container article:nth-child(2n+1):before {
    content: "";
    display: block;
    background-color: #b8b8b8;
    width: 100%;
    height: 1px;
    position: absolute;
    top: -1px;
    left: 100%;
  }

  .product-list-container article:nth-child(2n+1):after {
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
    font-size: 1.250em;
    line-height: 1.2;
    font-weight: bold;
    text-transform: none;
    text-decoration: none;
    margin-bottom: 0.250em;
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
    margin-top: 1.250em;
  }

  .product-list-item-share {
    margin-top: 1.250em;
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
    font-size: 1.250em;
  }
  .price-container {
    cursor: default;
    line-height: 1;
  }

  .price-container .price-good {
    display: block;
    color: #f27928;
    font-size: 1.250em;
    font-weight: normal;
    text-decoration: none;
    text-transform: none;
  }

  .price-container .price-old-container {
    display: block;
    color: #404040;
    font-size: 0.750em;
    font-weight: 300;
    text-transform: none;
    margin-bottom: 0.500em;
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

  html{
    min-height:100%;/* make sure it is at least as tall as the viewport */
    position:relative;
  }

    @media screen and (max-width: 1024px) {
    .product-list-item {
        width: 100%;
    }
  }
</style>
