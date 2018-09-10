<template>
	<div name="detail">
		<div class="wrap">
			<div class="art-user">
				<div class="avatar">
					<img :src="topicData.author && topicData.author.avatar_url">
				</div>
				<div class="info">
					<div class="user">{{topicData.author && topicData.author.loginname}}</div>
					<div class="remark">
						<div>{{topicData.create_at}}</div>
						<div>{{topicData.visit_count}}次浏览</div>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="title">{{topicData.title}}</div>
				<!-- <div class="article"> -->
					<wxParse :content="topicData.content" />
				<!-- </div> -->
			</div>
			<div class="reply">
				<div class="reply-tol">{{topicData.reply_count}}回复</div>
				<div class="reply-item" v-for="item in replyData" :key="item.id">
					<div class="user-title">
						<div class="avatar">
							<img :src="item.author && item.author.avatar_url">
						</div>
						<div class="info">
							<div class="user">{{item.author && item.author.loginname}}</div>
							<div class="remark">赞{{item.ups.length}}</div>
						</div>
					</div>
					<div class="reply-con">
						<wxParse :content="item.content" />
					</div>
					<div class="reply-time">{{item.create_at}}</div>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
	import wxParse from 'mpvue-wxparse'
	export default {
		name:"detail",
		data(){
			return{
				query:0,
				topicId:0,
				topicData:{},
				replyData:[],
				article: '<div>我是HTML代码</div>'
			}
		},
		components:{
			wxParse
		},
		mounted(){
			// console.log(this.$root.$mp.query.id)
			this.topicId = this.$root.$mp.query.id;
			this.topicDetail(this.topicId);
		},
		methods:{
			topicDetail(id){
				var data = {}
				this.$store.dispatch('get',{url:'topicDetail',arg:id,params:data})
				.then(res => {
					this.topicData = res;
					this.replyData = res.replies;
				})
			}
		}
	}
</script>

<style rel="stylesheet" lang="less">
	@import url("~mpvue-wxparse/src/wxParse.css");
	.wrap{
		width: 100%;
		flex-direction: column;
		padding: 10px;
		.art-user{
			.avatar{
				margin-right: 10px;
				img{
					width: 40px;
					height: 40px;
					border-radius: 4px;
				}
			}
			.info{
				flex-direction: column;
				justify-content: space-between;
				width: 100%;
				.user{
					font-size: 14px;
					font-weight: 800;
				}
				.remark{
					font-size: 12px;
					justify-content: space-between;
				}
			}
		}
		.content{
			flex-direction: column;
			width: 100%;
			.title{
				margin: 15px 0;
				font-size: 18px;
				font-weight: 800;
			}
		}
		.reply{
			flex-direction: column;
			.reply-tol{
				font-size: 12px;
				background-color: #f6f6f6;
				border-radius: 6px 6px 0 0;
				padding: 5px 0 5px 10px;
				color: #666;
			}
			.reply-item{
				border-top: 1px solid #f0f0f0;
				flex-direction: column;
				padding: 10px 0;
				.user-title{
					.avatar{
						margin-right: 10px;
						img{
							width: 20px;
							height: 20px;
							border-radius: 4px;
						}
					}
					.info{
						justify-content: space-between;
						width: 100%;
						.user{
							font-size: 14px;
							font-weight: 800;
						}
						.remark{
							font-size: 12px;
						}
					}
				}
				.reply-con{
					padding-left: 30px;
				}
				.reply-time{
					justify-content: flex-end;
					font-size: 12px;
				}
			}
		}
	}
</style>