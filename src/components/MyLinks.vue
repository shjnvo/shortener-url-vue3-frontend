<template>
  <div class="container">
    <header class="jumbotron text-center">
      <h3>My Links</h3>
    </header>
    <div v-if="!!message" class="alert alert-success">
      {{message}}
    </div>
    
    <table v-if="listLinks.length > 0" class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Short URL</th>
          <th scope="col">URL</th>
          <th scope="col">Clicked Count</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(link, index) in listLinks" :key="link">
          <th scope="row">http://localhost:3000/{{link.code}}</th>
          <td>{{link.url}}</td>
          <td>{{link.clicked_count}}</td>
          <td>
            <button type="button" @click="selectLink = link; indexLink = index" class="btn btn-primary" data-toggle="modal" data-target="#updateModal">
              Edit
            </button>
            <button type="button" @click="selectLink = link; indexLink = index" class="btn btn-danger ml-1" data-toggle="modal" data-target="#deleteModal">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning">
      Please create short URL!!!!
    </div>
    <div>
      <div class="modal fade" id="updateModal" ref="updateModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Update Url</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input v-model="selectLink.url" type="text" class="form-control col-md-12" id="inputPassword2" placeholder="URL https://example.com">
              <div v-if="!!errorMsg" class="alert alert-danger mt-2">
                {{errorMsg}}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="updateLink" class="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Url</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure delete this URL ?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="deleteLink" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav v-if="listLinks.length > 0" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" @click="previousPage(currentPage)" :class="{disabled: currentPage == 1}"><a class="page-link" href="javascript:void(0)" >Previous</a></li>
        <li v-for="n in totalPages" :key="n" @click="selectPage(n)" class="page-item" :class="{active: currentPage === n} "><a class="page-link" href="javascript:void(0)">{{n}}</a></li>
        <li class="page-item" @click="nextPage(currentPage)" :class="{disabled: currentPage == totalPages}"><a class="page-link" href="javascript:void(0)">Next</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'MyLinks',
  data() {
    return {
      selectLink: {},
      listLinks: [],
      indexLink: null,
      currentPage: 1,
      totalPages: 1,
      message: '',
      errorMsg: ''
    }
  },
  mounted() {
    this.selectPage(this.currentPage)
  },
  computed: {
    myLinks() {
      return this.$store.state.shortlink.my_links;
    }
  },
  methods: {
    updateLink() {
      this.errorMsg = ''
      this.$store.dispatch("shortlink/update", this.selectLink).then(
        response => {
          this.message = response.data.message
          $('#updateModal').modal('hide')
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    deleteLink() {
      this.$store.dispatch("shortlink/delete", this.selectLink.id).then(
        () => {
          this.listLinks.splice(this.indexLink, 1)
        },
        error => {
          this.message = error.response.message
        }
      )
    },
    nextPage(page){
      if (page + 1 > this.totalPages) {
        return
      }
      let currentPage = page + 1
      this.selectPage(currentPage)
    },
    previousPage(page){
      if (page - 1 <= 0) {
        return
      }
      let currentPage = page - 1
      this.selectPage(currentPage)
    },
    selectPage(page){
      this.currentPage = page
      this.$store.dispatch("shortlink/getLinks", this.currentPage).then(
        response => {
          this.listLinks = response.data
          this.totalPages = response.total_pages
        },
        error => {
          this.message = error.response.message
        }
      )
    },
  },
};
</script>