<template>
  <div class="container">
    <header class="jumbotron text-center">
      <h3>
         Top 100 Links Accessed
      </h3>
    </header>
    <table v-if="listLinks.length > 0" class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Order</th>
          <th scope="col">Short URL</th>
          <th scope="col">URL</th>
          <th scope="col">Clicked Count</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(link, index) in listLinks" :key="link">
          <th scope="row">{{index + 1 + ((currentPage - 1) * 10)}}</th>
          <td>http://localhost:3000/{{link.code}}</td>
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
export default {
  name: 'TopLinks',
  data() {
    return {
      listLinks: [],
      currentPage: 1,
      totalPages: 1,
      message: '',
      errorMsg: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.selectPage(this.currentPage)
  },
  methods: {
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
      this.$store.dispatch("shortlink/topLinks", this.currentPage).then(
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