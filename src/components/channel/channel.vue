<template>
	<div class="chanel" ref='chanel'>
		<scroll class='channel_content' :listenScroll='true' @scroll='scroll'>
			<div ref='scrollChild'>
				<div class="chanel_header">
					<i class="fa fa-bars" @click='showMenu'></i>
					<span @click='toTag(0)'>热门频道</span>
					<div class="chanel_header_menu" ref='menu'>
						<ul>
							<li v-for='tag in channelTag' @click='toTag(tag.id)'>{{tag.name}}</li>
						</ul>
					</div>
				</div>
				<div class="channel_content_item" v-for='item in channelList'>
					<div class="channel_content_item_header" @click='toList(item.id)'>
						<div class="channel_content_item_header_img">
							<img :src="item.pic">
						</div>
						<div class="channel_content_item_header_about">
							<p>{{item.name}}</p>
							<ul>
								<li>
									<i class="fa fa-music"></i>
									<span>{{Number(item.sound_count/1000).toFixed(1)}}万</span>
								</li>
								<li>
									<i class="fa fa-user"></i>
									<span>{{Number(item.follow_count/1000).toFixed(1)}}万</span>
								</li>
								<li>
									<i class="fa fa-share"></i>
									<span>{{Number(item.share_count/1000).toFixed(1)}}万</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="channel_content_item_tips">频道热门列表</div>
					<div class="channel_content_item_content" v-for='(list,index) in item.sound' @click='daily_play(list.id,index)'>
						<div class="channel_content_item_content_img">
							<img :src="list.pic">
						</div>
						<div class="channel_content_item_content_name">
							<p>{{list.name}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="loading-container" v-show='!channelList.length||waitShow'>
				<loading></loading>
			</div>
			<router-view></router-view>
		</scroll>
	</div>
</template>

<script type="text/javascript">
	import Scroll from '../../base/scroll/scroll.vue';
	import Loading from '../../base/loading/loading.vue';
	import {mapMutations} from 'vuex';
	export default{
		data(){
			return {
				show:false,
				channelList:[],
				page:1,
				waitShow:false,
				channelTag:[]
			}
		},
		components:{
			Scroll,
			Loading
		},
		methods:{
			showMenu(){
				if (!this.show) {
					this.$refs.menu.style.height='240px';
					this.$refs.menu.style.boxShadow='0 5px 10px 1px #ccc';
					this.show=true;
				}
				else{
					this.$refs.menu.style.height='0px';
					this.$refs.menu.style.boxShadow='0 5px 10px 0px #ccc';
					this.show=false;
				}
			},
			daily_play(id,index){
				// this.$router.push({
				// 	path:`/home/${id}`
				// });
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getLyric?id='+id).then(res=>{
					this.$router.push({
						path:`/channel/${id}`
					});
					this.setSongInfo(res.body);
					this.waitShow=false;
				});
				// this.setSongInfo(this.daily[index]);
			},
			scroll(pos){
				if (pos.y==(this.$refs.chanel.clientHeight-this.$refs.scrollChild.clientHeight)) {
					this.waitShow=true;
					this.page++;
					this.$http.get('http://localhost:3000/getIndexChannel?page='+this.page).then(res=>{
						this.channelList.push(...res.body.channels);
						this.waitShow=false;
					})
				}
			},
			toTag(id){
				this.waitShow=true;
				this.page=1;
				this.$http.get('http://localhost:3000/getIndexChannel?tag_id='+id+'&page='+this.page).then(res=>{
					this.channelList=res.body.channels;
					if (id!=0) {this.showMenu()};
					this.waitShow=false;
				});
			},
			toList(id){
				this.$router.push({
					path:`/channel/list/${id}`
				});
			},
			...mapMutations(['setSongInfo'])
		},
		created(){
			this.$http.get('http://localhost:3000/getIndexChannel?tag_id=0&page='+this.page).then(res=>{
				this.channelList=res.body.channels;
			});
			this.$http.get('http://localhost:3000/getIndexChannelTag').then(res=>{
				this.channelTag=res.body.categories;
			});

		},
		mounted(){

		}
	};
</script>

<style scoped lang="stylus">
	.chanel{
		height:calc(100% - 60px);
	}
	.chanel_header{
		width: 100%;
		height: 30px;
		margin: 20px 0;
		position: relative;
	}
	.chanel_header i{
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 20px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.chanel_header span{
		display: block;
		width:120px;
		padding: 5px;
		margin: 0px auto;
		background:#72d371;
		color: white;
		text-align: center;
		border-radius: 15px;
		font-weight: 900;
		font-size: 14px;
	}
	.chanel_header_menu{
		transition: all 0.3s;
		position: absolute;
		top: 35px;
		left: 0;
		width: 200px;
		height: 0px;
		overflow: hidden;
		box-shadow: 0 5px 10px 1px #ccc;
		z-index: 10;
		background: white;
	}
	.chanel_header_menu li{
		height:40px;
		line-height: 40px;
		color: black;
		list-style: none;
		text-align: center;
		font-weight: 900;
	}
	.channel_content{
		width: 100%;
		height:100%;
	}
	.channel_content_item{
		overflow: hidden;
		position: relative;
		margin:20px 0;
		padding: 10px;
	}
	.channel_content_item_header_img{
		width: 100px;
		height:100px;
		float: left;
		margin-right: 10px;
	}
	.channel_content_item_header_img img{
		display: block;
		width: 100%;
		height:100%;
	}
	.channel_content_item_header_about{
		height:100px;
		position: relative;
	}
	.channel_content_item_header_about p{
		padding-top: 10px;
		font-weight: 900;
		font-size: 18px;
		width: calc(100% - 120px);
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.channel_content_item_header_about ul{
		position: absolute;
		bottom: 20px;
		left:110px;
		overflow: hidden;
	}
	.channel_content_item_header_about li{
		list-style: none;
		float: left;
		margin-right: 10px;
	}
	.channel_content_item_header_about li i{
		margin-right: 5px;
	}
	.channel_content_item_tips{
		width:120px;
		padding: 5px;
		margin: 0px auto;
		background:#72d371;
		color: white;
		text-align: center;
		border-radius: 15px;
		font-weight: 900;
		font-size: 14px;
		margin-top: 10px;
	}
	.channel_content_item_content{
		margin: 20px 5px;
		height:70px;
		background: #e2f0f7;
		font-weight: 900;
	}
	.channel_content_item_content_img{
		width: 70px;
		height:70px;
		float: left;
	}
	.channel_content_item_content_img img{
		display: block;
		width: 100%;
		height:100%;
	}
	.channel_content_item_content_name{

	}
	.channel_content_item_content_name p{
		font-size: 14px;
		overflow: hidden;
		padding-left: 20px;
		line-height: 20px;
		padding-top: 5px;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
</style>





















