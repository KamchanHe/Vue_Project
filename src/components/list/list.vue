<template>
	<transition name='slide'>
		<div class="list" ref='list'>
			<scroll class='list_scroll' v-if='show' :listenScroll='true' @scroll='scroll'>
				<div ref='scrollChild'>
					<div class="list_box">
						<i class="fa fa-chevron-left back" @click='back'></i>
						<div class="list_box_header">
							<h3>{{show&&list.channel.name}}</h3>
							<div class="list_box_header_img">
								<img :src="show&&list.channel.pic">
							</div>
							<div class="list_box_header_about">
								<ul>
									<li>
										<i class="fa fa-music"></i>
										<span>{{Number(list.channel.sound_count/1000).toFixed(1)}}万</span>
									</li>
									<li>
										<i class="fa fa-user"></i>
										<span>{{Number(list.channel.follow_count/1000).toFixed(1)}}万</span>
									</li>
									<li>
										<i class="fa fa-share"></i>
										<span>{{Number(list.channel.share_count/1000).toFixed(1)}}万</span>
									</li>
								</ul>
								<p>频道简介</p>
								<p>{{list.channel.info}}</p>
							</div>
						</div>
						<div class="list_box_content">
							<div class="list_content_item_content" v-for='(list,index) in list.sounds' @click='daily_play(list.id,index)'>
								<div class="list_content_item_content_img">
									<img :src="list.pic">
								</div>
								<div class="list_content_item_content_name">
									<p>{{list.name}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroll>
			<div class="loading-container" v-show='!show||waitShow'>
				<loading></loading>
			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import Scroll from '../../base/scroll/scroll.vue';
	import Loading from '../../base/loading/loading.vue';
	import {mapMutations} from 'vuex';
	export default{
		data(){
			return{
				list:[],
				show:false,
				page:1,
				order:'hot',
				waitShow:false,
				id:''
			}
		},
		props:{

		},
		components:{
			Scroll,
			Loading
		},
		methods:{
			back(){
                this.$router.back();
            },
            daily_play(id,index){
            	this.waitShow=true;
            	this.$http.get('http://localhost:3000/getLyric?id='+id).then(res=>{
            		this.$router.push({
            			path:`/channel/list/${this.id}/${id}`
            		});
            		this.setSongInfo(res.body);
            		this.waitShow=false;
            	});
            },
            scroll(pos){
            	if(pos.y==this.$refs.list.clientHeight-this.$refs.scrollChild.clientHeight){
            		this.waitShow=true;
            		this.page++;
            		this.$http.get('http://localhost:3000/getIndexChannelList?id='+this.id+'&order='+this.order+'&page='+this.page).then(res=>{
            			this.list.sounds.push(...res.body.sounds);
            			this.show=true;
            			this.waitShow=false;
            		});
            	}
            },
            ...mapMutations(['setSongInfo'])
        },
        created(){
        	this.id=this.$route.params.listid;
			this.$http.get('http://localhost:3000/getIndexChannelList?id='+this.id+'&order='+this.order+'&page='+this.page).then(res=>{
				this.list=res.body;
				this.show=true;
			});
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
	.list_scroll{
		width: 100%;
		height: 100%;
	}
	.list{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: white;
		z-index:10;
	}
	.back{
		position: absolute;
		top: 10px;
		left: 5px;
		font-size: 30px;
	}
	.slide-enter-active,.slide-leave-active{
		transition:all 0.3s
	}
	.slide-enter,.slide-leave-to{
		transform:translateX(100%)
	}
	.list_box{
		width: 100%;
		height: 100%;
	}
	.list_box_header h3{
		text-align: center;
		padding: 0 30px;
		line-height: 50px;
		height: 50px;
	}
	.list_box_header_img{
		width: 100%;
		height: 100%;
		// padding: 0  10px;
	}
	.list_box_header_img img{
		width: 100%;
	}
	.list_box_header_about{
		height: 120px;
	}
	.list_box_header_about ul{
		height:30px;
	}
	.list_box_header_about li{
		list-style: none;
		float: left;
		width: 30%;
		text-align: center;
		color: #6b6b6b;
	}
	.list_box_header_about li i{
		margin-right: 5px;
	}
	.list_box_header_about p:nth-child(2){
		font-size: 20px;
		padding-left: 10px;
		color: #6b6b6b;
	}
	.list_box_header_about p:nth-child(3){
		padding:0 20px;
		color: #6b6b6b;
	}
	.list_content_item_content{
		margin: 15px 10px;
		height:70px;
		background: #e2f0f7;
		font-weight: 900;
		overflow: hidden;
	}
	.list_content_item_content_img{
		width: 70px;
		height:70px;
		float: left;
	}
	.list_content_item_content_img img{
		display: block;
		width: 100%;
		height:100%;
	}
	.list_content_item_content_name{

	}
	.list_content_item_content_name p{
		font-size: 14px;
		overflow: hidden;
		padding-left: 20px;
		line-height: 20px;
		padding-top: 5px;
	}
</style>






























































