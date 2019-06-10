<template>
	<div class="mr" ref='mr'>
		<scroll class='mr_scroll' :listenScroll='true' @scroll='scroll'>
			<div class="scrollChild" ref='scrollChild'>
				<div class="mr_item" v-for='item in mrList' @click='toSinger(item.id)'>
					<div class="mr_item_img">
						<img :src="item.avatar">
					</div>
					<div class="mr_item_about">
						<div class="mr_item_about_info">
							<div>{{item.name}}</div>
							<div><img :src="item.famous_icon"></div>
						</div>
						<div class="mr_item_about_follow">{{item.followed_count}}人 关注</div>
					</div>
				</div>
			</div>
		</scroll>
		<div class="loading-container" v-show='!mrList.length||waitShow'>
			<loading></loading>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import Scroll from '../../base/scroll/scroll.vue';
	import Loading from '../../base/loading/loading.vue';
	import {mapMutations} from 'vuex';
	export default{
		data(){
			return {
				mrList:[],
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
				if(pos.y>130&&this.refresh){
					this.refresh=false;
					this.$http.get('http://localhost:3000/getMrList?limit='+this.limit).then(res=>{
						this.mrList=res.body.lists;
						setTimeout(()=>{
							this.refresh=true;
						},3000)
					})
				}
			},
			toSinger(id){
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getStarInfo?id='+id).then(res=>{
					this.$router.push({
						path:`/famous/mr/${id}`
					});
					this.setSingerInfo(res.body);
					this.waitShow=false;
				});
			},
			...mapMutations(['setSingerInfo'])
		},
		created(){
			this.$http.get('http://localhost:3000/getMrList?limit='+this.limit).then(res=>{
				this.mrList=res.body.lists;
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
	.mr_scroll{
		width: 100%;
		height: calc(100% - 120px);
	}
	.mr{
		height: 100%;
		width: 100%;
	}
	.mr_item{
		width: 50%;
		display: inline-block;
		margin-top: 10px;
	}
	.mr_item_img{
		padding: 10px 10px 0 10px;
	}
	.mr_item_img img{
		width: 100%;
		border-radius: 20%;
	}
	.mr_item_about_info{
		height: 25px;
	}
	.mr_item_about_info>div{
		float: left;
		height: 25px;
		line-height: 25px;
		margin: 0 5px;
		text-align: center;
		font-weight: 900;
	}
	.mr_item_about_info>div:nth-child(1){
		padding-left: 20px;
	}
	.mr_item_about_info>div:nth-child(2){
		width: 20px;
		height: 20px;
	}
	.mr_item_about_info>div:nth-child(2) img{
		width: 100%;
	}
	.mr_item_about_follow{
		padding-left: 25px;
		font-size: 14px;
		color: #6e6e6e;
	}
</style>


































