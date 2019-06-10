<template>
	<div class="qx" ref='qx'>
		<scroll class='qx_scroll' :listenScroll='true' @scroll='scroll'>
			<div class="scrollChild" ref='scrollChild'>
				<div class="qx_item" v-for='item in qxList' @click='toSinger(item.id)'>
					<div class="qx_item_img">
						<img :src="item.avatar">
						<div class="icon"><img :src="item.famous_icon"></div>
					</div>
					<div class="qx_item_about">
						<div class="qx_item_about_info">
							<div>{{item.name}}</div>
						</div>
						<div class="qx_item_about_follow">{{item.followed_count}}人 关注</div>
					</div>
				</div>
			</div>
			<div class="loading-container" v-show='!qxList.length||waitShow'>
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
				qxList:[],
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
				if(pos.y==this.$refs.qx.clientHeight-this.$refs.scrollChild.clientHeight-120){
					this.page++;
					this.$http.get('http://localhost:3000/getQxList?page='+this.page).then(res=>{
						this.qxList.push(...res.body.lists);
					})
				}
			},
			toSinger(id){
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getStarInfo?id='+id).then(res=>{
					this.$router.push({
						path:`/famous/qx/${id}`
					});
					this.setSingerInfo(res.body);
					this.waitShow=false;
				});
			},
			...mapMutations(['setSingerInfo'])
		},
		created(){
			this.$http.get('http://localhost:3000/getQxList?page='+this.page).then(res=>{
				this.qxList=res.body.lists;
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
	.qx_scroll{
		width: 100%;
		height: calc(100% - 120px);
	}
	.qx{
		height: 100%;
		width: 100%;
	}
	.qx_item{
		width: 33.33%;
		display: inline-block;
		margin-top: 10px;
		font-size: 14px;
	}
	.qx_item_img{
		padding: 10px 10px 0 10px;
		position:relative;
	}
	.qx_item_img img{
		width: 100%;
		border-radius: 50%;
	}
	.qx_item_about_info{
		height: 25px;
	}
	.qx_item_about_info>div{
		height: 25px;
		line-height: 25px;
		text-align: center;
		font-weight: 900;
	}
	.icon{
		position: absolute;
		bottom: 0;
		right:10px;
	}
	.icon img{
		width: 20px;
		height: 20px;
	}
	.qx_item_about_follow{
		padding-left: 25px;
		font-size: 14px;
		color: #6e6e6e;
	}
</style>


































