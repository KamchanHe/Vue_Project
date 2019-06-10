<template>
	<div class="xrz" ref='xrz'>
		<scroll class='xrz_scroll' :listenScroll='true' @scroll='scroll'>
			<div class="scrollChild" ref='scrollChild'>
				<div class="xrz_item" v-for='item in xrzList' @click='toSinger(item.id)'>
					<div class="xrz_item_img">
						<img :src="item.avatar">
					</div>
					<div class="xrz_item_about">
						<div class="xrz_item_about_info">
							<div>{{item.name}}</div>
							<div><img :src="item.famous_icon"></div>
						</div>
						<div class="xrz_item_about_follow">{{item.followed_count}}人 关注</div>
					</div>
				</div>
			</div>
			<div class="loading-container" v-show='!xrzList.length||waitShow'>
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
				xrzList:[],
				page:1,
				limit:20,
				refresh:true,
				waitShow:false
			}
		},
		components:{
			Scroll,
			Loading
		},
		methods:{
			scroll(pos){
				if(pos.y==this.$refs.xrz.clientHeight-this.$refs.scrollChild.clientHeight-120){
					this.page++;
					this.$http.get('http://localhost:3000/getXrzList?page='+this.page).then(res=>{
						this.xrzList.push(...res.body.lists);
					})
				}
			},
			toSinger(id){
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getStarInfo?id='+id).then(res=>{
					this.$router.push({
						path:`/famous/xrz/${id}`
					});
					this.setSingerInfo(res.body);
					this.waitShow=false;
				});
			},
			...mapMutations(['setSingerInfo'])
		},
		created(){
			this.$http.get('http://localhost:3000/getXrzList?page='+this.page).then(res=>{
				this.xrzList=res.body.lists;
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
	.xrz_scroll{
		width: 100%;
		height: calc(100% - 120px);
	}
	.xrz{
		height: 100%;
		width: 100%;
	}
	.xrz_item{
		width: 50%;
		display: inline-block;
		margin-top: 10px;
	}
	.xrz_item_img{
		padding: 10px 10px 0 10px;
	}
	.xrz_item_img img{
		width: 100%;
		border-radius: 0%;
	}
	.xrz_item_about_info{
		height: 25px;
	}
	.xrz_item_about_info>div{
		float: left;
		height: 25px;
		line-height: 25px;
		margin: 0 5px;
		text-align: center;
		font-weight: 900;
	}
	.xrz_item_about_info>div:nth-child(1){
		padding-left: 20px;
	}
	.xrz_item_about_info>div:nth-child(2){
		width: 20px;
		height: 20px;
	}
	.xrz_item_about_info>div:nth-child(2) img{
		width: 100%;
	}
	.xrz_item_about_follow{
		padding-left: 25px;
		font-size: 14px;
		color: #6e6e6e;
	}
</style>


































