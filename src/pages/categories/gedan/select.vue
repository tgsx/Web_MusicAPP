<template>
  <transition-group name='fade' appear>
	<div id='all' v-show='selectFlag' key='all'>
		<div id='title'>
			<i class='iconfont back' @click='hide()'>&#xe67b;</i>
			<span class='title-name'>选择分类</span>
			
		</div>
		<div id='cats' @click="select()">
			<p id='quanbu'>全部歌单</p>
			<table id='lan'>
				<tr>
					<td rowspan='2'><i class='iconfont'>&#xe619;</i><br/>语种</td>
					<td>华语</td>
					<td>欧美</td>
					<td>日语</td>
					
				</tr>
				<tr>
					<td>韩语</td>
					<td>粤语</td>
					<td>小语种</td>
				</tr>
			</table>
			<table id='style'>
				<tr>
					<td rowspan='2'><i class='iconfont'>&#xe684;</i><br/>风格</td>
					<td>流行</td>
					<td>摇滚</td>
					<td>民谣</td>
					
				</tr>
				<tr>
					<td>电子</td>
					<td>舞曲</td>
					<td>说唱</td>
				</tr>
				<tr>
					<td>轻音乐</td>
					<td>爵士</td>
					<td>乡村</td>
					<td>R&B/Soul</td>
				</tr>
				<tr>
					<td>古典</td>
					<td>民族</td>
					<td>英伦</td>
					<td>金属</td>
				</tr>
				<tr>
					<td>朋克</td>
					<td>蓝调</td>
					<td>雷鬼</td>
					<td>世界音乐</td>
				</tr>
				<tr>
					<td>拉丁</td>
					<td>另类/独立 </td>
					<td>New Age</td>
					<td>古风</td>
				</tr>
				<tr>
					<td>后摇</td>
					<td>Bossa Nova</td>
					<td></td>
					<td></td>
				</tr>
			</table>
			<table id='scene'>
				<tr>
					<td rowspan='2'><i class='iconfont'>&#xe611;</i><br/>场景</td>
					<td>清晨</td>
					<td>夜晚</td>
					<td>学习</td>
					
				</tr>
				<tr>
					<td>工作</td>
					<td>午休</td>
					<td>下午茶</td>
				</tr>
				<tr>
					<td>地铁</td>
					<td>驾车</td>
					<td>运动</td>
					<td>旅行</td>
				</tr>
				<tr>
					
					<td>散步</td>
					<td>酒吧</td>
					<td></td>
					<td></td>
				</tr>
			</table>
			<table id='mood'>
				<tr>
					<td rowspan='2'><i class='iconfont'>&#xe694;</i><br/>情感</td>
					<td>怀旧</td>
					<td>清新</td>
					<td>浪漫</td>
					
				</tr>
				<tr>
					<td>性感</td>
					<td>伤感</td>
					<td>治愈</td>
				</tr>
				<tr>
					<td>放松</td>
					<td>孤独</td>
					<td>感动</td>
					<td>兴奋</td>
				</tr>
				<tr>
					
					<td>快乐</td>
					<td>安静</td>
					<td></td>
					<td></td>
				</tr>
			</table>
			<table id='theme'>
				<tr>
					<td rowspan='2'><i class='iconfont'>&#xe740;</i><br/>主题</td>
					<td>影视原声</td>
					<td>ACG</td>
					<td>校园</td>
					
				</tr>
				<tr>
					<td>游戏</td>
					<td>70后</td>
					<td>80后</td>
				</tr>
				<tr>
					<td>90后</td>
					<td>网络歌曲</td>
					<td>KTV</td>
					<td>经典</td>
				</tr>
				<tr>
					
					<td>翻唱</td>
					<td>吉他</td>
					<td>钢琴</td>
					<td>器乐</td>
				</tr>
				<tr>
					
					<td>儿童</td>
					<td>榜单</td>
					<td>00后</td>
					<td></td>
				</tr>
			</table>
		</div>
	  </div>
	</div>
  </transition-group>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    select (ev) {
      var e = ev || window.event
      this.$store.commit('setCat', e.target.innerText)
      this.$store.commit('toggleSelect')
      if (this.$store.state.selectObject) {
        this.$store.state.selectObject.style.border = '.2px solid #ece4e4'
      }
      e.target.style.border = '2px solid red'
      this.$store.commit('setSelectObj', e.target)
    },
    hide () {
      this.$store.commit('toggleSelect')
    }
  },
  computed: {
    selectFlag () {
      return this.$store.state.selectFlag
    }
  }
}
</script>

<style lang='scss' scoped>
::-webkit-scrollbar{
	width:0;
	height:0;
	display:none;
}
#all{
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
	background:#f9f6f6;
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
		.back{
			flex-basis:40px;
			font-size:24px;
		}
		.title-name{
			flex:1;
			
			text-align:left;
		}
	}
	#cats{
		height:90vh;
		overflow:scroll;
		margin-top:10vh;
		margin-bottom:50px;
		#quanbu{
			display:block;
			line-height:60px;
			text-align:center;
			font-size:18px;
			background:#fff;
			letter-spacing:2px;
			border:.3px solid rgba(0,0,0,0.2);
		}
	}
	
	table{
		width:100%;
		border-collapse:collapse;
		margin:12px 0;
		color:#4a4848;
		box-shadow:1px 1px grey;
		&>tr:nth-child(1){
			&>td:nth-child(1){
				color:rgba(128, 128, 128, 0.89);
				line-height:24px;
				i{
					font-size:24px;
				}
			}
		}
		td{
			width:25%;
			margin:0;
			padding:0;
			box-sizing:border-box;
			text-align:center;
			line-height:40px;
			font-size:14px;
			border:.2px solid #ece4e4;
			background:#fff;
			box-shadow:1px 1px #404040;
			
		}
		
	}
}
</style>