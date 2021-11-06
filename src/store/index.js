import { createStore } from "vuex";
import { auth } from "./auth.module";
import { shortlink } from "./short-url.module";

const store = createStore({
  modules: {
    auth,
    shortlink
  },
});

export default store;
