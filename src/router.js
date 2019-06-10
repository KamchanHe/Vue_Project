import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/home/home.vue';
import Channel from './components/channel/channel.vue';
import Famous from './components/famous/famous.vue';
import Search from './components/search/search.vue';
import Play from './base/play/play.vue';
import List from './components/list/list.vue';
import Mr from './components/mr/mr.vue';
import Qx from './components/qx/qx.vue';
import Xrz from './components/xrz/xrz.vue';
import Tj from './components/tj/tj.vue';
import Singer from './base/singer/singer.vue';


Vue.use(Router)

export default new Router({
  routes: [
  	{path:'/',redirect:'/home'},
  	{
  		path:'/home',
  		component:Home,
  		children:[
		{
			path:':id',
			component:Play
		}]
  	},
  	{
  		path:'/channel',
  		component:Channel,
  		children:[
		{
			path:':id',
			component:Play
		},
		{
			path:'list/:listid',
			component:List,
			children:[
			{
				path:':id',
				component:Play
			}]
		}]
  	},
  	{
  		path:'/famous',
  		component:Famous,
  		redirect:'/famous/mr',
  		children:[
  			{
  				path:'mr',
  				component:Mr,
  				children:[
  					{
  						path:':id',
  						component:Singer,
  						children:[
  							{
  								path:':uid',
  								component:Play
  							}
  						]
  					}
  				]
  			},
  			{
  				path:'qx',
  				component:Qx,
  				children:[
  					{
  						path:':id',
  						component:Singer,
  						children:[
  							{
  								path:':uid',
  								component:Play
  							}
  						]
  					}
  				]
  			},
  			{
  				path:'xrz',
  				component:Xrz,
  				children:[
  					{
  						path:':id',
  						component:Singer,
  						children:[
  							{
  								path:':uid',
  								component:Play
  							}
  						]
  					}
  				]
  			},
  			{
  				path:'tj',
  				component:Tj,
  				children:[
  					{
  						path:':id',
  						component:Singer,
  						children:[
  							{
  								path:':uid',
  								component:Play
  							}
  						]
  					}
  				]
  			},
  		]
  	},
  	{
  		path:'/search',
  		component:Search,
  		children:[
		{
			path:':id',
			component:Play
		}]
  	}
  ]
})





































