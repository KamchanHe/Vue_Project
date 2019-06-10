<template>
	<div ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll';
	export default {
		data(){
			return {

			}
		},
		props:{
			click:{
				type:Boolean,
				default:true
			},
			probeType:{
				type:Number,
				default:3
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			data:{
				type:Array,
				default:null
			},
			stopPropagation:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			_initScroll(){
				if (!this.$refs.wrapper) {
					return;
				}
				this.scroll=new BScroll(this.$refs.wrapper,{
					click:this.click,
					probeType:this.probeType,
					listenScroll:this.listenScroll,
					stopPropagation:this.stopPropagation
				});
				if (this.listenScroll) {
					this.scroll.on('scroll',(pos)=>{
						this.$emit('scroll',pos)
					});
					this.scroll.on('scrollEnd',(pos)=>{
						this.$emit('scrollEnd',pos)
					})
				}
			},
			refresh(){
				this.scroll&&this.scroll.refresh();
			},
			scrollTo(){
				this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement(){
				this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this._initScroll();
			})
		},
		watch:{
			data(){
				this.$nextTick(()=>{
					this.refresh();
				})
			}
		}
	};
</script>

<style scoped lang="stylus">
	
</style>

































