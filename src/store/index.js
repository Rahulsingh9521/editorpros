import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    showLinkMenu: false,
    showBubbleMenu: false,
    currentLink: "",
    drawIoImageChange: {
      dataUrl: "",
    },
  },
  mutations: {
    // Define synchronous methods to modify state
    toggleShowLinkMenu(state, payload) {
      state.showLinkMenu = payload;
    },
    toggleShowBubbleMenu(state, payload) {
      state.showBubbleMenu = payload;
    },
    toggleCurrentLink(state, payload) {
      state.currentLink = payload;
    },
    toggleDrawIoImageChange(state, payload) {
      state.drawIoImageChange = payload;
    },
  },
  actions: {},
  getters: {
    getShowLinkMenu(state) {
      return state.showLinkMenu;
    },
    getShowBubbleMenu(state) {
      return state.showBubbleMenu;
    },
    getCurrentLink(state) {
      return state.currentLink;
    },
    drawIoImageChange(state) {
      return state.drawIoImageChange.dataUrl;
    },
  },
});

export default store;
