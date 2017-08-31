import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    menuFlag: false,
    activeMenu: {},
    playIndex: 0,
    menulist: [],
    playing: {},
    playFlag: false,
    songFlag: false,
    lyricData: {},
    lrcTop: 0,
    progressPercent: 0,
    highLightIndex: -1,
    progressPlayed: 0,
    // 选择种类
    cat: '全部',
    selectFlag: false,
    selectObject: null,
    // 搜索
    searchFlag: true,
    resultFlag: false,
    singerFlag: false,
    singerSongFlag: false,
    albums: {},
    album: {},
    albumFlag: false,
    activeAlbum: {},
    albumList: {}
  },
  mutations: {
    toggleMenuFlat (state) {
      if (state.menuFlag) {
        state.menuFlag = false
      } else {
        state.menuFlag = true
      }
    },
    changeActiveMenu (state, menu) {
      state.activeMenu = menu
    },
    changeMenuList (state, list) {
      state.menulist = list
    },
    setPlaying (state, obj) {
      state.playing = obj
    },
    togglePlay (state) {
      if (state.playFlag) {
        state.playFlag = false
      } else {
        state.playFlag = true
      }
    },
    resetPlay (state) {
      state.playFlag = false
    },
    toggleSong (state) {
      if (state.songFlag) {
        state.songFlag = false
      } else {
        state.songFlag = true
      }
    },
    setLyric (state, oLrc) {
      state.lyricData = oLrc
    },
    changeLrcTop (state, top) {
      state.lrcTop = top
    },
    setProgressPercent (state, per) {
      state.progressPercent = per
    },
    changeHighLight (state, index) {
      state.highLightIndex = index
    },
    resetHighLight (state) {
      state.highLightIndex = -1
    },
    setCat (state, cat) {
      state.cat = cat
    },
    toggleSelect (state) {
      if (state.selectFlag) {
        state.selectFlag = false
      } else {
        state.selectFlag = true
      }
    },
    setSelectObj (state, obj) {
      state.selectObject = obj
    },
    toggleSearchFlag (state) {
      if (state.searchFlag) {
        state.searchFlag = false
      } else {
        state.searchFlag = true
      }
    },
    toggleResult (state) {
      if (state.resultFlag) {
        state.resultFlag = false
      } else {
        state.resultFlag = true
      }
    },
    toggleSingerFlag (state) {
      if (state.singerFlag) {
        state.singerFlag = false
      } else {
        state.singerFlag = true
      }
    },
    toggleSSFlag (state) {
      if (state.singerSongFlag) {
        state.singerSongFlag = false
      } else {
        state.singerSongFlag = true
      }
    },
    setAlbums (state, albums) {
      state.albums = albums
    },
    setAlbum (state, album) {
      state.album = album
    },
    changeActiveAlbum (state, album) {
      state.activeAlbum = album
    },
    changeAlbumList (state, list) {
      state.albumList = list
    }
  }
})
export default store
