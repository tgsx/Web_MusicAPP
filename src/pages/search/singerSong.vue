<template>
		<div  class='ss-wrapper'  key='musicmenu'>
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
</template>

<script>
import api from '../../api'
import {changePlaying} from '../../mixin/changePlaying.js'
export default {
  data () {
    return {
      activeIndex: 0
    }
  },
  // 使用mixin将重用的部分抽取出来共用，减少代码
  mixins: [changePlaying],
  // 当数据加载完再进入路由，即显示页面
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$http.get(api.getAlbums(to.params.id)).then(
      (res) => {
        vm.$store.commit('setAlbums', res.data.hotAlbums)
        console.log('ss', res.data.hotAlbums)
        vm.$http.get(api.getAlbum(vm.$store.state.albums[0].id)).then(
          (res) => {
            console.log('ss', res.data)
            vm.$store.commit('setAlbum', res.data)
          }
        )
      })
    })
  },
  computed: {
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
      this.$router.go(-1)
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
      this.$router.push({name: 'album', params: {id: item.id}})
      this.$store.commit('changeActiveAlbum', item)
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