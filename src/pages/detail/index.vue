<template>
	<div name="detail">
		<div>{{query}}</div>
	</div>	
</template>

<script>
	export default {
		name:"detail",
		data(){
			return{
				query:0,
				topicId:0,
				topicData:{}
			}
		},
		mounted(){
			console.log(this.$root.$mp.query.id)
			this.topicId = this.$root.$mp.query.id;
			this.topicDetail(this.topicId);
		},
		methods:{
			topicDetail(id){
				var data = {}
				this.$store.dispatch('get',{url:'topicDetail',arg:id,params:data})
				.then(res => {
					this.topicData = res;
				})
			}
		}
	}
</script>

<style rel="stylesheet" lang="less">

</style>