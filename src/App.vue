<template>
  <div id="app">
    <router-view></router-view>
    <music-menu ></music-menu>
    <play-song ></play-song>
    <selector></selector>
    <search></search>
    <singer></singer>
    <album></album>
    <singer-song></singer-song>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import playSong from './components/index/playSong'
import footerNav from './components/index/footer'
import musicMenu from './pages/categories/commend/musicmenu'
import selector from './pages/categories/gedan/select'
import search from './pages/search/search'
import singer from './pages/search/singer'
import album from './pages/search/album'
import singerSong from './pages/search/singerSong'
export default {
  name: 'app',
  components: {
    footerNav,
    musicMenu,
    playSong,
    selector,
    search,
    singer,
    singerSong,
    album
  }
}
</script>

<style>
::-webkit-scrollbar{
	width:0;
	height:0;
}
#app {
  
}
</style>
