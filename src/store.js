import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	songInfo:null,
    isPlay:false,
    singerInfo:null
  },
  mutations: {
  	setSongInfo(state,songInfo){
  		state.songInfo=songInfo
  	},
    setIsPlay(state,isPlay){
      state.isPlay=isPlay
    },
    setSingerInfo(state,singerInfo){
      state.singerInfo=singerInfo
    },
  },
  getters:{
  	getSongInfo(state){
  		return state.songInfo;
  	},
    getIsPlay(state){
      return state.isPlay;
    },
    getSingerInfo(state){
      return state.singerInfo;
    }
  },
  actions: {

  }
})
