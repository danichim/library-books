<template>
  <div class="main-container">
    <h3 class="text-center">Resources</h3>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="nr"
        label="Nr"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="techs"
        label="Techs">
      </el-table-column>
      <el-table-column
        prop="web"
        label="Webpage">
      </el-table-column>
      <el-table-column
        prop="username"
        label="Username / Email">
      </el-table-column>
    </el-table>
    <br/>
    <div class="text-center">
      <h3>Info for <a href="https://red.assist.ro/projects/assist/wiki/Tutoriale" target="_blank">passwords</a>.</h3>
    </div>

  </div>
</template>


<script>
  import Vue from 'vue';
  import Vuex from 'vuex';

  export default Vue.extend({
    data() {
      return {
        tableData: [{
          nr: '1',
          name: 'Egghead',
          techs: 'Angular.js, Node, Javascript, D3',
          web: 'http://www.egghead.io/',
          username: 'contact-us@assist.ro',
          info: 'https://red.assist.ro/projects/assist/wiki/Tutoriale'
        }, {
          nr: '2',
          name: 'Egghead',
          techs: '(Sass, Express.js, CoffeeScript, Frontend, iOS, Ruby)',
          web: 'http://www.codeschool.com/',
          username: 'assistsoftware',
          info: 'https://red.assist.ro/projects/assist/wiki/Tutoriale'
        }, {
          nr: '3',
          name: 'Udemy',
          techs: 'Umbraco, Java Spring, Software Testing, iOS7 Course',
          web: 'http://www.udemy.com/',
          username: 'contact-us@assist.ro',
          info: 'https://red.assist.ro/projects/assist/wiki/Tutoriale'
        }, {
          nr: '4',
          name: 'Linux Academy',
          techs: 'Linux, AWS',
          web: 'http://www.linuxacademy.com/',
          username: 'contact-us@assist.ro',
          info: 'https://red.assist.ro/projects/assist/wiki/Tutoriale'
        }, {
          nr: '5',
          name: 'Packtpub',
          techs: 'ALL eBooks',
          web: 'https://www.packtpub.com',
          username: 'contact-us@assist.ro',
          info: 'https://red.assist.ro/projects/assist/wiki/Tutoriale'
        }, {
          nr: '6',
          name: 'Packtpub',
          techs: 'iOS eBook',
          web: 'https://www.packtpub.com',
          username: 'alexandru.boca@assist.ro',
          info: 'https://red.assist.ro/projects/assist/wiki/Tutoriale'
        }]
      }
    }
  });

</script>


<style>

</style>
