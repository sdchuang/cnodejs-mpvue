<template>
	<div name="home">
		<div class="wrap">
			<div class="topTic">
				<div @click="tabChange(item.id)" :class="{sel:topTab==item.id}" v-for="item in topic" :key="item.id">{{item.title}}</div>
			</div>

			<swiper :current="topTab" @change="switchContent($event)" :style="{height:clientHeight + 'px'}">
				<swiper-item v-for="(list,i) in topic" :key="i" class="swip">
					<scroll-view :style="{height:clientHeight + 'px'}" scroll-y="true">
						<div @click="toDetail(item.id)" class="list" v-for="item in topicList" :key="item.id" >
							<div class="header">
								<img :src="item.author.avatar_url">
							</div>
							<div class="list-con">
								<div class="title">
									<div v-show="topTab==0 && !item.top" class="tip">{{item.tab}}</div>
									<div v-show="item.top" class="top">置顶</div>
									{{item.title}}
								</div>
								<div class="remark">
									<div class="reply">{{item.reply_count}}/{{item.visit_count}}</div>
									<div class="time">{{item.create_at}}</div>
								</div>
							</div>
						</div>
					</scroll-view>
				</swiper-item>
			</swiper>	
		</div>
	</div>	
</template>

<script>
	export default {
		name:"home",
		data(){
			return{
				topic:[
					{
						id:0,
						title:'全部',
						tab:'',
					},
					{
						id:1,
						title:'分享',
						tab:'share',
					},
					{
						id:2,
						title:'求职',
						tab:'job',
					},
					{
						id:3,
						title:'商品',
						tab:'good',
					},
					{
						id:4,
						title:'问答',
						tab:'ask',
					},
				],
				topTab:0,
				clientHeight:0,
				topicList:[],
			}
		},
		mounted(){
			this.topics();
			wx.getSystemInfo({
				success: res => {
					this.clientHeight = res.windowHeight-29;
				},
			})
		},
		computed:{
			topicLists:function(){
				return this.topicList.map(item => {
					item.create_at = this.moment(item.create_at).format('YYYY-MM-DD HH:mm:ss');
				})
			}
		},
		// onReachBottom() {
		// 	console.log('hahahhahaha');
		// 	this.loadMore();
		// },
		methods:{
			switchContent(e){
				// console.log('switch')
				console.log(e.mp.detail.current)
				this.topTab = e.mp.detail.current;
				this.topics(e.mp.detail.current);
			},
			tabChange(id){
				this.topTab = id;
				this.topics(id);
			},
			toDetail(id){
				wx.navigateTo({
					url:'../detail/main?id=' + id
				})
			},
			topics(topTab){
				var tabArr = ['','share','job','good','ask'];
				var data = {
					page:1,
					limit:10,
				}
				if(topTab) Object.assign(data,{tab:tabArr[topTab]})
				this.$store.dispatch('get',{url:'topics',params:data})
				.then(res => {
					this.topicList = [];
					this.topicList = res;
				})
			},
			loadMore(){
				this.topicList();
			}
		}
	}
</script>

<style rel="stylesheet" lang="less">
	.wrap{
		width: 100%;
		flex-direction: column;
		.topTic{
			width: 100%;
			flex-wrap: nowrap;
			justify-content: space-around;
			flex-direction: row;
			font-size: 14px;
			background-color: #f6f6f6;
			padding: 5px 0;
			align-items: center;
			// vertical-align: middle;
			div{
				padding: 2px 5px;
			}
			.sel{
				background-color: #80bd01;
				color: #fff;
				border-radius: 4px;
			}
		}
		.list{
			border-top: 1px solid #f0f0f0;
			padding: 10px 15px 10px 10px;
			flex-direction: row;
			width: 100%;
			.header{
				width: 50px;
				height: 50px;
				img{
					width: 50px;
					height: 50px;
					border-radius: 4px;
				}
			}
			.list-con{
				flex: 1;
				padding-left: 10px;
				flex-direction: column;
				justify-content: space-between;
				overflow: hidden;
				.title{
					font-size: 14px;
					// width: 200px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					.tip{
						background-color: #e5e5e5;
						font-size: 12px;
						padding: 2px 4px;
						border-radius: 4px;
						margin: 0 4px 0 0 ;
						color: #999;
					}
					.top{
						background-color: #80bd01;
						font-size: 12px;
						padding: 2px 4px;
						border-radius: 4px;
						margin: 0 4px 0 0 ;
						color: #fff;
					}
				}
				.remark{
					font-size: 12px;
					justify-content: space-between;
				}
			}
		}

	}
</style>