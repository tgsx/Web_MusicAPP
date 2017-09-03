import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/header'
import musicMenu from '../pages/categories/commend/musicmenu'
import selectStyle from '../pages/categories/gedan/select'
import search from '../pages/search/search'
import singerCat from '../pages/search/singer'
import singerSong from '../pages/search/singerSong'
import album from '../pages/search/album'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/musicMenu/:id',
      name: 'musicMenu',
      component: musicMenu
    },
    {
      path: '/selectStyle',
      name: 'selectStyle',
      component: selectStyle
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/singerCat',
      name: 'singerCat',
      component: singerCat
    },
    {
      path: '/singerSong/:id',
      name: 'singerSong',
      component: singerSong
    },
    {
      path: '/album/:id',
      name: 'album',
      component: album
    }
  ]
})
