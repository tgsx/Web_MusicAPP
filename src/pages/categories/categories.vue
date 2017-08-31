<template>
	<div id='category'>
		<div id='c-nav'>
			<div :class="{'active':activeIndex==0?true:false}" @click='focus(0)'>
				<span>个性推荐</span>
			</div>
			<div :class="{'active':activeIndex==1?true:false}" @click='focus(1)'>
				<span>歌单</span>
			</div>
			<div :class="{'active':activeIndex==2?true:false}" @click='focus(2)'>
				<span>主播电台</span>
			</div>
			<div :class="{'active':activeIndex==3?true:false}" @click='focus(3)'>
				<span>排行榜</span>
			</div>
		</div>
		<div id='wrapper'>
			<div id='c-content'>
				<commend @slide='slide()'></commend>
				<gedan></gedan>
				<div>3</div>
				<div>3</div>
			</div>
		</div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import commend from './commend/commend'
import gedan from './gedan/gedan'
export default {
  name: 'category',
  components: {
    swiper,
    swiperSlide,
    commend,
    gedan
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    focus: function (index) {
      this.activeIndex = index
      var content = document.getElementById('c-content')
      var pageWidth = document.documentElement.clientWidth
      content.style.left = -index * parseInt(pageWidth) + 'px'
      // console.log(-index * parseInt(pageWidth) + 'px')
    },
    slide () {
      this.focus(1)
    }
  }
}
</script>

<style lang='scss' scoped>
#banner{
	width:100%;
	
}


#c-nav{
	height:36px;
	line-height:36px;
	display:flex;
	&>div{
		display:inline-block;
		flex:1;
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
#wrapper{
	position:relative;
	overflow:hidden;
	height:83vh;
	#c-content{
	position:absolute;
	width:400%;
	left:0;
	transition:all 1s ease;
	&>div{
		float:left;
		width:25%;
		color:#fff;
		
	}
}
}

</style>