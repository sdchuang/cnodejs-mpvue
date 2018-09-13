<template>
  <div class="wrap">
    <div class="title">标题：</div>
    <div class="in-wrap">
      <input type="text" v-model="title" placeholder="请输入标题">
    </div>
    <div class="title">内容：</div>
    <div class="in-wrap">
      <textarea v-model="content" id="" cols="30" rows="10" placeholder="请输入内容。。。"></textarea>
    </div>
    <div class="title">主题：</div>
    <div class="in-wrap">
      <picker @change="bindPickerChange" :value="index" :range="array" :range-key="'name'">
        <div class="picker">
          {{array[index].name}}
        </div>
      </picker>
    </div>
    <div class="btn">
      <button type="primary" @click="putout()">发帖</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title:'',
      content:'',
      index:3,
      array:[
        {
          id:'ask',
          name:'问答',
        },
        {
          id:'share',
          name:'分享',
        },
        {
          id:'job',
          name:'招聘',
        },
        {
          id:'dev',
          name:'测试',
        }
      ]
    }
  },
  mounted(){},
  methods:{
    bindPickerChange(e){
      console.log(e)
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.index = e.mp.detail.value;
    },
    putout(){
      if(!wx.getStorageSync('accesstoken')){
        wx.showToast({
          title: '请先登陆',
          icon: 'error',
          duration: 2000
        })
        return;
      }
      var data = {
        accesstoken:wx.getStorageSync('accesstoken'),
        title:this.title,
        content:this.content,
        tab:this.array[this.index].id
      }
      console.log(data)
      this.$store.dispatch('post',{url:'putTopics',data})
      .then(res => {
        console.log(res);
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
      })
    }
  },
}
</script>
<style scoped lang="less">
  .wrap{
    width: 100%;
    padding: 10px 0;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #f7f7f7;
    flex-direction: column;
    .title{
      font-size: 14px;
      padding-left: 15px;
      margin: 10px 0;
    }
    .in-wrap{
      font-size: 16px;
      background-color: #fff;
      input{
        height: 36px;
        padding-left: 15px;
      }
      textarea{
        padding-left: 15px;
      }
      picker{
        width: 100%;
        padding-left: 15px;
        line-height: 36px;
        height: 36px;
      }
    }
    .btn{
      justify-content: center;
      button{
        width: 90%;
        margin: 20px 0;
      }
    }
  }
</style>