const { getAppNavigater } = require('../../index');
Page({
  data() {
    return {
      viewHeight:0, // 屏幕高度
      formData:{
        name:'', 
        age:0,  // 选中的年龄
        gender:0, // 性别
        text:''
      },
      guidanceList:[], // 科室列表
      insert_id:0, //返回结果id 用作评价
      is_evaluate:false,
      is_evascucc:false,
    }
  },
  onLoad(options) {
    console.log(options)   
    let getViewportSize = my.getSystemInfoSync();
    let viewHeight = getViewportSize.windowHeight;
    let formData = this.data.formData;
    formData.name = options.name;
    formData.age = options.age;
    formData.gender = options.gender;
    formData.text = options.text;
    this.setData({
      viewHeight,

    })
    this.getGuidance();
  },
  onShow(){

  },
  // 获取科室列表
  getGuidance(){
    let that = this;
    let params = {
      name:that.data.formData.name,
      age: that.data.formData.age,
      gender: that.data.formData.gender,
      text: that.data.formData.text,
    }
    my.request({
      url: 'https://jm.jiankangche.cn/jmjk/getGuidance',
      method: 'POST',
      data: params,
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.setData({
          guidanceList: res.data.department,
          insert_id: res.data.insert_id
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })

  },
  // 点击去评价
  clickpingjia(){
    this.setData({
      is_evaluate: true
    })
  },
  // 点击评价弹窗背景
  clickmarsk(){
    this.setData({
      is_evaluate: false
    })
  },
  // 点击满意不满按钮
  clicksatisfy(e){
    let that = this;
    let num = Number(e.currentTarget.dataset.num);
    let insert_id = that.data.insert_id;
    let params = {
      insert_id,
      evaluate: num,
    }
    my.request({
      url: 'https://jm.jiankangche.cn/jmjk/evaluate',
      method: 'POST',
      data: params,
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        if(res.data.result == true){
          that.setData({
            is_evaluate: false,
            is_evascucc: true,
          })
          setTimeout(function(){
            that.setData({
              is_evascucc: false
            })
          },2000)
        }
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },
  // 点击科室挂号
  navigateToRegistered(e){
    let url = e.currentTarget.dataset.url;
    let id = e.currentTarget.dataset.id;
    // 跳转宿主小程序
    // const appNavigater = getAppNavigater();
    // appNavigater({
    //   url: '',
    // });

    // 跳转至其它小程序页面
    const appIdRes = my.getParentAppIdSync();
    let data = 'test';
    my.navigateToMiniProgram({
      appId: appIdRes,  // 宿主appid
      path: '',
      extraData: {
        data1: data,
      },
      success: (res) => {
        console.log(JSON.stringify(res));
      },
      fail: (res) => {
        console.log(JSON.stringify(res));
      },
    });
    return
  }
});
