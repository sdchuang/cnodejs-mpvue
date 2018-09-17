<template>
	<div name="detail">
		<div class="wrap">
			<div class="top"></div>
			<div class="foot">
				<div class="avatar" @click="scan()">
					<img :src="avat">
				</div>
				<div class="log-info">
					<div v-show="!login" class="tip">请点击头像登陆</div>
					<div v-show="login" class="log-name">{{loginName}}</div>
					<div v-show="login" class="log-name">积分:{{score}}</div>
				</div>
				<div class="lists">
					<div class="list" @click="toMyTopic('create')">最近创建话题</div>
					<div class="list" @click="toMyTopic('join')">最近参与话题</div>
					<div class="list" @click="toMyTopic('collect')">收藏的话题</div>
				</div>
				<div class="lists">
					<div class="list" @click="toAbout">关于</div>
				</div>
				<div class="lists">
					 <span></span>
					<div @click="logout()" class="list">注销</div>
				</div>
				
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
		name:"detail",
		data(){
			return{
				query:0,
				avat:'',
				loginName:'',
				login:false,
				score:0,
			}
		},
		mounted(){
			if(wx.getStorageSync('userInfo')){
				let userInfo = wx.getStorageSync('userInfo');
				this.avat = userInfo.avatar_url;
				this.loginName = userInfo.loginname;
				this.login = true;
				this.userInfo();
			}
		},
		methods:{
			scan(){
				wx.scanCode({
					success:res => {
						wx.setStorageSync('accesstoken', res.result)
						var data = {accesstoken:res.result}
						this.$store.dispatch('post',{url:'accesstoken',data})
						.then(res => {
							this.avat = res.data.avatar_url;
							this.loginName = res.data.loginname;
							this.login = true;
							wx.setStorageSync('userInfo', res.data)
							this.userInfo();
						})
					}
				})
			},
			userInfo(){
				this.$store.dispatch('get',{url:'user',arg:this.loginName,params:{}})
				.then(res => {
					console.log(res);
					this.score = res.score;
				})
			},
			logout(){
				this.avat = '';
				this.login = false;
				wx.clearStorage();
			},
			toMyTopic(type){
				wx.navigateTo({
					url:'../myTopic/main?type=' + type
				})
			},
			toAbout(){
				wx.navigateTo({
					url:'../about/main'
				})
			},
		}
	}
</script>

<style rel="stylesheet" lang="less">
	.wrap{
		width: 100%;
		flex-direction: column;
		background-color: #edece8;
		position: absolute;
		top: 0;
		bottom: 0;
		.top{
			width: 100%;
			background-color: #3e97f5;
			height: 80px;
		}
		.foot{
			align-items: center;
			flex-direction: column;
			.avatar{
				width: 80px;
				height: 80px;
				border-radius: 50%;
				border: 1px solid #a9b7b7;
				transform: translateY(-50%);
				background-color: #fff;
				img{
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}
			}
			.log-info{
				margin-top: -30px;
				flex-direction: column;
				align-items: center;
				.tip,.log-name{
					font-size: 12px;
					color: #a9b7b7;
					margin: 5px 0;
					span{
						padding-left: 10px;
					}
				}
			}
			.lists{
				width: 100%;
				margin-top: 20px;
				flex-direction: column;
				justify-content: flex-start;
				.list{
					padding: 10px 20px;
					font-size: 14px;
					border: 1px solid #f7f7f7;
					background-color: #fff;
				}
			}
			
		}
	}
</style>