<template>
	<transition-group name='fade' appear>
		<div v-show='singerSongFlag' class='ss-wrapper'  key='musicmenu'>
			<div class='ss-title'>
				<i class='iconfont back' @click='hide()'>&#xe67b;</i>
				<span class='title-name'>{{album.songs[0].ar[0].name}}</span>
				<div class='set'>
					
				</div>
			</div>
			<div class='ss-content'>
				<div clsss='cover'>
					<img :src='album.album.picUrl' alt='' width='100%' height='400px;'/>
				</div>
				<div class='menu-list'>
					<div id='ss-cat'>
						<div id='ss-nav'>
							<div id='ss-wrapper'>
								<div :class="{'active':activeIndex==0?true:false}" @click='focus(0)'>
									<span>热门</span>
								</div>
								<div :class="{'active':activeIndex==1?true:false}" @click='focus(1)'>
									<span>专辑</span>
								</div>
								<div :class="{'active':activeIndex==2?true:false}" @click='focus(2)'>
									<span>MV</span>
								</div>
								<div :class="{'active':activeIndex==3?true:false}" @click='focus(3)'>
									<span>歌手信息</span>
								</div>
								
							</div>
						</div>
						<div id='con-wrapper'>
							<div id='contents'>
								<div id='singer-songs'>
									<ul class='list-ul'>
										<li v-for='(item,index) in album.songs' @click='changePlaying(item,index)'>
											<span class='song-id'>{{index+1}}</span>
											<div class='song-wrapper'>
												<p class='song-name'>{{item.name}}<br/><span>{{item.ar[0].name}} - {{item.al.name}}</span></p>
												<i class='iconfont song-set'>&#xe603;</i>
											</div>
										</li>
									</ul>
								</div>
								<div id='singer-albums'>
									<ul>
										<li v-for='item in albums' @click="showAlbum(item)">
											<div>
												<img :src='item.picUrl'/>
												<div class='desc'>
													<p>{{item.name}}</p>
													<span>歌曲{{item.size}}</span>
												</div>
											</div>
											<i class='iconfont'>&#xe603;</i>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					
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
      activeIndex: 0
    }
  },
  computed: {
    singerSongFlag () {
      return this.$store.state.singerSongFlag
    },
    albums () {
      return this.$store.state.albums
    },
    album () {
      return this.$store.state.album
    },
    oAudio () {
      return document.getElementById('playMusic')
    }
  },
  methods: {
    hide () {
      this.$store.commit('toggleSSFlag')
    },
    focus: function (index) {
      this.activeIndex = index
      this.$nextTick(function () {
        var content = document.getElementById('contents')
        var pageWidth = document.documentElement.clientWidth
        content.style.left = -index * parseInt(pageWidth) + 'px'
      })
    },
    showAlbum (item) {
      this.$store.state.albumFlag = true
      this.$store.commit('changeActiveAlbum', item)
      this.$http.get(api.getAlbum(item.id)).then(
        (res) => {
          this.$store.commit('changeAlbumList', res.data.songs)
        }
      )
    },
    changePlaying (item, index) {
      this.$store.commit('resetPlay')
      this.$store.commit('changeLrcTop', window.innerHeight * 0.4)
      this.$store.state.playIndex = index
      this.$http.get(api.getDetail(item.id)).then(
        (res) => {
          console.log(res.data)
          this.$store.commit('setPlaying', res.data.songs[0])
        }
      )
      // 获取歌曲url
      this.$http.get(api.getSong(item.id)).then(
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
      this.$http.get(api.getLrc(item.id)).then(
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
.ss-wrapper{
	width:100%;
	height:92vh;
	position:absolute;
	z-index:601;
	left:0;
	top:0;
	overflow:scroll;
    &.fade-enter-active, &.fade-leave-active{
      transition: all .5s linear;
      
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
      transform: translate3D(100%,0,0);
      
    }

	.ss-title{
		width:100%;
		position:fixed;
		top:0;
		z-index:110;
		background:transparent;
		display:flex;
		color:#fff;
		line-height:10vh;
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
.cover{
	padding-top:10vh;
	height:254px;
	width:100%;
	background:red;
}
.menu-list{
	
	background:#fff;
	#ss-nav{
	height:36px;
	line-height:36px;
	background:#fff;
	overflow:scroll;
	#ss-wrapper{
		width:100%;
	}
	& div{
		width:25%;
		float:left;
		text-align:center;
		box-sizing:border-box;
		transition:all .5s ease;
		span{
			font-size:14px;
		}
	}
	.active{
		border-bottom:1.8px solid red;
	}
	}
	#con-wrapper{
		position:relative;
		height:83vh;
		overflow:hidden;
		#contents{
			position:absolute;
			width:400%;
			left:0;
			transition:all 1s ease;
			height:100%;
			
			&>div{
				float:left;
				width:25%;
				color:#fff;
				height:100%;
				overflow:scroll;
				padding-bottom:60px;
				li{
					padding:10px 0;
					display:flex;
					padding-left:10px;
					margin-top:0;
					color:#000;
					font-size:16px;
					
					
					
					div{
						
						flex:1;
						overflow:hidden;
						
						
						p{
							margin:0;
							padding:0;
							line-height:20px;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space: nowrap ;
						}
						img{
							width:40px;
							height:40px;
						}
						span{
							font-size:14px;
							color:#808388;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space: nowrap ;
							
						}
					}
					i{
						flex-basis: 40px;
						text-align:center;
						line-height:40px;
					}
				}
			
			}
			
			
		}
	}
	#singer-songs{
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
	#singer-albums{
		li>div{
			display:flex;
			img{
				flex-basis:44px;
			}
			.desc{
				flex-direction:column;
				padding-left:10px;
				display:flex;
				overflow:hidden;
				flex:1;
				p{
					display:inline-block;
					flex:1;
					line-height:20px !important;
					height:20px;
					width:100%;
					padding-left:0;
				
				}
			}
		}
	}
}
</style>