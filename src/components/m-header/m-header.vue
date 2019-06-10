<template>
	<div class="header">
		<router-link class="header_item" to="/home">
			<span class="header_link">首页</span>
		</router-link>
		<router-link class="header_item" to="/channel">
			<span class="header_link">频道</span>
		</router-link>
		<router-link class="header_item" to="/famous">
			<span class="header_link">名人</span>
		</router-link>
		<router-link class="header_item" to="/search">
			<span class="header_link">搜索</span>
		</router-link>
	</div>
</template>

<script type="text/javascript">
	
</script>

<style scoped lang="stylus">
	.header{
		width: 100%;
		height: 60px;
		line-height: 60px;
		position: relative;
		z-index: 10;
		background: white;
	}
	.header_item{
		float: left;
		width:25%;
		text-decoration: none;
		color: #808080;
		font-weight: 400;
		font-size: 16px;
		text-align: center;
		overflow: hidden;
	}
	.header_item:hover{
		color: #72d371;
	}
	.header_link{
		padding: 10px 20px;
	}
	.router-link-active>.header_link{
		border-bottom: 5px solid #72d371;
	}
</style>




























































