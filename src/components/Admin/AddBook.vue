<template>
  <el-dialog
    title="Add new book"
    :visible.sync="dialogFormVisible"
    width="30%">
    <el-form :model="form" status-icon :rules="rules" ref="form" size="small">
      <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" auto-complete="off" @blur="validateForm"></el-input>
      </el-form-item>
      <el-form-item label="Author" :label-width="formLabelWidth">
        <el-input v-model="form.authors[0]" auto-complete="on" @blur="validateForm"></el-input>
      </el-form-item>
      <el-form-item label="Publisher" :label-width="formLabelWidth">
        <el-input v-model="form.publisher" auto-complete="on" @blur="validateForm"></el-input>
      </el-form-item>
      <el-form-item label="Pages" :label-width="formLabelWidth" prop="pageCount">
      <el-input-number
        :step="1"
        :min="1"
        :max="100000"
        v-model="form.pageCount"
        :maxlength="6"></el-input-number>
      </el-form-item>
      <el-form-item label="Image URL" :label-width="formLabelWidth">
        <el-input v-model="form.image.thumbnail" auto-complete="off" @blur="validateForm"></el-input>
      </el-form-item>
      <el-form-item label="ISBN" :label-width="formLabelWidth">
        <el-input v-model="form.ISBN" auto-complete="off" @blur="validateForm"></el-input>
      </el-form-item>
      <el-form-item label="Description" :label-width="formLabelWidth">
        <el-input v-model="form.description" auto-complete="off" @blur="validateForm"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="addBook" :disabled="!isValid">Add</el-button>
    </span>
  </el-dialog>
</template>

<script>
import eventHub from '../../EventHub'

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: '',
        authors: [''],
        publisher: '',
        pageCount: 0,
        image: {
          thumbnail: ''
        },
        ISBN: '',
        description: ''
      },
      defaults: {
        value: '',
        googleId: '',
        title: '',
        subtitle: '',
        description: '',
        image: {
          smallThumbnail: '',
          thumbnail: ''
        },
        pageCount: 0,
        categories: ['Computers'],
        publisherDate: '',
        printType: '',
        publisher: '',
        authors: [''],
        preview: '',
        ratingsCount: '',
        averageRating: '',
        maturityRating: '',
        mainCategory: 'Computers',
        language: 'English',
        ISBN: '',
        borrow: false
      },
      rules: {
        title: [
          { required: true, message: 'Please set the title', trigger: 'blur' },
          { min: 3, max: 252, message: 'Length should be 3 to 5', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px',
      isValid: false
    }
  },
  methods: {
    validateForm: function() {
      this.$refs['form'].validate(valid => {
        this.isValid = valid
      })
    },
    addBook: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let newBook = { ...this.defaults, ...this.form }
          newBook.value = newBook.title
          eventHub.$emit('add-book', newBook)
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    }
  },
  created() {
    eventHub.$on('open-add-book-modal', () => {
      this.dialogFormVisible = true
    })
  }
}
</script>
