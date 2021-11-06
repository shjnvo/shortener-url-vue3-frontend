<template>
  <div class="container">
    <header class="jumbotron text-center">
      <h3>URL Shortener</h3>
    </header>

    <div class="col-md-12">
      <div class="form-inline">
        <div class="form-group col-md-8 mb-2 pl-0">
          <input v-model="url" type="text" class="form-control col-md-12" id="inputPassword2" placeholder="URL https://example.com">
        </div>
        <button class="btn btn-primary mb-2 col-md-4" @click.prevent="createShortUrl">Create Short URL</button>
      </div>
      <div
        v-if="shortUrl"
        class="alert alert-success"
      >
        <span>Short URL : </span>
        {{shortUrl}}
      </div>
      <div
        v-if="message"
        class="alert alert-danger"
      >
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      shortUrl: null,
      url: null,
      message: null,
    };
  },
  methods: {
    createShortUrl() {
      this.message = null;

      let params = {url: this.url}
      this.$store.dispatch("shortlink/create", params).then(
        response => {
          this.shortUrl = response.data.link
        }, 
        error => { 
          let errorMsg = error.response.data.message
          this.message = Array.isArray(errorMsg) ? errorMsg[0] : errorMsg
      });
    }
  },
};
</script>
