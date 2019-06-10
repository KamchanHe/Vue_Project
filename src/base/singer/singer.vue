<template>
	<div class="singer" ref='singer'>
		<scroll class='mr_scroll' :listenScroll='true' @scroll='scroll'>
			<div class="scrollChild" ref='scrollChild'>
				<i class="fa fa-arrow-circle-o-left fa-2x back" @click='back'></i>
				<div class="singer_header">
					<div class="singer_header_img">
						<img :src="singerInfo.avatar">
						<div class="img_icon">
							<img :src="singerInfo.avatar">
						</div>
					</div>
				</div>
				<div class="singer_about">
					<div class="singer_about_top">
						<div class="top_info">
							<div>
								<i :class="['fa',singerInfo.sex==0?'fa-male':'fa-female']"></i>
								<span>{{singerInfo.constellation}}</span>
							</div>
							<div>
								<i class="fa fa-location-arrow"></i>
								<span>{{singerInfo.city}}</span>
							</div>
							<div class="top_info_famous">
								<img :src="singerInfo.famous_icon">
								<span>{{singerInfo.famous.famous_type_title}}</span>
								<span>{{singerInfo.famous.famous_sub_type_title}}</span>
							</div>
						</div>
						<div class="bottom_info">
							<p>{{singerInfo.famous.job_title}}</p>
						</div>
					</div>
					<div class="singer_about_middle">
						<div><span>被关注：</span><span>{{singerInfo.num.followed}}</span></div>
						<div><span>关注的：</span><span>{{singerInfo.num.following}}</span></div>
					</div>
					<div class="singer_about_bottom">
						<p>{{singerInfo.intro}}</p>
					</div>
				</div>
				<div class="singer_song">
					<h3>TA 的Fox歌单</h3>
					<div class="song_list">
						<div class="song_list_item" v-for='item in songInfo' @click='daily_play(item.id)'>
							<div class="item_img">
								<img :src="item.pic">
							</div>
							<div class="item_about">
								<div class="item_about_name">{{item.name}}</div>
								<div class="item_about_info">{{item.info}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="loading-container" v-show='!songInfo.length||waitShow'>
				<loading></loading>
			</div>
			<router-view></router-view>
		</scroll>
	</div>
</template>

<script type="text/javascript">
	import Scroll from '../../base/scroll/scroll.vue';
	import Loading from '../../base/loading/loading.vue';
	import {mapGetters} from 'vuex';
	import {mapMutations} from 'vuex';
	export default{
		data(){
			return{
				singerInfo:[],
				songInfo:[],
				waitShow:false
			}
		},
		components:{
			Scroll,
			Loading
		},
		methods:{
			scroll(){

			},
			back(){
				this.$router.back();
			},
			daily_play(id){
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getLyric?id='+id).then(res=>{
					this.$router.push({
						path:`${this.$route.path}/${id}`
					});
					this.setSongInfo(res.body);
					this.waitShow=false;
				});
			},
			...mapGetters(['getSingerInfo']),
			...mapMutations(['setSongInfo'])
		},
		created(){
			this.singerInfo=this.getSingerInfo().info;
			this.$http.get('http://localhost:3000/getStarSong?id='+this.singerInfo.id).then(res=>{
				this.songInfo=res.body.sound_hot;
			})
		},
		mounted(){

		}
	};
</script>

<style scoped lang="stylus">
	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
	.singer{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: white;
		z-index: 10;
	}
	.mr_scroll{
		width: 100%;
		height: 100%;
	}
	.back{
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 11;
	}
	.singer_header_img{
		width: 100%;
		height: 230px;
		overflow: hidden;
		position: relative;
	}
	.singer_header_img>img{
		width: 100%;
		filter: blur(3px);
	}
	.img_icon{
		position: absolute;
		bottom:50%;
		left: 50%;
		margin-bottom:-50px;
		margin-left: -50px;
		width: 100px;
		height: 100px;
	}
	.img_icon img{
		display: block;
		width: 100%;
		border-radius: 50%;
	}
	.top_info{
		padding: 0 30px;
		font-size: 14px;
		line-height: 20px;
		margin-top: 15px;
	}
	.top_info>div .fa-male{
		color: skyblue;
	}
	.top_info>div .fa-female{
		color: hotpink;
	}
	.top_info>div{
		display: inline-block;
		margin-right: 10px;
		height: 20px;
		overflow: hidden;
	}
	.top_info>div>span{
		display: inline-block;
		height: 20px;
	}
	.top_info>div i{
		margin-right: 5px;
	}
	.top_info_famous{
		// background: #72d371;
		background: skyblue;
		border-radius: 10px;
	}
	.top_info>div:nth-child(3){
		padding-right: 5px;
		text-align: center;
		color: white;
		font-weight: 900;
	}
	.top_info>div:nth-child(3) img{
		width: 20px;
		height: 20px;
		border-radius: 10px;
		display: block;
		float: left;
		margin-right: 5px;
	}
	.top_info>div:nth-child(3) span{
		display: block;
		float: left;
		margin-right: 10px;
	}
	.bottom_info{
		text-align: center;
		color: #72d371;
		font-size: 12px;
		font-weight: 900;
		margin-top: 10px;
	}
	.singer_about_middle{
		margin-top: 20px;
		font-size: 12px;
		height: 20px;
		color: #6e6e6e;
		font-weight: 900;
	}
	.singer_about_middle>div{
		float: left;
		width: 49%;
		text-align: center;
	}
	.singer_about_middle>div:nth-child(1){
		border-right: 2px solid #ccc;
	}
	.singer_about_bottom{
		font-size: 12px;
		padding: 0px 40px;
		margin-top: 20px;
		text-indent: 2rem;
	}
	.singer_song{
		margin-top: 30px;
		padding: 20px;
	}
	.singer_song h3{
		text-align: center;
	}
	.song_list_item{
		margin: 20px 0;
		font-size: 14px;
		height: 80px;
		border: 1px solid #ccc;
		border-right: none;
	}
	.item_img{
		width: 80px;
		height: 80px;
		float: left;
		margin-right: 20px;
	}
	.item_img img{
		width: 100%;
	}
	.item_about{
		margin-left: 100px;
		width: calc(100% - 100px);
	}
	.item_about_name{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
		padding-top: 10px;
	}
	.item_about_info{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
		padding-top: 10px;
	}
</style>















































