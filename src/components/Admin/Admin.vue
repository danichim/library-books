<template>

  <div class="main-container">
    <el-row>
      <el-col :span="24">
        <div id="list">
          <h3 class="text-center">Admin View</h3>
          <el-row :gutter="20">
            <el-col :span="12" :offset="6"><search></search></el-col>
          </el-row>
          <books></books>
        </div>
        <add-book></add-book>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import Books from '../Books'
  import Search from './Search'
  import AddBook from './AddBook'

  export default {
    components: { Books, Search,  AddBook}
  };
</script>
