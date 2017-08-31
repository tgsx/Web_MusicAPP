<template>
	<div id='gedan' @scroll='scroll()'>
		<div class='gedan-hot'>
			<div class='hot-cover'>
				<img :src='hot.coverImgUrl' alt="" width="92%" height='120%' />
			</div>
			<div class='hot-info'>
				<div class='link'>
					<i class='iconfont'>&#xe7e7;</i>
					<span>精品歌单</span>
					<i class='iconfont'>&#xe658;</i>
				</div>
				<div class='name'>{{hot.name}}</div>
				<p>by&nbsp;&nbsp;{{hot.creator.nickname}}</p>
			</div>
			
		</div>
		<div class='select'>
			<div class="all" @click='showAll()'>{{cat}}<i class='iconfont'>&#xe658;</i></div>
			<div class='exp'>
				<span @click="select('华语')">华语</span>
				<span @click="select('轻音乐')">轻音乐</span>
				<span @click="select('摇滚')">摇滚</span>
			</div>
			<div style='clear:both'></div>
		</div>
		<div class='gedan-list'>
			<ul>
				<li v-for='(obj,index) in hotList' @click='showMenu(obj)'>
					<div class='img-wrapper'>
						<img :src='obj.coverImgUrl' alt='' width='100%'/>
					</div>
					
					<p class='desc'>{{obj.name}}</p>
				</li>
			</ul>
		</div>
		<div id='loading'>
			<md-spinner class='md-warn' :md-size="60" md-indeterminate v-show='showFlag'></md-spinner>
		</div>
		
	</div>
</template>

<script>
import api from '../../../api'
export default {
  data () {
    return {
      hot: null,
      hotList: [],
      loadCount: 1,
      showFlag: false,
      scrollFlag: true
    }
  },
  watch: {
    cat: function (newValue, oldValue) {
      this.select(newValue)
    }
  },
  computed: {
    cat () {
      return this.$store.state.cat
    },
    gedan () {
      return document.getElementById('gedan')
    }
  },
  methods: {
    showMenu (item) {
      this.$store.state.menuFlag = true
      this.$store.commit('changeActiveMenu', item)
      this.$http.get(api.getPlayListDetail(item.id)).then(
        (res) => {
          this.$store.commit('changeMenuList', res.data.playlist.tracks)
        }
      )
    },
    scroll (event) {
      if (this.gedan.scrollTop >= (this.gedan.scrollHeight - this.gedan.clientHeight)) {
        if (this.scrollFlag) {
          this.scrollFlag = false
          this.load(this.cat)
          this.showFlag = true
        }
      }
    },
    load (cat) {
      this.cat = cat
      this.$http(api.getHot(10 * ++this.loadCount, cat)).then(
        (res) => {
          this.hotList = res.data.playlists
          console.log(this.hotList)
          if (this.hot === null) {
            this.hot = res.data.playlists[0]
          }
          this.showFlag = false
          this.scrollFlag = true
        }
      )
    },
    select (cat) {
      this.showFlag = true
      this.hotList = []
      this.loadCount = 0
      this.load(cat)
    },
    showAll () {
      this.$store.commit('toggleSelect')
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style lang='scss' scoped>
#gedan{
	height:80vh;
	overflow:scroll;
	.gedan-hot{
		padding:14px 12px;
		display:flex;
		background:radial-gradient(ellipse farthest-corner at top left ,#000 0%, rgba(0, 0, 0, 0.4) 82%,#fff 100%);
		&>div{
			box-sizing:border-box;
		}
		.hot-cover{
			flex:3.4;
		}
		.hot-info{
			flex:6.6;
			.link{
				font-size:18px;
				line-height:40px;
				span{
					display:inline-block;
					padding:0 4px;
				}
				i:nth-child(1){
					color:yellow;
					font-size:16px;
				}
				
			}
			.name{
				font-size:14px;
			}
			p{
				color:rgba(255, 255, 255, 0.81);
			}
		}
	}
	.select{
		line-height:24px;
		font-size:14px;
		padding:14px 9px 14px 8px;
		.all{
			color:#000;
			float:left;
			padding:2px 8px;
			border-radius:16px;
			border:1px solid grey;
			i{
				margin-left:12px;
				color:grey;
			}
			letter-spacing:2px;
		}
		.exp{
			float:right;
			span{
				line-height:14px;
				display:inline-block;
				padding:0px 5px 0px 3px;
				color:rgba(0,0,0,0.65);
				margin:10px 0;
			}
			span:nth-child(1){
				border-right:1px solid grey;
			}
			span:nth-child(2){
				border-right:1px solid grey;
			}
			
		}
	}
	.gedan-list{
 		li{
			float:left;
			width:49.5%;
			margin:0;
			margin-bottom:20px;
			p{
				line-height:22px;
				color:#000;
				font-size:13px;
				height:36px;
			}
			
			.img-wrapper{
				width:100%;
				background:radial-gradient(circle at center,#000,grey);
			}
		}
		li:nth-child(2n+1){
			margin-right:1%;
		}
	}
	#loading{
		margin:auto;
		width:60px;
		height:60px;
		margin-bottom:30px;
	}
}	
</style>