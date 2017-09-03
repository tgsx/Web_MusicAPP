<template>
	<div id='commend'>
		<div id='banner'>
			<swiper class="my-swipe" :options="swiperOption" ref="mySwiper">
				  <swiper-slide >
			      	<img src="../../../assets/img/1.png" alt=''/>
			      </swiper-slide>
				 <swiper-slide class='slide2'>
			      	<img src="../../../assets/img/2.png" alt=''/>
			      </swiper-slide>
				<swiper-slide class='slide3'>
			      	<img src="../../../assets/img/3.png" alt=''/>
			      </swiper-slide>
			      <swiper-slide class='slide4'>
			      	<img src="../../../assets/img/5.png" alt=''/>
			      </swiper-slide>
			      <swiper-slide class='slide3'>
			      	<img src="../../../assets/img/6.png" alt=''/>
			      </swiper-slide>
			      <swiper-slide class='slide3'>
			      	<img src="../../../assets/img/7.png" alt=''/>
			      </swiper-slide>
		      	<div class="swiper-pagination"  slot="pagination"></div>
		    </swiper>
		</div>
		<div id='cards'>
			<div class='c-item'>
				<div class='icon'>
					<i class='iconfont'>&#xe7e5;</i>
				</div>
				<p>私人FM</p>
			</div>
			<div class='c-item'>
				<div class='icon'>
					<i class='iconfont'>&#xe647;</i>
				</div>
				<p>每日歌曲推荐</p>
			</div>
			<div class='c-item'>
				<div class='icon'>
					<i class='iconfont'>&#xe7bd;</i>
				</div>
				<p>云音乐热歌榜</p>
			</div>
			<div style="clear:both;"></div>
			
		</div>
		
		<music-module :music='music' title='推荐歌单' tag='tuijian' @slide='slide()'></music-module>
		
		<md-spinner class='md-warn'   md-indeterminate v-show='spinnerFlag'></md-spinner>
	</div>
</template>

<script>
import MusicModule from './musicmodule'
import api from '../../../api'
export default {
  name: 'commend',
  data () {
    return {
      spinnerFlag: true,
      music: {},
      // 引入swiper组件的配置信息
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: 2500,
        // direction : 'vertical',
        effect: 'coverflow',
        grabCursor: true,
        setWrapperSize: true,
        // autoHeight: true,
        // paginationType:"bullets",
        pagination: '.swiper-pagination',
        paginationElement: 'li',
        paginationClickable: true,
        // scrollbar:'.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        // onTransitionStart(swiper){
        //   console.log(swiper)
        // },
        // more Swiper configs and callbacks...
        // ...
      }
    }
  },
  mounted: function () {
    this.get()
  },
  methods: {
    get () {
      this.axios.get(api.getPlayListByWhere('全部', 'hot', 0, true, 9)).then(
        (res) => {
          this.music = res.data.playlists.slice(0, 6)
          this.spinnerFlag = false
        }
      )
    },
    slide () {
      this.$emit('slide')
    }
  },
  components: {
    MusicModule
  }
}
</script>

<style lang='scss' scoped>
#commend{
	height:80vh;
	overflow:scroll;
}
::-webkit-scrollbar
{
    width: 0px;
    height: 16px;
    background-color: red;
}
#cards{
	box-sizing:border-box;
	width:100%;
	padding:0 10%;
	margin:auto;
	padding-top:12px;
	padding-bottom:16px;
	border-bottom:.3px solid darkgrey;
	.c-item{
		width:33%;
		box-sizing:border-box;
		float:left;
		.icon{
			border:1.6px solid red;
			padding:3px 12px 6px 10px;
			display:inline-block;
			border-radius:50%;
		}
		i{
			font-size:30px;
			color:red;
		}
		&:nth-child(1){
			padding-right:6%;
			text-align:center;
		}
		&:nth-child(2){
			text-align:center;
		}
		&:nth-child(3){
			padding-left:6%;
			text-align:center;
		}
		p{
			padding-top:5px;
			color:#000;
		}
	}
}
.md-spinner{
	margin-left:43%
}
</style>