import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/';

class ShortUrlService {
  getMyLinks(page) {
    return axios.get(API_URL + `short_urls?page=${page}`, { headers: authHeader() });
  }

  createShortLink(params) {
    return axios.post(API_URL + 'short_urls', params, { headers: authHeader()});
  }

  updateShortLink(id, params) {
    return axios.patch(API_URL + `short_urls/${id}`, params, { headers: authHeader() });
  }

  deleteShortLink(id) {
    return axios.delete(API_URL + `short_urls/${id}`, { headers: authHeader() });
  }

  getTopLinks(page) {
    return axios.get(API_URL + `short_urls/top_100?page=${page}`, { headers: authHeader()});
  }
}

export default new ShortUrlService();
