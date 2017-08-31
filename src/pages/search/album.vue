<template>
	<transition-group name='fade' appear>
		<div v-show='showFlag' class='al-wrapper' :style="{'overflow':showSong?'hidden':'scroll'}" key='album'>
			<div class='al-title'>
				<i class='iconfont back' @click='hideAlbum()'>&#xe67b;</i>
				<span class='title-name'>专辑</span>
				<div class='set'>
					<i class='iconfont'>&#xe603;</i>
				</div>
			</div>
			<div class='al-content'>
				<div class='profile-wrapper'>
					<div class='al-profile'>
						<div class='profile-cover'>
							<img :src='album.picUrl' alt="" width="100%"/>
						</div>
						<div class='profile-creator'>
							<p>{{album.name}}</p>
							<div class='creator-info'>
								<span id='nickname'>{{album.artist.name}}</span>
							</div>
						</div>
					</div>
					<div style='clear:both;'></div>
					<div class='al-info'>
						<ul class='info-list'>
							<li>
								<i class='iconfont'>&#xe601;</i>
								<p>14633</p>
							</li>
							<li>
								<i class='iconfont'>&#xe6fc;</i>
								<p>14633</p>
							</li>
							<li>
								<i class='iconfont'>&#xe627;</i>
								<p>14633</p>
							</li>
							<li>
								<i class='iconfont'>&#xe646;</i>
								<p>14633</p>
							</li>
						</ul>
					</div>
				</div>
				<div class='al-list'>
					<div class='list-title'>
						<i class='iconfont'>&#xe61a;</i>
						<p class='title'>播放全部<span>(共{{album.size}}首)</span></p>
						<i class='iconfont'>&#xe699;</i>
					</div>
					<ul class='list-ul'>
						<li v-for='(item,index) in musiclist' @click='changePlaying(item,index)'>
							<span class='song-id'>{{index+1}}</span>
							<div class='song-wrapper'>
								<p class='song-name'>{{item.name}}<br/><span>{{item.ar[0].name}}</span></p>
								<i class='iconfont song-set'>&#xe603;</i>
							</div>
						</li>
					</ul>
				</div>
				
			</div>
		</div>
	</transition-group>
</template>

<script>
import api from '../../api'
export default {
  data () {
    return {
    }
  },
  computed: {
    showFlag () {
      return this.$store.state.albumFlag
    },
    album () {
      return this.$store.state.activeAlbum
    },
    musiclist () {
      return this.$store.state.albumList
    },
    playSong () {
      console.log('ss', this.$store.state.playing)
      return this.$store.state.playing
    },
    oAudio () {
      return document.getElementById('playMusic')
    },
    showSong () {
      return this.$store.state.songFlag
    }
  },
  methods: {
    hideAlbum () {
      this.$store.state.albumFlag = false
    },
    changePlaying (item, index) {
      this.$store.commit('setPlaying', item)
      this.$store.commit('setPicUrl', item.al.picUrl)
      this.$store.commit('resetPlay')
      this.$store.commit('changeLrcTop', window.innerHeight * 0.4)
      this.$store.commit('resetProgressPlayed')
      this.$store.state.playIndex = index
      // 获取歌曲url
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
      // 获取歌词
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
          }
        }
      )
    }
  }
}
</script>

<style lang='scss' scoped>

.al-wrapper{
	width:100%;
	height:100%;
	position:absolute;
	z-index:602;
	left:0;
	top:0;
	background:white;
    &.fade-enter-active, &.fade-leave-active{
      transition: all .5s linear;
      
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
      transform: translate3D(100%,0,0);
      
    }

	.al-title{
		width:100%;
		position:fixed;
		top:0;
		z-index:110;
		background:-webkit-gradient(linear, left top, right bottom, from(rgba(226, 153, 17, 0.7)), to(rgba(200, 208, 123, 0.78)));
		display:flex;
		color:#fff;
		line-height:50px;
		font-size:19px;
		padding:0 15px;
		.back{
			flex-basis:40px;
			font-size:22px;
		}
		.title-name{
			flex:1;
			
			text-align:left;
		}
		.set{
			flex-basis:40px;
			text-align:right;
			}
			i{
				font-size:20px;
				
			
		}
	}
}
.profile-wrapper{
	padding-top:50px;
	height:254px;
	width:100%;
	background:-webkit-gradient(linear, left top, right bottom, from(#e29911), to(#c8d07b));
	.al-profile{
		padding:20px 5%;
		&>div{
			float:left;
			height:120px;
		}
		.profile-cover{
			width:35%;
		}
		.profile-creator{
			width:60%;
			margin-left:5%;
			color:#fff;
			&>p{
				font-size:18px;
				line-height:25px;
				margin-bottom:10px;
			}
			img{
				width:15%;
				border-radius:50%;
				vertical-align:middle;
				margin-right:3px;
			}
			
		}
		
	}
	.info-list{
		display:flex;
		li{
			flex:1;
			text-align:center;
			color:#fff;
			margin-top:8px;
			i{
				font-size:19px;
			}
		}
	}
}
.al-list{
	background:#fff;
	.list-title{
		font-size:16px;
		display:flex;
		line-height:40px;
		i{
			flex-basis:50px;
			text-align:center;
			font-size:20px;
		}
		.title{
			flex:1;
			span{
				color:grey;
				font-size:14px;
			}
		}
	}
	.list-ul{
		li{
			display:flex;
			font-size:14px;
			.song-id{
				flex-basis:50px;
				text-align:center;
				line-height:48px;
				color:grey;
			}
			.song-wrapper{
				flex:1;
				display:flex;
				border-bottom:.5px solid rgba(128, 128, 128, 0.28);
				.song-name{
					flex:1;
					color:#000;
					span{
						font-size:12px;
						color:grey;
					}
				}
				i{
					flex-basis:40px;
					text-align:center;
					line-height:48px;
				}
			}
			
		}
		
	}
}

</style>