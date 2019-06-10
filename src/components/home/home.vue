<template>
	<div class="home" ref='home'>
		<scroll class="home_box" :listenScroll='true' @scroll='scroll' :stopPropagation='false'>
			<div ref='scrollChild'>
				<div class="home_daily">
					<div class="home_daily_header">
						<div class="home_daily_header_title">每日精选</div>
						<div class="home_daily_header_play">Fox Music —— Design By Kamchan.Ho</div>
					</div>
					<div class="home_daily_header_content">
						<div class="home_daily_header_content_item" v-for='(item,index) in daily' @click='daily_play(item.id,index)'>
							<div class="home_daily_header_content_item_left">
								<img v-lazy="item.pic" width="100px" height="100px">
							</div>
							<div class="home_daily_header_content_item_daily">
								<div class="home_daily_header_content_item_daily_top">
									{{item.name}}
								</div>
								<div class="home_daily_header_content_item_daily_bottom">
									{{item.channel.name}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="home_recommends" v-show='daily.length'>
					<div class="home_recommends_title">
						Fox每日推荐
					</div>
					<div class="home_recommends_content">
						<div class="home_recommends_content_item" v-for='(item,index) in recommends' @click='daily_play(item.obj_id,index)'>
							<div class="home_recommends_content_item_top">
								<img v-lazy="item.sound.pic">
							</div>
							<div class="home_recommends_content_item_bottom">
								<div class="home_recommends_content_item_bottom_name">
									{{item.sound.name}}
								</div>
								<div class="home_recommends_content_item_bottom_channel">
									{{item.sound.channel.name}}<span>频道</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="loading-container" v-show='!daily.length||waitShow'>
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
			return{
				daily:[],
				recommends:[],
				page:1,
				waitShow:false
			}
		},
		components:{
			Scroll,
			Loading
		},
		methods:{
			_getIndex(){
				this.$http.get('http://localhost:3000/getIndexList').then(res=>{
					this.daily=res.body.hot_recommend;
				});
			},
			_getReommends(){
				this.$http.get('http://localhost:3000/getRecommendsList?page='+this.page).then(res=>{
					this.recommends.push(...res.body.data);
				});
			},
			scroll(pos){
				if ((-pos.y)+this.$refs.home.clientHeight==this.$refs.scrollChild.clientHeight) {
					this.page++;
					this._getReommends();
				}
			},
			daily_play(id,index){
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getLyric?id='+id).then(res=>{
					this.$router.push({
						path:`/home/${id}`
					});
					this.setSongInfo(res.body);
					this.waitShow=false;
				});
			},
			...mapMutations(['setSongInfo'])
		},
		created(){

		},
		mounted(){
			this._getIndex();
			this._getReommends();
		}
	};
</script>

<style scoped lang="stylus">
	.home_daily_header_play{
		position: absolute;
		right: 15px;
		top: 45px;
		font-size: 12px;
		font-weight: 900;
	}
	.home{
		width: 100%;
		height:calc(100% - 80px);
	}
	.home_box{
		width:100%;
		height:100%;
	}
	.home_daily{
		background: #f8cca1;
		// background: #ebebeb;
		padding-bottom: 30px;
	}
	.home_daily_header{
		height:30px;
		padding-top: 10px;
	}
	.home_daily_header_title{
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
	.home_daily_header>div:nth-child(2) i{
		margin-right: 10px;
		font-size: 20px;
	}
	.home_daily_header_content{
		margin-top: 30px;
	}
	.home_daily_header_content_item{
		width:92%;
		margin: 15px auto;
		background: white;
	}
	.home_daily_header_content_item>div{
		display: inline-block;
	}
	.home_daily_header_content_item_left{
		padding: 15px
	}
	.home_daily_header_content_item_daily{
		font-size: 12px;
		width:calc(100% - 145px);
		padding: 15px 15px 0 0;
		position: relative;
		vertical-align: top;
		height:100px;
	}
	.home_daily_header_content_item_daily_top{
		position: absolute;
		top: 15px;
		left: 0;
		font-size: 14px;
		padding-right: 15px;
	}
	.home_daily_header_content_item_daily_bottom{
		position: absolute;
		bottom: 0px;
		left: 0;
		color: #ccc;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
	.home_recommends{
		margin-top: 30px;
	}
	.home_recommends_content{
		width:100%;
	}
	.home_recommends_title{
		width:120px;
		margin: 10px auto;
		background:#72d371;
		color: white;
		text-align: center;
		padding: 5px;
		border-radius: 15px;
		font-weight: 900;
	}
	.home_recommends_content_item{
		width:calc(50% - 30px);
		padding: 15px;
		display: inline-block;
	}
	.home_recommends_content_item_top{
		width:100%;
	}
	.home_recommends_content_item_top img{
		width:156px;
		height:156px;
	}
	.home_recommends_content_item_bottom>div{
		overflow: hidden;
		width:100%;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.home_recommends_content_item_bottom>div:nth-child(1){
		font-size: 16px;
	}
	.home_recommends_content_item_bottom>div:nth-child(2){
		font-size: 12px;
		color: #72d371;
		position: relative;
		width:calc(100% - 30px);
		padding-right: 30px;
	}
	.home_recommends_content_item_bottom>div:nth-child(2) span{
		position: absolute;
		top: 0;
		right: 0;
		color: #ccc;
		font-size: 14px;
	}
</style>












































































