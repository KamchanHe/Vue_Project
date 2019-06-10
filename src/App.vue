<template>
	<div id="app">
		<m-header></m-header>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import MHeader from './components/m-header/m-header.vue';
	export default {
		components:{
			MHeader,
		}
  	};
</script>

<style lang="stylus">
	#app{
		height: 100%;
	}
</style>
