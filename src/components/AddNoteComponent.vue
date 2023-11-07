<template>
    <form @submit.prevent="submitForm" class="w-100">
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <input type="text" class="form-control" id="content" v-model="formData.content" />
      </div>
  
      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>
  </template>
  <script>
  import { createNote,editNotes } from '../services/note'
  
  export default {
    data() {
      return {
        formData: {
          content: ''
        }
      }
    },
  
    methods: {
      async submitForm() {
        if (this.isEdit) {
          await editNotes(this.editingProducts.id, this.formData)
          this.$toast.success('Edited Successfully');
        } else {
          await createNote(this.formData)
          this.$toast.info('Created Successfully');
        }
        this.$emit('formSubmitted')
      }
    },
  
    created() {
      this.formData.content = this.editingProducts.content ?? ''
    },
  
    props: {
      showModal: Boolean,
      editingProducts: Object,
      isEdit: Boolean
    },
  
    emits: ['formSubmitted'],
    
  }
  </script>
  