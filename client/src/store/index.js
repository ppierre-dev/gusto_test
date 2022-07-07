import { createStore } from 'vuex'

export default createStore({
  state: {
    file: null,
    uploadProgress: 0,
  },
  getters: {
    getFile(state) {
      return state.file;
    },
    getUploadProgress(state) {
      return state.uploadProgress;
    }
  },
  mutations: {
    setFile(state, file) {
      state.file = file;
    },
    setUploadProgress(state, uploadProgress) {
      state.uploadProgress = uploadProgress;
    }
  },
  actions: {
    setFile(context, file) {
      context.commit("setFile", file);
    },
    setUploadProgress(context, uploadProgress) {
      context.commit("setUploadProgress", uploadProgress);
    }
  },
})
