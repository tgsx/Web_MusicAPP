<template>
		<div id='singer'  key='singer'>
			<div class='singer-title'>
				<i class='iconfont back' @click='hide()'>&#xe67b;</i>
				<span class='title-name'>歌单分类</span>
				<div class='set'>
					
				</div>
			</div>
			<div class='singer-cat'>
				<div>
					<ul>
						<li>华语男歌手</li>
						<li>华语女歌手</li>
						<li>华语乐队/组合</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>欧美男歌手</li>
						<li>欧美女歌手</li>
						<li>欧美乐队/组合</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>日本男歌手</li>
						<li>日本女歌手</li>
						<li>日本乐队/组合</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>韩国男歌手</li>
						<li>韩国女歌手</li>
						<li>韩国乐队/组合</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>其他男歌手</li>
						<li>其他女歌手</li>
						<li>其他乐队/组合</li>
					</ul>
				</div>
			</div>
		</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    hide () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
#singer{
	width:100%;
	height:100vh;
	position:absolute;
	top:0;
	left:0;
	z-index:600;
	background:#f9f9f9;
	color:#4a4848;

	.singer-title{
		width:100%;
		height:10vh;
		position:fixed;
		top:0;
		z-index:601;
		background:red;
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
	.singer-cat{
		margin-top:10vh;
		height:82vh;
		overflow:scroll;
		&>div{
			margin-top:20px;
			background:#fff;
			ul{
				li{
					margin:0;
					padding:0;	
					line-height:42px;
					padding-left:12px;
					font-size:16px;
					&+li{
						border-top:0.5px solid rgba(177, 172, 172, 0.28);
					}
				}
				
				
			}
		}
		
	}
}
</style>