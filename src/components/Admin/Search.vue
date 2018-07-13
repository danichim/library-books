<template>
  <div class="container-search">
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="textfieldBook"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please enter Author/Book"
      :trigger-on-focus="false"
      @select="handleSelect"
      icon="plus"
      :on-icon-click="addBook"
      custom-item="my-item-en"
    ></el-autocomplete>
    <el-button type="primary" @click="showAddBook">Add custom book</el-button>
  </div>
</template>

<style>

  .container-search {
    margin-top: 9px;
  }
  .my-autocomplete ul li {
    margin: 4px 0;
    margin-right: 15px;
  }
  .my-autocomplete .el-scrollbar__bar.is-vertical {
    width: 12px;
  }
  .container-search .el-autocomplete {
    width: 70% !important;
    display: inline-block !important;
    margin: 10px auto !important;
  }
  .el-autocomplete-suggestion li img {
    max-width: 80px;
    max-height: 250px;
    display: inline;
    float: left;
    margin-right: 20px;
  }
  .my-autocomplete .title {
    text-overflow: ellipsis;
    display: inline;
        position: relative;

    text-overflow: ellipsis;
    overflow: hidden;
  }
  .my-autocomplete .authors {
    font-size: 10px;
    color: #48576a;
    line-height: 12px;
    margin-bottom: 5px;
  }

  .my-autocomplete li,
  .my-autocomplete li.hidden:nth-child(even) + .my-autocomplete li:nth-of-type(odd) + .my-autocomplete li:nth-of-type(even),
  .my-autocomplete li.hidden:nth-child(even) + .my-autocomplete li.hidden:nth-child(odd) ~ .my-autocomplete li:nth-of-type(odd) {
      background: #c6c6c6;
  }

  .my-autocomplete li:nth-child(even),
  .my-autocomplete li.hidden:nth-child(even) ~ .my-autocomplete li:nth-of-type(odd),
  .my-autocomplete li.hidden:nth-child(even) + .my-autocomplete li.hidden:nth-child(odd) ~ .my-autocomplete li:nth-of-type(even) {
      background: #e0e0e0;
  }
</style>

<script>
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import config from '../../../config/firebase';
  import { database } from '../../firebaseInstance';
  import eventHub from "../../EventHub";

  const booksRef = database.ref('books');

  Vue.component('my-item-en', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('img', { attrs: { src: item.image.smallThumbnail, class: 'img-search' } }, []),
        h('div', { class: 'title' } , [item.value]),
        h('div', { class: 'authors' }, [item.authors]),
        h('div', { class: 'subtitle' }, [item.subtitle])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });

  function querySearchAsync (queryString, cb) {
    fetch(`https://www.${config.googleBooksApiUrl}?q=${queryString}&key=${config.googleBooksApiKey}`)
      .then(response => {
        return response.json()
      })
      .then(json => {
        cb(json.items.map(e => {
          return {
            value: e.volumeInfo.title,
            googleId: e.id,
            title: e.volumeInfo.title || '',
            subtitle: e.volumeInfo.subtitle || '',
            description: e.volumeInfo.description || '',
            image: e.volumeInfo.imageLinks || '',
            pageCount: e.volumeInfo.pageCount || '',
            categories: e.volumeInfo.categories || '',
            publisherDate: e.volumeInfo.publisherDate || '',
            printType: e.volumeInfo.printType || '',
            publisher: e.volumeInfo.publisher || '',
            authors: e.volumeInfo.authors || '',
            preview: e.volumeInfo.previewLink || '',
            ratingsCount: e.volumeInfo.ratingsCount || '',
            averageRating: e.volumeInfo.averageRating || '',
            maturityRating: e.volumeInfo.maturityRating || '',
            mainCategory: e.volumeInfo.mainCategory || '',
            language: e.volumeInfo.language || '',
            ISBN: e.volumeInfo.industryIdentifiers || '',
            borrow: false
          }
        }));
      }).catch(ex => {
      console.log('parsing failed', ex)
    });
  }

  export default Vue.extend({
    name: 'Search',
    props: ['Search'],
    data () {
      return {
        textfieldBook: '',
        disabled: true,
        selectedItem: {}
      };
    },
    methods: {
      addBook (newBook) {
        //button is now disabled
        this.disabled = true;
        //clears the field..
        this.textfieldBook = '';
        let book = this.selectedItem;
        if (newBook.hasOwnProperty('title')) {
          let book = newBook;
        }
        booksRef.push(book);
        this.$notify({
          title: 'Added',
          message: 'Successfuly added book!',
          type: 'success'
        });
      },
      showAddBook () {
        eventHub.$emit("open-add-book-modal", {});
      },
      querySearchAsync,
      createFilter (queryString) {
        return (link) => {
          return (link.title.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect (item) {
        this.selectedItem = item;
        this.disabled = false;
      }
    },
    created() {
      eventHub.$on('add-book', this.addBook)
    },

  });
</script>
