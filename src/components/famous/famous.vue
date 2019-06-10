<template>
	<div class="famous">
		<div class="fanous_header">
			<router-link class="header_item" to="/famous/mr">
				<span class="header_link">Fox名人</span>
			</router-link>
			<router-link class="header_item" to="/famous/qx">
				<span class="header_link">Fox群星</span>
			</router-link>
			<router-link class="header_item" to="/famous/xrz">
				<span class="header_link">新入驻</span>
			</router-link>
			<router-link class="header_item" to="/famous/tj">
				<span class="header_link">Fox推荐</span>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	
</script>

<style scoped lang="stylus">
	.fanous_header{
		padding-top: 10px;
		width: 100%;
		height: 40px;
		position: relative;
		background: white;
		z-index: 10;
	}
	.header_item{
		display: inline-block;
		width: calc(25% - 14px);
		text-align: center;
		line-height: 30px;
		height: 30px;
		text-decoration: none;
		color: skyblue;
		border:2px solid skyblue;
		border-radius: 20px;
		margin: 0 5px;
	}
	.router-link-active{
		background:#72d371;
		color: black;
		font-weight: 900;
	}
	.famous{
		height: 100%;
	}
</style>






















