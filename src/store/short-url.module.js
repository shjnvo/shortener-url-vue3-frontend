import ShortUrlService from '../services/short-url.service';

export const shortlink = {
  namespaced: true,
  state: {
    my_links: [],
  },
  actions: {
    getLinks({ commit }, page) {
      return ShortUrlService.getMyLinks(page).then(
        response => {
          commit('getLinksSuccess', response.data)
          return Promise.resolve(response.data);
        },
        error => {
          commit('getLinksFailure')
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    topLinks({ commit }, page) {
      return ShortUrlService.getTopLinks(page).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    create({ commit }, params) {
      return ShortUrlService.createShortLink(params).then(
        data => {
          return Promise.resolve(data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    update({ commit }, link) {
      return ShortUrlService.updateShortLink(link.id, { url: link.url }).then(
        data => {
          return Promise.resolve(data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    delete({ commit }, id) {
      return ShortUrlService.deleteShortLink(id).then(
        data => {
          return Promise.resolve(data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
  },
  mutations: {
    getLinksSuccess(state, links) {
      state.my_links = links.data;
    },
    getLinksFailure(state) {
      state.my_links = [];
    },
  }
};