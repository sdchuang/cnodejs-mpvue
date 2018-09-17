<template>
  <div class="wrap">
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
    <div v-show="empty" class="empty">
      暂无
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      topicList:[],
      type:'',
      empty:false,
    }
  },
  mounted(){
    this.type = this.$root.$mp.query.type;
    if(this.type=='collect'){
      this.collect();
    }else{
      this.userInfo();
    }
  },
  methods:{
    toDetail(id){
      wx.navigateTo({
        url:'../detail/main?id=' + id
      })
    },
    userInfo(){
      this.$store.dispatch('get',{url:'user',arg:wx.getStorageSync('userInfo').loginname,params:{}})
      .then(res => {
        console.log('res',res);
        if(this.type=='create') this.topicList = res.recent_topics;
        else this.topicList = res.recent_replies;
        if (this.topicList.length==0) this.empty = true;
      })
    },
    collect(){
      this.$store.dispatch('get',{url:'collect',arg:wx.getStorageSync('userInfo').loginname,params:{}})
      .then(res => {
        console.log(res);
        this.topicList = res;
        if (this.topicList.length==0) this.empty = true;
      })
    },
  },
}
</script>
<style scoped lang="less">
  .wrap{
    width: 100%;
    flex-direction: column;
    .empty{
      padding: 20px;
      font-size: 16px;
      justify-content: center;
      align-items: center;
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