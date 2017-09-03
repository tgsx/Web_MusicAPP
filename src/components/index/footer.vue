<template>
	<div id='footer' @click='showSong()'>
		<img :src='playSong.al.picUrl' alt=''/>
		<p>{{playSong.name}}<br/><span>{{playSong.ar[0].name}}</span></p>
		
		<i v-if='!playFlag' id='play' class='iconfont' @click='togglePlay()'>&#xe61a;</i>
		<i v-else class='iconfont' id='play' @click='togglePlay()'>&#xe628;</i>
		<i class='iconfont'>&#xe610;</i>
	</div>
</template>

<script>
export default {
  computed: {
    playSong () {
      return this.$store.state.playing
    },
    picUrl () {
      return this.$store.state.picUrl
    },
    playFlag () {
      return this.$store.state.playFlag
    },
    oAudio () {
      return document.getElementById('playMusic')
    },
    playIcon () {
      return document.getElementById('play')
    }
  },
  methods: {
    togglePlay () {
      this.$store.commit('togglePlay')
      if (this.$store.state.playFlag) {
        this.oAudio.play()
      } else {
        this.oAudio.pause()
      }
      // this.$store.commit('toggleSong')
    },
    showSong (event) {
      var e = event || window.event
      if (e.target !== this.playIcon) {
        this.$store.state.songFlag = true
      }
    }
  }
}
</script>

<style lang='scss' scope>
#footer{
	position:fixed;
	bottom:0;
	display:flex;
	background:#fff;
	width:100%;
	padding:0 1%;
	z-index:900;
	border:1px solid rgba(150, 74, 74, 0.22);
	img{
		flex-basis:36px;
		width:36px;
		height:36px;
		margin-top:6px;
		margin-left:2px;
	}
	p{
		flex:1;
		line-height:18px;
		padding-top:5px;
		margin-left:10px;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-overflow:ellipsis;
		overflow:hidden;
	}
	i{
		flex-basis:40px;
		text-align:center;
		font-size:26px;
		line-height:50px;
	}
}
</style>