<template lang="html">
  <el-dialog :title="currentBook.title" v-model="dialogVisible" size="small">
    <el-row :gutter="20">
      <el-col :span="8" class="details-left">
        <img :src="currentBook.image.thumbnail" class="image text-center">
        <ul>
          <li>Author: {{currentBook.authors.length > 1 ? currentBook.authors.join(", ")  : currentBook.authors[0]}}</li>
          <li v-show="currentBook.publisher">Editura: {{currentBook.publisher}}</li>
          <li v-show="currentBook.categories">Categorii: {{ currentBook.categories.length > 1 ? currentBook.categories.join(", ")  : currentBook.categories[0] }}</li>

          <li>Pagini: {{currentBook.pageCount}}</li>
        </ul>
      </el-col>
      <el-col :span="16">
        <span>{{currentBook.description }}</span>
      </el-col>
    </el-row>

    <borrow :bookKey="currentBook['.key']"></borrow>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">Done</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Vue from 'vue';
  import eventHub from '../EventHub';
  import { database } from '../firebaseInstance'
  import Borrow from './Borrow'

  const booksRef = database.ref('books');

  export default Vue.extend({
    data() {
      return {
        currentBook: {
          authors: [],
          title: "",
          description: "",
          categories: "",
          publisher: "",
          image: {
            thumbnail: ""
          }
        },
        dialogVisible: false,
      };
    },
    methods: {
      details (currentBook) {
        this.currentBook = currentBook;
        this.dialogVisible = true;
      }
    },
    created() {
      eventHub.$on('open-modal', this.details)
    },
    components: { Borrow }
  });
</script>

<style lang="css">
.details-left img {
  width: 100%;
}
</style>
