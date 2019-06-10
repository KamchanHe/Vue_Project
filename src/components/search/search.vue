<template>
	<div class="search" ref='search'>
		<scroll class='search_scroll' :listenScroll='true' @scroll='scroll'>
			<div class="scrollChild" ref='scrollChild'>
				<div class="search_box">
					<div class="search_box_input">
						<input type="text" placeholder="请输入..." v-model='val' @keyup.enter='chooseOk(val)'>
						<i class="fa fa-search" @click='chooseOk(val)'></i>
						<ul v-if='suggestion.length'>
							<li v-for='item in suggestion' @click='chooseThis(item)'>{{item}}</li>
						</ul>
					</div>
					<div class="search_box_show" v-if='info.length'>
						<div class="search_content_item_content" v-for='(list,index) in info' @click='daily_play(list.id,index)'>
							<div class="search_content_item_content_img">
								<img :src="list.pic">
							</div>
							<div class="search_content_item_content_name">
								<p>{{list.name}}</p>
							</div>
						</div>
					</div>
					<div class="search_box_unshow" v-if='soundCount==0'>
						<p>很抱歉，未能找到相关搜索结果！</p>
					</div>
				</div>
			</div>
			<div class="loading-container" v-show='waitShow'>
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
				suggestion:[],
				val:'',
				page:1,
				info:[],
				soundCount:1,
				waitShow:false
			}
		},
		components:{
			Scroll,
			Loading
		},
		methods:{
			chooseThis(val){
				this.waitShow=true;
				this.val=val;
				this.suggestion='';
				this.info="";
				this.$http.get('http://localhost:3000/getSearchInfo?keyword='+val+'&page='+this.page).then(res=>{
					this.waitShow=false;
					this.info=res.body.data;
					if (this.info.length==0) {
						this.soundCount=0;
					};
					if (this.info.length<20) {
						this.page++;
						this.getInfo();
					}
				})
			},
			chooseOk(val){
				if (val.trim()=="") {
					this.val="";
					return;
				};
				this.waitShow=true;
				this.suggestion='';
				this.info="";
				this.$http.get('http://localhost:3000/getSearchInfo?keyword='+val+'&page='+this.page).then(res=>{
					this.waitShow=false;
					this.info=res.body.data;
					if (this.info.length==0) {
						this.soundCount=0;
					};
					if (this.info.length<20) {
						this.page++;
						this.getInfo();
					}
				})
			},
			getInfo(){
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getSearchInfo?keyword='+this.val+'&page='+this.page).then(res=>{
					this.info.push(...res.body.data);
					this.waitShow=false;
					if (this.info.length==0) {
						this.soundCount=0;
						return;
					};
					if (this.info.length<20) {
						this.page++;
						this.getInfo();
					}
				})
			},
			scroll(pos){
				if(pos.y==this.$refs.search.clientHeight-this.$refs.scrollChild.clientHeight){
					this.waitShow=true;
					this.page++;
					this.getInfo();
				}
			},
			daily_play(id,index){
				this.waitShow=true;
				this.$http.get('http://localhost:3000/getLyric?id='+id).then(res=>{
					this.$router.push({
						path:`/search/${id}`
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

		},
		watch:{
			val(newVal){
				this.$http.get('http://localhost:3000/getSuggestion?keyword='+newVal).then(res=>{
					this.suggestion=res.body.data;
				})
			}
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
	.search{
		height: calc(100% - 60px);
	}
	.search_scroll{
		width: 100%;
		height: 100%;
	}
	.search_box{
		padding-bottom: 30px;
	}
	.search_box_input{
		width: 100%;
		height: 50px;
		margin-top: 10px;
		position: relative;
	}
	.search_box_input input{
		display:block;
		height: 40px;
		width: 70%;
		margin: 0 auto;
		outline: none;
		border: 1px solid #ccc;
		border-radius: 20px;
		padding: 0 50px 0 20px;
	}
	.search_box_input i{
		position: absolute;
		right: 6%;
		width: 30px;
		height: 40px;
		top: 0;
		line-height: 40px;
	}
	.search_box_input ul{
		width: 80%;
		margin: 0 auto;
		list-style: none;
		background: white;
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	.search_box_input ul li{
		width: 100%;
		height: 25px;
		line-height: 25px;
		color: #6e6e6e;
	}
	.search_content_item_content{
		margin: 15px 10px;
		height:70px;
		background: #e2f0f7;
		font-weight: 900;
		overflow: hidden;
	}
	.search_content_item_content_img{
		width: 70px;
		height:70px;
		float: left;
	}
	.search_content_item_content_img img{
		display: block;
		width: 100%;
		height:100%;
	}
	.search_content_item_content_name{

	}
	.search_content_item_content_name p{
		font-size: 14px;
		overflow: hidden;
		padding-left: 20px;
		line-height: 20px;
		padding-top: 5px;
	}
	.search_box_unshow{
		text-align: center;
	}
</style>





























