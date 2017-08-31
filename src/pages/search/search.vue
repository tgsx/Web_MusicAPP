<template>
	<transition-group name='fade' appear>
	<div @click='hideMatch' id='search' v-show='searchFlag' key='all'>
		<div id='title'>
			<i class='iconfont back' @click='hide()'>&#xe67b;</i>
			<input id='searching' v-model='searchQuery' @click='showMatch' @keyup='search' type='text' placeholder='搜索音乐、歌手、歌词、用户'></input>
			<ul id='matches' v-show='matchFlag'>
				<li @click='showDetail(obj.type,obj.name)' v-for='(obj,index) in matches'>{{obj.name}}</li>
			</ul>
		</div>
		<div id='content'>
			<transition-group name='fade' appear>
			<div v-if='resultFlag' id='result' key='result'>
				<div id='cat'>
					<div id='cat-nav'>
						<div id='nav-wrapper'>
							<div :class="{'active':activeIndex==0?true:false}" @click='focus(0)'>
								<span>单曲</span>
							</div>
							<div :class="{'active':activeIndex==1?true:false}" @click='focus(1)'>
								<span>歌手</span>
							</div>
							<div :class="{'active':activeIndex==2?true:false}" @click='focus(2)'>
								<span>专辑</span>
							</div>
							<div :class="{'active':activeIndex==3?true:false}" @click='focus(3)'>
								<span>歌单</span>
							</div>
							<div :class="{'active':activeIndex==4?true:false}" @click='focus(4)'>
								<span>MV</span>
							</div>
							<div :class="{'active':activeIndex==5?true:false}" @click='focus(5)'>
								<span>主播电台</span>
							</div>
						</div>
					</div>
					<div id='cat-wrapper'>
						<div id='cat-contents' >
							<div id='songs'>
								<ul>
									<li v-for='(item,index) in searchLists.songs' @click='changePlaying(item,index)'>
										<div>
											<p v-html='$options.filters.highlight(item.name,keys)'></p>
											<span v-html='$options.filters.highlight(item.artists[0].name,keys)'></span>&nbsp;-&nbsp;<span v-html='$options.filters.highlight(item.album.name,keys)'></span>
										</div>
										<i class='iconfont'>&#xe603;</i>
									</li>
								</ul>
							</div>
							<div id='artists'>
								<ul>
									<li v-for='item in searchLists.artists'@click='showSingerSong(item)'>
										<div>
											<img :src='item.img1v1Url'/>
											<p v-html='$options.filters.highlight(item.name,keys)'></p>
										</div>
										<i class='iconfont'>&#xe603;</i>
									</li>
								</ul>
							</div>
							<div id='albums'>
								<ul>
									<li v-for='item in searchLists.albums' @click='showAlbum(item)'>
										<div>
											<img :src='item.picUrl'/>
											<div class='desc'>
												<p v-html='$options.filters.highlight(item.name,keys)'></p>
												<span v-html='$options.filters.highlight(item.artists[0].name,keys)'></span>
											</div>
										</div>
										<i class='iconfont'>&#xe603;</i>
									</li>
								</ul>
							</div>
							<div id='playLists'>
								<ul>
									<li v-for='item in searchLists.playLists' @click='showMenu(item)'>
										<div>
											<img :src='item.coverImgUrl'/>
											<div class='desc'>
												<p v-html='$options.filters.highlight(item.name,keys)'></p>
												<span>{{item.trackCount}}首&nbsp;by&nbsp;{{item.creator.nickname}},&nbsp;播放{{item.playCount | cut}}次</span>
											</div>
											
										</div>
										<i class='iconfont'>&#xe603;</i>
									</li>
								</ul>
							</div>
							<div id='mvs'>
								<ul>
									<li v-for='item in searchLists.mvs'>
										<div>
											<p v-html='$options.filters.highlight(item.name,keys)'></p>
										</div>
										<i class='iconfont'>&#xe603;</i>
									</li>
								</ul>
							</div>
							<div id='jdRadios'>
								<ul>
									<li v-for='item in searchLists.jdRadios'>
										<div>
											<p v-html='$options.filters.highlight(item.name,keys)'></p>
										</div>
										<i class='iconfont'>&#xe603;</i>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else id='suggest' key='suggest'>
				<p id='singer' @click='showSinger'>
					<i class='iconfont'>&#xe648;</i>
					<span>歌手分类</span>
					<i class='iconfont'>&#xe658;</i>
				</p>
				<div id='hot'>
					<p id='hot-title'>热门搜索</p>
					<ul id='hot-tags'>
						<li>宋岳庭</li>
						<li>Careless Whisper</li>
						<li>尽头</li>
						<li>在人间</li>
						<li>Justin Bieber</li>
						<li>童话镇</li>
						<li>vava</li>
						<li>追光者</li>
						<li>毛不易</li>
						<li>taylor swift</li>
						
					</ul>
				</div>
			</div>
			</transition-group>
				
		
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
      matches: [],
      matchFlag: false,
      searchQuery: '',
      resultFlag: false,
      activeIndex: 0,
      searchLists: {},
      keys: ''
    }
  },
  computed: {
    searchFlag () {
      return this.$store.state.searchFlag
    },
    playSong () {
      console.log('ss', this.$store.state.playing)
      return this.$store.state.playing
    },
    oAudio () {
      return document.getElementById('playMusic')
    }
  },
  methods: {
    hide () {
      this.$store.commit('toggleSearchFlag')
      this.resultFlag = false
    },
    search (e) {
      this.matches = []
      this.matchFlag = true
      this.$http.get(api.singleMatch(this.searchQuery)).then(
        res => {
          var result = res.data.result
          for (var i in result) {
            for (var y in result[i]) {
              if (typeof result[i][y] === 'object') {
                result[i][y].type = i
                this.matches.push(result[i][y])
              }
            }
          }
        }
      )
    },
    hideMatch () {
      this.matchFlag = false
    },
    showMatch (e) {
      this.matchFlag = true
      e.stopPropagation()
    },
    showDetail (type, name) {
      this.keys = name
      this.searchQuery = name
      if (type === 'songs') {
        this.activeIndex = 0
      } else if (type === 'artists') {
        this.activeIndex = 1
      } else if (type === 'albums') {
        this.activeIndex = 2
      } else if (type === 'playLists') {
        this.activeIndex = 3
      } else if (type === 'mvs') {
        this.activeIndex = 4
      }
      console.log(this.activeIndex)
      // 根据关键词搜索各类结果
      this.$http.get(api.searchLists(name, 100)).then(
        res => {
          console.log(res.data)
          this.$set(this.searchLists, 'artists', res.data.result.artists)
        }
      )
      this.$http.get(api.searchLists(name, 1)).then(
        res => {
          console.log(res.data)
          this.$set(this.searchLists, 'songs', res.data.result.songs)
        }
      )
      this.$http.get(api.searchLists(name, 10)).then(
        res => {
          console.log(res.data)
          this.$set(this.searchLists, 'albums', res.data.result.albums)
        }
      )
      this.$http.get(api.searchLists(name, 1000)).then(
        res => {
          console.log(res.data)
          this.$set(this.searchLists, 'playLists', res.data.result.playlists)
        }
      )
      this.$http.get(api.searchLists(name, 1004)).then(
        res => {
          console.log(res.data)
          this.$set(this.searchLists, 'mvs', res.data.result.mvs)
        }
      )
      this.$http.get(api.searchLists(name, 1009)).then(
        res => {
          console.log(res.data)
          this.$set(this.searchLists, 'djRadios', res.data.result.djRadios)
        }
      )
      this.resultFlag = true
      this.focus(0)
    },
    focus: function (index) {
      this.activeIndex = index
      this.$nextTick(function () {
        var content = document.getElementById('cat-contents')
        var pageWidth = document.documentElement.clientWidth
        content.style.left = -index * parseInt(pageWidth) + 'px'
      })
    },
    showSinger () {
      this.$store.commit('toggleSingerFlag')
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
    },
    showSingerSong (item) {
      this.$http.get(api.getAlbums(item.id)).then(
        (res) => {
          this.$store.commit('setAlbums', res.data.hotAlbums)
          console.log(res.data.hotAlbums)
          this.$http.get(api.getAlbum(this.$store.state.albums[0].id)).then(
            (res) => {
              console.log(res.data)
              this.$store.commit('setAlbum', res.data)
              this.$store.commit('toggleSSFlag')
            }
          )
        }
      )
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
    showMenu (item) {
      this.$store.state.menuFlag = true
      this.$store.commit('changeActiveMenu', item)
      this.$http.get(api.getPlayListDetail(item.id)).then(
        (res) => {
          this.$store.commit('changeMenuList', res.data.playlist.tracks)
        }
      )
    }
  },
  mounted () {},
  filters: {
    highlight (val, keys) {
      if (val.indexOf(keys) !== -1) {
        return val.split(keys).join("<span style='color:rgba(23, 104, 208, 0.54)'>" + keys + '</span>')
      } else {
        return val
      }
    },
    unescape: function (html) {
      return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '\'')
      .replace(/&#39;/g, '\'')
    },
    cut (val) {
      if (val > 9999) {
        return val.toString().substring(0, 4) + '万'
      } else {
        return val
      }
    }
  }
}
</script>

<style lang='scss' scoped>

::-webkit-scrollbar{
	width:0;
	height:0;
}
input::-webkit-input-placeholder{ /*WebKit browsers*/
color: rgba(255,255,255,0.6);
}
input::-moz-input-placeholder{ /*Mozilla Firefox*/
color: red;
}
input::-ms-input-placeholder{ /*Internet Explorer*/ 
color: red;
}

#search{ 
	
	&.fade-enter-active, &.fade-leave-active{
      transition: all .5s linear;
      
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
      transform: translate3D(100%,0,0);
      
    }
    height:100%;
	width:100%;
	position:absolute;
	top:0;
	left:0;
	z-index:600;
	background:#f9f9f9;
	color:#4a4848;
	&>div{
		box-sizing:border-box;
	}
	#title{
		height:10vh;
		background:red;
		width:100%;
		position:fixed;
		top:0;
		display:flex;
		color:#fff;
		line-height:10vh;
		font-size:19px;
		padding:0 15px;
		z-index:1;
		.back{
			flex-basis:40px;
			font-size:24px;
		}
		.title-name{
			flex:1;
			
			text-align:left;
		}
		
		input{
			height: 68%;
		    width: 84%;
		    background: transparent;
		    border: none;
		    border-bottom: 1.5px solid #f3e4c8;
		    margin-top: 3%;
		    outline:none;
		    color:#fff;
		    font-size:16px;
		    letter-spacing: 3px;
		}
		#matches{
			width:78%;
			position:absolute;
			top:10vh;
			left:0;
			height:60vh;
			border:1px solid #c3c1c1;
			margin-left:15%;
			overflow:scroll;
			background:#fff;
			color:#000;
			padding-top:5px;
			li{
				height:40px;
				line-height:40px;
				padding-left:10px;
				color:rgb(146, 138, 138);
				border-bottom:1px solid #ece6e6;
				overflow:hidden;
				text-overflow:ellipsis; 
				font-size:14px;
			}
		}
		
	}

	#content{
		margin-top:10vh;
		#result,#suggest{
			&.fade-enter-active, &.fade-leave-active{
		      transition: all .5s linear;
		      
		    }
		    &.fade-enter, &.fade-leave-to{
		      opacity: 0;
		      transform: translate3D(100%,0,0);
		      
		    }
		}
		#singer{
			line-height:44px;
			font-size:14px;
			text-align:center;
			color:grey;
			border-bottom:.2px solid #ece6e6;
			i{  
				&:nth-child(1){
					font-size:28px;
				}
			}
		}
		#hot-title{
			padding-left:5px;
			color:#969896;
			line-height:44px;
			font-size:16px;
		}
		#hot-tags{
			padding-left:5px;
			
			li{
				
				float:left;
				padding:4px 10px;
				border:1px solid #969896;
				border-radius:15px;
				margin:6px 5px;
			}
		}
	}
	#cat-nav{
	height:36px;
	line-height:36px;
	background:#fff;
	overflow:scroll;
	#nav-wrapper{
		width:150%;
	}
	& div{
		width:16.66%;
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
	#cat-wrapper{
		position:relative;
		height:83vh;
		overflow:hidden;
		#cat-contents{
			position:absolute;
			width:600%;
			left:0;
			transition:all 1s ease;
			height:100%;
			&>div{
				float:left;
				width:16.66%;
				color:#fff;
				height:100%;
				overflow:scroll;
				padding-bottom:60px;
				li{
					padding:10px 0;
					display:flex;
					padding-left:10px;
					margin-top:0;
					border-bottom:1px solid  rgba(230, 226, 226, 0.95);
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
			#artists ,#albums ,#playLists {
				div{
					display:flex;
					img{
						flex-basis:44px;
					}
					p{
						display:inline-block;
						line-height:40px;
						padding-left:10px;
						flex:1;
					}
				}
				
			}
			#albums,#playLists{
			
				.desc{
					flex-direction:column;
					padding-left:10px;
					display:flex;
					overflow:hidden;
					flex:1;
					p{
						line-height:20px !important;
						height:20px;
						width:100%;
						padding-left:0;
					
					}
				}
				
			}
		}
	}
}

</style>

