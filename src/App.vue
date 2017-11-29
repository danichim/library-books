<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>


<script>
  import Navigation from './components/Navigation'
  import PageFooter from './components/PageFooter.vue'

  export default {
    components: { Navigation, PageFooter }
  }
</script>

<style>
  body {
    margin: 0px;
    height: 100%;
  }
  #app {
    min-height: 700px;
  }
  .hidden {
    /*display: none;*/
  }
  .text-center {
    text-align: center;
  }
  .container,
  .page-container {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto
  }

  .page-container {
    padding-top: 55px
  }

  .page-container h2 {
    font-size: 28px;
    color: #1f2d3d;
    margin: 0
  }

  .page-container h3 {
    font-size: 22px
  }

  .page-container h2,
  .page-container h3,
  .page-container h4,
  .page-container h5 {
    font-weight: 400;
    color: #1f2f3d
  }

  .page-container h2 a,
  .page-container h3 a,
  .page-container h4 a,
  .page-container h5 a {
    float: left;
    margin-left: -20px;
    opacity: 0;
    cursor: pointer
  }

  .page-container h2 a:hover,
  .page-container h2:hover a,
  .page-container h3 a:hover,
  .page-container h3:hover a,
  .page-container h4 a:hover,
  .page-container h4:hover a,
  .page-container h5 a:hover,
  .page-container h5:hover a {
    opacity: .4
  }

  .page-container p {
    font-size: 14px;
    color: #5e6d82
  }
  .main-container {
    margin-top: -80px;
    padding: 80px 15px 150px;
    box-sizing: border-box;
    min-height: 920px;
  }
</style>
