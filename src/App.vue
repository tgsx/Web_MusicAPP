<template>
  <div id="app">
  	<transition name='fade' appear>
  		<router-view></router-view>
  	</transition>
    
    <play-song ></play-song>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import playSong from './components/index/playSong'
import footerNav from './components/index/footer'
export default {
  name: 'app',
  components: {
    footerNav,
    playSong
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
.fade-enter-active, .fade-leave-active{
    transition: all .5s linear;
	}
	.fade-enter, {
	  opacity: 0;
	  transform: translate3D(100%,0,0);
	}
	.fade-leave-to{
		opacity: 0;
	  transform: translate3D(-100%,0,0);
	}
</style>
