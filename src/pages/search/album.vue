<template>
		<div  class='al-wrapper' :style="{'overflow':showSong?'hidden':'scroll'}" key='album'>
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
</template>

<script>
import api from '../../api'
import {changePlaying} from '../../mixin/changePlaying.js'
export default {
  data () {
    return {
    }
  },
  // 使用mixin将重用的部分抽取出来共用，减少代码
  mixins: [changePlaying],
  // 当数据加载完再进入路由，即显示页面
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$http.get(api.getAlbum(to.params.id)).then(
        (res) => {
          vm.$store.commit('changeAlbumList', res.data.songs)
        }
      )
    })
  },
  computed: {
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
    showSong () {
      return this.$store.state.songFlag
    }
  },
  methods: {
    hideAlbum () {
      this.$router.go(-1)
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