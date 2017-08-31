<template>
	<div id='mine'>
		
		<md-list class='custom-list'>

			<md-list-item>
		      <md-icon class='iconfont'>&#xe680;</md-icon>
			  <span>本地音乐</span>
			  <md-divider class="md-inset"></md-divider>
			</md-list-item>
			<md-list-item>
		      <md-icon class='iconfont'>&#xe680;</md-icon>
			  <span>最近播放</span>
			  <md-divider class="md-inset"></md-divider>
			</md-list-item>
			<md-list-item>
		      <md-icon class='iconfont'>&#xe646;</md-icon>
			  <span>下载管理</span>
			  <md-divider class="md-inset"></md-divider>
			</md-list-item>
			<md-list-item>
		      <md-icon class='iconfont'>&#xe626;</md-icon>
			  <span>我的电台</span>
			  <md-divider class="md-inset"></md-divider>
			</md-list-item>
			<md-list-item>
		      <md-icon class='iconfont'>&#xe65f;</md-icon>
			  <span>我的收藏</span>
			</md-list-item>
			
		
		    
		</md-list>
	</div>
</template>

<script>
</script>

<style scoped>

#mine{
	
	.custom-list{
		
		background:rgba(191, 180, 180, 0.12) !important;
		color:rgba(0, 0, 0, 0.87)
		
	}
	
	
}
.iconfont{
		font-size:21px;
		line-height:29px;
		
	}

.fa-music:before{
	font-size:22px;
	line-height:30px;
	color:red;
}


.md-list-item .md-list-item-container > .md-icon:first-child{
	margin-right:12px;
}
.md-list-item .md-icon{
		color:red;
}
.md-divider.md-inset{
	margin-left:50px;
	height:.6px;
}
</style>