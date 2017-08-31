<template>
	<div id='module' :class='tag'>
		<div id='title' @click='trigger()'>
			<p id='deco'></p>
		    <p id='title'>{{title}}&nbsp;&nbsp;<i class='iconfont'>&#xe658;</i></p>
		</div>
		<div style='clear:both;'></div>
		<ul id='list'>
			<li v-for='item in music' @click='showMenu(item)'>
				<img :src='item.coverImgUrl' alt=''/>
				<div class='item-content'>
					{{item.name}}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import api from '../../../api'
export default {
  name: 'MusicModule',
  props: ['title', 'music', 'tag'],
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
    trigger () {
      this.$emit('slide')
    }
  }
}
</script>

<style lang='scss' scoped>

#module{
	margin:20px 0;
}
#title{
	margin-bottom:18px;
	#deco{
		box-sizing:border-box;
		float:left;
		width:4px;
		height:16px;
		background:red;
		margin-top:5.3px;
	}
	#title{
		float:left;
		height:25px;
		background:none;
		color:#000;
		line-height:25px;
		margin-left:10px;
		font-size:16px;
	}
}
#list{
	li{
		width:33%;
		float:left;
		margin:0;
		margin-bottom:10px;
		&:nth-child(3n+2){
			margin:0 .5%;
		
		}
		.item-content{
			color:#000;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			height:36px;
		}
	}
}
</style>