<template>
	<div class="loading">
		<img src="./loading.gif" height="24" width="24">
		<p class="desc">{{title}}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:{
			title:{
				type:String,
				default:'正在载入......'
			}
		},
	};
</script>

<style scoped lang="stylus">

	    .loading
	        width: 100%
	        text-align: center
	        .desc
	            line-height: 20px
	            font-size: 14px;
	            color: #72d371;
</style>