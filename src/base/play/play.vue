<template>
	<transition name='slide'>
		<div class="play">
			<scroll class='play_scroll'>
				<div>
					<div class="play_box">
						<i class="fa fa-chevron-left back" @click='back'></i>
						<div class="play_box_head">
							<div class="play_box_head_user">
								<div class="play_box_head_user_avatar">
									<div><img :src="songInfo.user.avatar"></div>
									<div>{{songInfo.user.name}}</div>
								</div>
								<div class="play_box_head_user_fans">
									<span>fans</span>
									<span>{{getFans}}</span>
								</div>
							</div>
						</div>
						<div class="play_box_content">
							<img :src="songInfo.pic">
							<div class="play_box_content_audio">
								<div class="play_box_content_audio_icon">
									<i :class="['fa',{'fa-pause-circle':isPlay,'fa-play-circle':!isPlay}]" @click='audio_play'></i>
								</div>
								<div class="play_box_content_audio_about">
									<p>{{songInfo.name}}</p>
									<p>
										<span>{{songInfo.user.name}}</span>
										<span> Published on </span>
										<span>{{songInfo.channel.name}}</span>
									</p>
								</div>
								<audio id="audio" ref='audio' :src='songInfo.source' @timeupdate='updateTime' @ended='end'></audio>
							</div>
						</div>
						<div class="play_box_content_audio_progress">
							<div class="play_box_content_audio_progress_content" @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' ref='progress'>
								<div class="play_box_content_audio_progress_conten_before" ref='control_boll'></div>
								<div class="play_box_content_audio_progress_conten_after" ref='control_width'></div>
							</div>
							<div class="play_box_content_audio_progress_time">
								<span>{{getPlayTime}}</span>
								<span>{{getDuration}}</span>
							</div>
						</div>
						<div class="comments">
							<div class="comments_plays">
								<i class="fa  fa-play-circle-o"></i>
								<span> {{songInfo.view_count}} </span>
								<span>Plays+</span>
							</div>
							<div class="comments_likes">
								<i class="fa fa-heart-o"></i>
								<span> {{songInfo.like_count}} </span>
								<span>Likes+</span>
							</div>
						</div>
						<div class="tags">
							<span v-for='item in songInfo.tags'>{{item.name}}</span>
						</div>
						<div class="lyric">
							<p v-for='item in lyric'>
								{{item}}
							</p>
						</div>
						<div class="commend">
							<div v-for='item in comments'>
								<div class="commend_avatar">
									<img :src="item.user.avatar">
								</div>
								<div class="commend_about">
									<div class="commend_about_name">{{item.user.name}}</div>
									<div class="commend_about_time">{{getTime(item.create_time)}}</div>
									<div class="commend_about_say">{{item.content}}</div>
								</div>
								<div class="comment_active">
									<i class="fa fa-heart-o"></i>
									<span>{{item.like}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroll>
		</div>
	</transition>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex';
	import Scroll from '../../base/scroll/scroll.vue';
	export default{
		data(){
			return{
				id:0,
				songInfo:[],
				flag:false,
				isPlay:false,
				playTime:0,
				songLength:0,
				isMove:false,
				comments:[],
				lyric:[]
			}
		},
		props:{

		},
		components:{
			Scroll
		},
		methods:{
			back(){
				this.$refs.audio.pause();
                this.$router.back();
            },
            audio_play(){
            	if (!this.isPlay) {
            		this.$refs.audio.play();
            		this.isPlay=true;
            	}
            	else{
            		this.$refs.audio.pause();
            		this.isPlay=false;
            	}
            },
            updateTime(e){
				if (!this.isMove) {
					this.playTime=Math.floor(e.target.currentTime);
					this.$refs.control_boll.style.left=(this.playTime/this.songLength)*(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth)+'px';
					this.$refs.control_width.style.width=(this.playTime/this.songLength)*(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth)+'px';
				}
			},
			end(){
				this.$refs.audio.currentTime=0;
				this.isPlay=false;
			},
			touchstart(e){
				let target=e.touches[0].clientX-this.$refs.progress.offsetLeft-this.$refs.control_boll.clientWidth/2;
				if (target<0) {target=0};
				if (target>(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth/2)) {target=(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth)};
				let percent=target/(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth);
				this.playTime=Math.floor(this.songLength*percent);
				this.$refs.audio.currentTime=this.playTime;
				this.$refs.control_width.style.width=target+'px';
			},
			touchmove(e){
				this.isMove=true;
				let moveX=e.touches[0].clientX-this.$refs.progress.offsetLeft-this.$refs.control_boll.clientWidth/2;
				if (moveX<=0) {moveX=0};
				if (moveX>this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth) {
					moveX=this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth
				};
				let percent=moveX/(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth);
				this.playTime=Math.floor(this.songLength*percent);
				let bollLeft=percent*(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth);
				if (bollLeft<=0) {bollLeft=0};
				if (bollLeft>this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth) {
					bollLeft=this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth
				};
				this.$refs.control_boll.style.left=percent*(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth)+'px';
				this.$refs.control_width.style.width=percent*(this.$refs.progress.clientWidth-this.$refs.control_boll.clientWidth)+'px'

			},
			touchend(e){
				this.$refs.audio.currentTime=this.playTime;
				this.isMove=false;
			},
            ...mapGetters(['getSongInfo'])
		},
		computed:{
			getDuration(){
				let minutes=Math.floor(this.songLength/60>1?this.songLength/60:0);
				let seconds=this.songLength%60;
				minutes=minutes>9?minutes:'0'+minutes;
				seconds=seconds>9?seconds:'0'+seconds;
				return minutes+':'+seconds
			},
			getPlayTime(){
				let minutes=Math.floor(this.playTime/60>1?this.playTime/60:0);
				let seconds=this.playTime%60;
				minutes=minutes>9?minutes:'0'+minutes;
				seconds=seconds>9?seconds:'0'+seconds;
				return minutes+':'+seconds
			},
			getFans(){
				let fans=this.songInfo.user.followed_count;
				if (fans>=10000) {
					return Number(fans/10000).toFixed(1)+'万'
				};
				return fans
			},
			getTime(){
				return (time)=>{
					return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
				}
			},
		},
		created(){
			this.id=this.$route.params.id;
			this.songInfo=this.getSongInfo().info;
			this.songLength=this.songInfo.length;
			this.lyric=this.songInfo.info.split("\r\n");
			this.comments=this.getSongInfo().comments;
		},
		mounted(){
			
		}
	};
</script>

<style scoped lang="stylus">
	.play_scroll{
		width: 100%;
		height: 100%;
	}
	#audio{
		width: 100%;
		height: 20px
	}
	.audio_box{
		position: relative;
	}
	.play{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 100;
		background: white;
	}
	.back{
		position: absolute;
		top: 30px;
		left: 10px;
		font-size: 30px;
	}
	.slide-enter-active,.slide-leave-active{
		transition:all 0.3s
	}
	.slide-enter,.slide-leave-to{
		transform:translateX(100%)
	}
	.play_box{
		width: 100%;
		height: 100%;
	}
	.play_box_head{
		height: 50px;
		padding: 20px 20px 15px 50px;
	}
	.play_box_head_user_avatar img{
		width: 50px;
		height: 50px;
		border-radius: 50px;
	}
	.play_box_head_user_avatar>div:nth-child(1){
		float: left;
	}
	.play_box_head_user_avatar>div:nth-child(2){
		float: left;
		margin-left: 10px;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		font-weight: 900;
		color: #a1a7af;
	}
	.play_box_head_user_fans{
		float: right;
		height: 50px;
		line-height: 50px;
	}
	.play_box_head_user_fans span:nth-child(1){
		margin-right: 5px;
		color: #a1a7af;
		font-weight: 500;
	}
	.play_box_head_user_fans span:nth-child(2){
		color: #72d371;
		font-weight: 900;
	}
	.play_box_content{
		position:relative;
	}
	.play_box_content img{
		width: 100%;
	}
	.play_box_content_audio{
		position: absolute;
		width: 100%;
		bottom: 5px;
		left:0;
		height: 80px;
		color: white;
		font-weight: 900;
		font-size: 18px;
		background: rgba(0,0,0,.4)
	}
	.play_box_content_audio>div:nth-child(1){
		width: 15%;
		float: left;
	}
	.play_box_content_audio>div:nth-child(2){
		width: 85%;
		float: left;
	}
	.play_box_content_audio_about p{
		width:95%;
		margin: 10px 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
		padding-right: 30px;
		font-size: 16px;
		padding-left: 10px;
	}
	.play_box_content_audio_icon{
		font-size: 45px;
		text-align: center;
		line-height: 80px;
		color: #72d371;
	}
	.play_box_content_audio_about p span:nth-child(1),.play_box_content_audio_about p span:nth-child(3){
		color: #72d371;
	}
	.play_box_content_audio_progress{
		height: 40px;
		border-bottom: 1px solid #ccc;
	}
	.play_box_content_audio_progress_content{
		width: 80%;
		margin: 5px auto;
		height: 3px;
		background: #ccc;
		position: relative;
	}
	.play_box_content_audio_progress_conten_before{
		width: 6px;
		height: 6px;
		border-radius: 3px;
		background: black;
		position: absolute;
		top: -1.5px;
		left:0;
	}
	.play_box_content_audio_progress_conten_after{
		width: 0px;
		height: 3px;
		position: absolute;
		top: 0;
		left:0;
		background: black;
	}
	.play_box_content_audio_progress_time{
		width: 80%;
		margin: 0 auto;
	}
	.play_box_content_audio_progress_time span:nth-child(1){
		float: left;
	}
	.play_box_content_audio_progress_time span:nth-child(2){
		float: right;
	}
	.comments{
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #ccc;
		font-size: 12px;
	}
	.comments>div{
		float: left;
		width: 50%;
		text-align: center;
		line-height: 40px;
	}
	.comments>div i{
		color: #ccc;
	}
	.comments>div span:nth-child(2){
		color: #666666;
	}
	.comments>div span:nth-child(3){
		color: #ccc;
	}
	.tags{
		border-bottom: 1px solid #ccc;
		padding: 10px;
	}
	.tags span{
		display:inline-block;
		border: 1px solid #72d371;
		margin:3px 3px;
		padding: 3px 10px;
		font-size: 12px;
		font-weight: 300;
		border-radius: 10px;
	}
	.lyric{
		border-bottom: 1px solid #ccc;
	}
	.lyric p{
		margin: 0;
		padding: 0px 20px 0 20px;
		font-size: 14px;
		min-height: 20px;
		font-weight: 300;
	}
	.lyric p:nth-child(1){
		margin-top: 20px;
	}
	.commend{
		margin-top: 30px;
	}
	.commend>div{
		width: 100%;
		margin: 20px 0;
		min-height: 50px;
		position: relative;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20px;
	}
	.commend div{
		height: 100%;
		display: inline-block;
	}
	.commend_avatar{
		width: 50px;
		height: 100%;
		border-radius: 25px;
		padding: 0 10px;
		position: absolute;
		top: 0;
	}
	.commend_avatar img{
		display: block;
		width: 100%;
		border-radius: 25px;
	}
	.commend_about{
		width: calc(100% - 140px);
		font-size: 14px;
		margin-left: 70px;
	}
	.commend_about_name,.commend_about_time{
		font-weight: 300;
		margin: 0 5px;
	}
	.comment_active{
		position: absolute;
		bottom: 0;
		right: 20px;
	}
	.comment_active i{
		margin-right: 5px;
	}
	.commend .commend_about_say{
		display: block;
	}
</style>









































