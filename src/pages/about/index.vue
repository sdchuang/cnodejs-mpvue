<template>
  <div class="wrap">
    <scroll-view scroll-y="true" @scrolltolower="pullUpLoad">
      <div @click="toDetail(item.id)" class="list" v-for="item in topicList" :key="item.id" >
        <div class="header">
          <img :src="item.author && item.author.avatar_url">
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
  </div>
</template>

<script>
export default {
  data(){
    return {
      clientHeight:0,
      topicList:[],
      page:0,
    }
  },
  mounted(){
    this.topics();
    wx.getSystemInfo({
      success: res => {
        this.clientHeight = res.windowHeight;
      },
    })
  },
  onReachBottom() {
    this.page += 1;
    var data = {
      page:this.page+1,
      limit:10,
    }
    this.$store.dispatch('get',{url:'topics',params:data})
    .then(res => {
      this.topicList = this.topicList.concat(res);
    })
    console.log('searchScrollLower')
  },
  onPullDownRefresh() {
    this.page = 0;
    this.topics();
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },2000);
  },
  methods:{
    topics(topTab){
      var data = {
        page:1,
        limit:10,
      }
      if(topTab) Object.assign(data,{tab:''})
      this.$store.dispatch('get',{url:'topics',params:data})
      .then(res => {
        this.topicList = [];
        this.topicList = res;
      })
    },
  },
}
</script>
<style scoped lang="less">
  .wrap{
    width: 100%;
    flex-direction: column;
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