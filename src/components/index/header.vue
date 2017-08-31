<template>
	<div id="header" >
		<md-theme md-name="default">
		<md-toolbar class='md-warn nav'>
		  <md-button class="md-icon-button menu" @click="toggleLeftSidenav">
		    <md-icon>menu</md-icon>
		  </md-button>
		
		  <ul id="tabs">
		  	<li @click='focus(0)'><i class='iconfont'>&#xe680;</i></li>
		  	<li @click='focus(1)'><i class='iconfont'>&#xe61e;</i></li>
		  	<li @click='focus(2)'><i class='iconfont'>&#xe61c;</i></li>
		  </ul>
		  
		  <md-button class="md-icon-button search" @click="search">
		  	<md-icon>search</md-icon>
		  </md-button>
		</md-toolbar>
		<ul id="content">
		  	<li id='c_1'>
		  		<mine-nav></mine-nav>
		  	</li>
		  	<li id='c_2'>
		  		<category-nav></category-nav>
		  	</li>
		  	<li id='c_3'>3</li>
		</ul>
		  
		<md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
		    <md-toolbar class="md-account-header">
      <md-list class="md-transparent">
        <md-list-item class="md-avatar-list">
          <md-avatar class="md-large">
            <img src="https://placeimg.com/64/64/people/8" alt="People">
          </md-avatar>

          <span style="flex: 1"></span>

          <md-avatar>
            <img src="https://placeimg.com/40/40/people/3" alt="People">
          </md-avatar>

          <md-avatar>
            <img src="https://placeimg.com/40/40/people/4" alt="People">
          </md-avatar>
        </md-list-item>

        <md-list-item>
          <div class="md-list-text-container">
            <span>Liby</span>
            <span>Liby@163.com</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>arrow_drop_down</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-toolbar>

    		<md-list>
      <md-list-item @click="$refs.sidenav.toggle()" class="md-primary">
        <md-icon>insert_drive_file</md-icon> <span>个人中心</span>
      </md-list-item>

      <md-list-item @click="$refs.sidenav.toggle()">
        <md-icon>people</md-icon> <span>收藏</span>
      </md-list-item>

      <md-list-item @click="$refs.sidenav.toggle()">
        <md-icon>access_time</md-icon> <span>分享</span>
      </md-list-item>

      <md-list-item @click="$refs.sidenav.toggle()">
        <md-icon>start</md-icon> <span>建议</span>
      </md-list-item>

      
    </md-list>
		
		    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
		</md-sidenav>
	
	</md-theme>
	</div>
	
</template>

<script>
import mineNav from '../../pages/mine/mine'
import categoryNav from '../../pages/categories/categories'
export default {
  name: 'headerNav',
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    toggleRightSidenav () {
      this.$refs.rightSidenav.toggle()
    },
    closeRightSidenav () {
      this.$refs.rightSidenav.close()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    },
    search: function () {
      this.$store.commit('toggleSearchFlag')
    },
    focus (index) {
      var items = document.querySelectorAll('#tabs li')
      var contentObj = document.querySelector('#content')
      for (let i of items.keys()) {
        if (index === i) {
          items[i].getElementsByTagName('i')[0].style = 'color:#fff;font-size:25px;'
          contentObj.style.transform = 'translateX(' + (-(parseFloat(contentObj.scrollWidth) / 3 * index)) + 'px)'
          console.log('translate(' + (-(parseFloat(contentObj.scrollWidth) / 3 * index)) + 'px)')
        } else {
          items[i].getElementsByTagName('i')[0].style = 'color:rgba(255,255,255,0.5);font-size:23px;'
        }
      }
    }
  },
  components: {
    mineNav,
    categoryNav
  }
}
</script>

<style lang='scss' scoped>
#header{
	overflow:hidden;
	.nav{
		display: -webkit-flex;
		display:flex;
		padding:0;
		.menu{
			flex:1;
			padding:0;
			i{
				font-weight:600
			}
		}
		#tabs{
		
			
			display:flex;
			list-style-type:none;
			flex:4;
			padding:0 10%;
			li{
				float:left;
				margin-top:0 !important;
				flex:1;
				text-align:center;
				font-size:23px;
				
				
				i{
					transition:all 500 ease;
					color:rgba(255,255,255,0.5);
					font-size:22px;
				}
				&:nth-child(1) i{color:#fff;}
				
			}
		
		}
		.search{
			flex:1;
			padding:0;
		}
	}
	#content{
		width:300%;
		height:83vh;
		list-style-type:none;
		transition:all .6s ease;

		top:10vh;
		left:0;
		li{
			width:33.3%;
			float:left;
			margin-top:0;
			background:rgba(197, 195, 195, 0.08)
		}
	}
}

</style>