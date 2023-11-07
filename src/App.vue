<template>

  <div class="container">
    <p class="fs-1 text-center mt-3 ">Crud Application For Notes</p>
    <div class="search-container d-flex">
      <input
        type="search"
        class="form-control w-50 mt-5 mb-4 m-1"
        id="search"
        placeholder="Search.."
        v-model="params.search_query"
      />

      <select class="form-control w-50 mt-5 mb-4" aria-label="Default select example" v-model="params.sort_by">
        <option value="asc">Asc</option>
        <option value="desc">desc</option>
      </select>
    </div>

    <ModalComponent v-if="showModal" @closeModal="closeModal">
      <template v-slot:header>
        <h1 class="text-center" v-if="isEdit">Edit Notes</h1>
        <h1 v-else>Add Notes</h1>
      </template>

      <!-- this is to display the product -->
      <template v-slot:body>
        <AddNoteComponent
          @formSubmitted="formSubmitted"
          :isEdit="isEdit"
          :editingProducts="editingProducts"
        />
      </template>
    </ModalComponent>

    <button @click="popUpModal" class="btn btn-primary text-center mt-3">Add</button>

    <!-- Button trigger modal -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">S.N</th>
          <th scope="col">Content</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.content }}</td>
          <td>
            <button class="btn btn-success m-1" @click="editForm(item)">Edit</button>
            <button class="btn btn-danger m-1" @click="deleteItem(item)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { deleteNote, getNotes } from './services/note'
import ModalComponent from './components/ModalComponent.vue'
import AddNoteComponent from './components/AddNoteComponent.vue'

export default {
  data() {
    return {
      data: [],
      showModal: false,
      isEdit: false,
      editingProducts: {},
      search: '',
      pagination: {},

      params: {
        search_query: '',
        numberOfPages: '',
        user_id: '',
        sort_by: 'asc'
      }
    }
  },

  watch: {
    'params.search_query'() {
      if (this.params.search_query.length > 2 || this.params.search_query.length == 0)
        this.fetchData()
    },

    'params.numberOfPages'() {
      this.fetchData()
    },

    'params.sort_by'() {
      this.fetchData()
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData(url = '') {
      try {
        this.params.user_id = this.user_id ?? ''
        const allNotes = await getNotes(this.params, url)
        let { data, ...paginationdata } = allNotes
        this.data = data
        this.pagination = paginationdata
      } catch (error) {
        console.log(error)
      }
    },

    editForm(item) {
      this.isEdit = true
      this.showModal = true
      this.editingProducts = item
    },

    deleteItem(item) {
      deleteNote(item.id)
      this.$toast.warning('deleted successFully')
      this.formSubmitted()
    },

    formSubmitted() {
      this.showModal = false
      this.isEdit = false
      this.fetchData()
    },

    popUpModal() {
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.fetchData()
    }
  },

  components: {
    ModalComponent,
    AddNoteComponent
  }
}
</script>
