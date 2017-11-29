<template>
  <div class="main-container">
    <h3 class="text-center">Browse Books</h3>
    <books></books>
  </div>
</template>


<script>
  import firebase from 'firebase';
  import { database } from '../../firebaseInstance';
  import Books from '../Books'

  export default {
    name: 'dashboard',
    data: () => {
      return {
        //data goes here
      }
    },
    components: { Books }
  };
</script>

