<template>
   <transition-group name='fade' appear v-on:enter='enter'>
		<div v-show='songFlag' class='song-wrapper' key='song'>
			<div class='song-title'>
				<i class='iconfont back' @click='toggleSong()'>&#xe67b;</i>
				<p id='song-name'>{{playSong.name}}<br/><span id='singer-name'>{{playSong.ar[0].name}}</span></p>
				<div class='share'>
					<i class='iconfont'>&#xe627;</i>
				</div>
			</div>
			<div id='lrcWrapper'>
				<div v-if='!lrcFlag' class='rotate' key='rotate'>
					<div class='rotate-img'>
						<img :class="{'cd-play':playFlag}" src='../../assets/img/stick_bg.png' style='height:140px'/>
					</div>
					<div class='rotate-album' :class="{'cd-rotate':playFlag}">
						<img :src="albumPic + '?param=500y500'" />
					</div>
				</div>
				<div v-else id='song-lrc'>
					<ul id='lrc-wrapper'>
						<li v-for='(obj,index) in lyricData' :index='index' :class="['lyric','l_'+obj.lyricTime,(highLightIndex==index)?'highLight':'']">
							{{obj.lyric}}
						</li>
					</ul>
				</div>
			</div>
			<div v-show='!lrcFlag' id='bottom'>
				<div id="menu">
					<i class='iconfont'>&#xe60d;</i>
					<i class='iconfont'>&#xe646;</i>
					<i class='iconfont'>&#xe6fc;</i>
					<i class='iconfont'>&#xe603;</i>
				</div>
			</div>
			<div id='song-bottom'>
				<div class="progress-wrap">
					<div class="time play">{{this.time.current}}</div>
					<div class="progress-bg" >
						<div class="progress-bar" ></div>
						<div class="progress-played"></div>
						
					</div>
					<div class="time total">{{this.time.total}}</div>
				</div>
				<div id='action'>
					<i class='iconfont'>&#xe639;</i>
					<i class='iconfont' @click="change('prev')">&#xe6d4;</i>
					<i v-if='!playFlag' class='iconfont' @click='togglePlay()'>&#xe61a;</i>
					<i v-else class='iconfont' @click='togglePlay()'>&#xe628;</i>
					<i class='iconfont' @click="change('next')">&#xe6d8;</i>
					<i class='iconfont'>&#xe610;</i>
				</div>
				<audio id='playMusic' :src='audioUrl' >
					抱歉，
				</audio>
			</div>
		</div>
		
	</transition-group>
</template>

<script>
import api from '../../api'
export default {
  data () {
    return {
      audioUrl: '',
      oAudio: {},
      time: {
        current: '00:00',
        total: '00:00'
      },
      lrcFlag: false,
      lyrics: {},
      lrcWrapper: null
    }
  },
  computed: {
    playSong () {
      return this.$store.state.playing
    },
    songFlag () {
      return this.$store.state.songFlag
    },
    playFlag () {
      return this.$store.state.playFlag
    },
    albumPic () {
      return this.$store.state.playing.al.picUrl
    },
    progressBar () {
      return document.getElementsByClassName('progress-bar')[0]
    },
    lyricData () {
      return this.$store.state.lyricData
    },
    lrcTop () {
      return this.$store.state.lrcTop
    },
    getLrcWrapper () {
      if (this.lrcWrapper === null) {
        this.lrcWrapper = document.getElementById('lrcWrapper')
      }
      return this.lrcWrapper
    },
    highLightIndex () {
      return this.$store.state.highLightIndex
    },
    progressPlayed () {
      return document.getElementsByClassName('progress-played')[0]
    }
  },
  methods: {
    toggleSong () {
      this.$store.commit('toggleSong')
    },
    togglePlay () {
      this.$store.commit('togglePlay')
      if (this.$store.state.playFlag) {
        this.oAudio.play()
      } else {
        this.oAudio.pause()
      }
    },
    formatTime (time) {
      var m = Math.floor(time / 60).toString()
      var s = Math.round(time % 60).toString()
      m = (m.length === 1) ? '0' + m : m
      s = (s.length === 1) ? '0' + s : s
      return m + ':' + s
    },
    getAudio () {
      this.oAudio = document.getElementById('playMusic')
    },
    enter () {
      this.getAudio()
      this.time.total = this.formatTime(parseFloat(this.oAudio.duration))
      this.progressPlayed.style.width = this.$store.state.progressPlayed + 'px'
      this.progressBar.style.left = this.$store.state.progressBar + 'px'
      var that = this
      this.oAudio.addEventListener('timeupdate', function () {
        var curTime = this.currentTime
        that.time.current = that.formatTime(parseInt(curTime))
        // 更新进度条
        var percent = parseFloat(curTime).toFixed(2) / parseFloat(that.oAudio.duration).toFixed(2)
        that.progressBar.style.left = percent * 100 + '%'
        var widthPlayed = document.getElementsByClassName('progress-bg')[0].clientWidth * percent
        that.progressPlayed.style.width = widthPlayed + 'px'
        // 歌词滚动
        var obj = document.getElementsByClassName('l_' + parseInt(curTime))
        if (obj.length > 0) {
          var setTop = that.lrcTop - obj[0].getAttribute('index') * 40
          console.log('top', setTop)
          that.lyrics.style.top = setTop + 'px'
          that.$store.commit('changeHighLight', obj[0].getAttribute('index'))
        }
      })
      //是否显示歌词
      that.getLrcWrapper.onclick = function () {
        if (that.lrcFlag) {
          that.lrcFlag = false
        } else {
          that.lrcFlag = true
          setTimeout(function () {
            that.lyrics = document.getElementById('lrc-wrapper')
            console.log(document.getElementById('lrc-wrapper'))
          }, 1000)
        }
      }
      // 进度条监听
      document.getElementsByClassName('progress-bg')[0].onmousedown = function (e) {
        var curX = e.clientX || e.pageX
        var width = this.clientWidth
        var left = this.offsetLeft
        that.progressBar.style.left = curX - left - 6 + 'px'
        that.oAudio.currentTime = that.oAudio.duration * ((curX - left) / width)
        that.progressPlayed.style.width = curX - left + 'px'
        that.$store.commit('setProgressPlayed', curX - left)
      }
    },
    //切换歌曲
    change (direction) {
      var menu = this.$store.state.menulist
      var playIndex
      if (direction === 'prev') {
        playIndex = parseInt(this.$store.state.playIndex) - 1
      } else {
        playIndex = parseInt(this.$store.state.playIndex) + 1
      }
      if (playIndex > 0 && playIndex < menu.length - 1) {
        this.$store.state.playing = menu[playIndex]
        this.$store.state.playIndex = playIndex
        this.$store.commit('resetPlay')
        this.progressBar.style.left = 0 + 'px'
        this.progressPlayed.style.width = 0
        this.$http.get(api.getSong(this.playSong.id)).then(
          (res) => {
            console.log(res.data)
            if (!res.data.data) {
              console.log('歌曲加载错误！')
            } else {
              this.oAudio.src = res.data.data[0].url
            }
          }
        )
        this.$http.get(api.getLrc(this.playSong.id)).then(
        (res) => {
          if (!res.data.lrc) {
            console.log('歌词加载错误!')
          } else {
            var lyric = res.data.lrc.lyric
            var lyricData = []
            lyric.split('\n').forEach(function (val, index) {
              var splitIndex, timeTemp, lyricTemp
              var lyricDataTemp = {}
              splitIndex = val.indexOf(']') + 1
              // 过滤无用行
              if (val.charAt(1).search(/\d/) === -1) {
                return
              }
              // 获取时间和对应的歌词
              timeTemp = val.substring(1, splitIndex - 1)
              lyricTemp = val.substring(splitIndex)
              var m = parseInt(timeTemp.substr(0, 2))
              var s = parseInt(timeTemp.substr(3, 2))
              timeTemp = m * 60 + s
              lyricDataTemp.lyricTime = timeTemp
              lyricDataTemp.lyric = lyricTemp
              lyricData.push(lyricDataTemp)
            })
            this.$store.commit('setLyric', lyricData)
            this.$store.commit('resetHighLight')
          }
        }
      )
      }
    }
  },
  mounted () {
    this.getAudio()
  }
}
</script>

<style lang='scss' scoped>
::-webkit-scrollbar{
	width:0;
	height:0;
	
}
.song-wrapper{
	height:100%;
	width:100%;
	position:absolute;
	top:0;
	left:0;
	background: -webkit-linear-gradient(rgb(66, 64, 39) 5%, #8a817c 76%, #e2a3b2 90%);
	z-index:1000;
	&.fade-enter-active, &.fade-leave-active{
		transition: all 0.6s linear;
      transform: translate3d(0, 0, 0)
	}
      
    &.fade-enter, &.fade-leave-active{
    	opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
      
	.song-title{
		position:relative;
		width:100%;
		z-index:200;
		display:flex;
		color:#fff;
		
		font-size:19px;
		padding:5px 15px;
		border-bottom:1px solid grey;
		.back{
			flex-basis:50px;
			font-size:25px;
			line-height:50px;
		}
		#song-name{
			flex:1;
			padding-top:5px;
			line-height:20px;
			font-size:18px;
			text-align:left;
			#singer-name{
				font-size:14px;
				color:#bfbdbd;
			}
		}
		.share{
			flex-basis:50px;
			text-align:right;
			line-height:50px;
			
		}
		i{
			font-size:25px;
			
		}
		
	}
	#lrcWrapper{
		width:100%;
	}
	.rotate{
		.rotate-img{
			position:relative;
			width:94px;
			margin:0 auto;
			z-index:200;
			left:25px;
			img{
				width:100%;
			  transition:all 0.3s;
	          transform-origin: left top;
	          -webkit-transform: rotate(-20deg);
	          -moz-transform: rotate(-20deg);
	          -ms-transform: rotate(-20deg);
	          transform: rotate(-20deg);
			}
			.cd-play{
				-webkit-transform: rotate(0deg);
	            -moz-transform: rotate(0deg);
	            -ms-transform: rotate(0deg);
	            transform: rotate(0deg);
			}
		}
		.rotate-album{
			position:relative;
			width:290px;
			height:290px;
			margin:-60px auto 0;
			background:url(../../assets/img/cd_wrapper.png) no-repeat;
			background-size:290px 290px;
			background-position:center;
			z-index:160px;
			img{
				display:block;
				position:absolute;
				width:195px;
				height:195px;
				left:50%;
				top:50%;
				margin-top:-97px;
				margin-left:-97px;
				border-radius:100%;
				
			}
			@-webkit-keyframes rotating{
		    0% {
		      -webkit-transform:rotate(0deg)
		    }
		    100% {
		      -webkit-transform:rotate(360deg)
		    }
		   }
		  @keyframes rotating {
		    0% {
		      transform: rotate(0deg)
		    }
		    100% {
		      transform: rotate(360deg)
		    }
		  }
			&.cd-rotate{
				-webkit-animation: rotating 10s  linear .3s infinite;
    			animation: rotating 10s linear .3s infinite;
			}
    
		}
		
	}
	#song-lrc{
		box-sizing:border-box;
		height:70vh;
		width:100%;
		position:relative;
		overflow:scroll;
		#lrc-wrapper{
			width:100%;
			height:100%;
			transition:all 1s ease;
			box-sizing:border-box;
			position:absolute;
			padding-bottom:170px;
			top:40%;
			left:0;
			.lyric{
				text-align:center;
				color:rgba(255, 255, 255, 0.64);
				font-size:16px;
				line-height:40px;
				margin-top:0;
			}
			.highLight{
				color:#fff !important;
			}
		}
	}
	#bottom{
		width:100%;
		margin-top:60px;
		#menu{
			display:flex;
			margin:0 30px 0 40px;
			i{
				flex:1;
				text-align:center;
				font-size:24px;
				color:#fff;
				line-height:30px;
				&:nth-child(2){
					font-size:26px;
				}
				&:nth-child(4){
					font-size:22px;
				}
			}
		}
	}
	#song-bottom{
		width:100%;
		position:fixed;
		bottom:0;
		left:0;
	}
	.progress-wrap{
		margin: 1% 0;
		width:100%;
		display: flex;
		align-items: center;
		
	}
	.time{
			flex-basis: 40px;
			text-align:center;
			color:#fff;
	}
	.progress-bg{
		position: relative;
		height: 4px;
		background-color: rgba(255,255,255,0.35);
		flex: 8;
		
	}
	.progress-bar{
				position: absolute;
				width: 12px;
				height: 12px;
				border-radius: 50%;
				background-color: #fff;
				left: 0;
				top:50%;
				margin-top: -6px;
	}
	.progress-played{
		width:0;
		height:4px;
		background:#fff;
		
	}
	#action{
		display:flex;
		padding:20px 5%;
		padding-top:10px;
		i{
			box-sizing:border-box;
			flex:1;
			text-align:center;
			font-size:24px;
			color:#fff;
			line-height:50px;
			&:nth-child(3){
				font-size:36px;
			}
			
		}
	}
}
</style>