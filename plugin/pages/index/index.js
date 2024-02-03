Page({
  data(){
    return {
      viewHeight:'', // 屏幕高度
      input_text:'', // 输入症状
      curTime:'', //当前时间
      QAList:[],
      is_input: true, // 初始输入框
      is_age: false,
      is_gender:false,
      is_symptom: false,
      infoBtnList:[], // 下方按钮列表
      formData:{
        input_text:'', // 输入框输入的信息
        age:0,  // 选中的年龄
        gender:0 // 性别
      },
      infoConfig:{},
      symptomList:[],
      is_click:-1,
      is_support: true
    }
  },
  onLoad(query) {
    // 页面加载
    console.info(JSON.stringify(query));
    let getViewportSize = my.getSystemInfoSync();
    let viewHeight = getViewportSize.windowHeight;
    this.setData({
      viewHeight: Number(viewHeight - 100) 
    })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this.setData({
      QAList:[],
      input_text:'', // 输入症状
      curTime:'', //当前时间
      is_input: true, // 初始输入框
      is_age: false,
      is_gender:false,
      is_symptom: false,
      infoBtnList:[], // 下方按钮列表
      formData:{
        input_text:'', // 输入框输入的信息
        age:0,  // 选中的年龄
        gender:0 // 性别
      },
      infoConfig:{},
      symptomList:[],
      is_click:-1,
      is_support: true
    })
    let QAList = this.data.QAList;
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    QAList.push({
      type:1,
      text:'请问您有什么不适症状？',
      time: this.data.curTime
    })
    this.setData({
      QAList,
    })
    this.getConfig();
  },

  //  初始数据
  getConfig(){
    let that = this;
    my.request({
      url: 'https://jm.jiankangche.cn/jmjk/getConfig',
      method: 'POST',
      data: {},
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        that.setData({
          infoConfig: res.data,
        })
      },
      fail: function(res) {
      },
    })
  },
    /**
     * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
    */
  getCurrentTime(){
    var date = new Date();//当前时间
    var month = this.zeroFill(date.getMonth() + 1);//月
    var day = this.zeroFill(date.getDate());//日
    var hour = this.zeroFill(date.getHours());//时
    var minute = this.zeroFill(date.getMinutes());//分
    var second = this.zeroFill(date.getSeconds());//秒

    //当前时间
    // var curTime = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    var curTime = month + "-" + day + " " + hour + ":" + minute + ":" + second;
     this.setData({
      curTime,
     })
  },
  /*
  * 补零
  */
  zeroFill(i){
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
  },
  bindKeyInput(e){
    this.setData({
      input_text: e.detail.value
    })
  },
  // 点击input 发送按钮
  clickButton(){
    let that = this;
    let input_text = that.data.input_text;
    let formData = that.data.formData;
    formData.input_text = input_text;
    that.setData({
      formData,
    })
    if(input_text == ''){
      return
    }
    that.getCurrentTime();
    let QAList = that.data.QAList;
    QAList.push({
      type:2,
      text: input_text,
      name:'',
      time: that.data.curTime,
    })

    that.setData({
      input_text: ''
    })
    setTimeout(function(){
      let QAList = that.data.QAList;
      QAList.push({
        type:1,
        text:'请选择年龄段：',
        time: that.data.curTime
      })
      that.setData({
        QAList,
        is_input: false,
        is_age:true
      })
      // 滚动
      my.createSelectorQuery().select('#msg_end').boundingClientRect(function(rect){
        console.log(rect)
        let stop = rect.top;
        stop.scrollTop = stop.scrollHeight;// 滚动高度
        my.pageScrollTo({ scrollTop: Number(stop)})
      }).exec()
    },1000)
    return
  },
  // 页面滚动
  getScrollH(){
    let that = this;
    // 滚动
    console.log('滚动')
    my.createSelectorQuery().select('#msg_end').boundingClientRect(function(rect){
      console.log(rect)
      let stop = rect.top;
      stop.scrollTop = stop.scrollHeight;// 滚动高度
      my.pageScrollTo({ scrollTop: Number(stop)})
    }).exec()
  },
  // 点击年龄选项按钮
  clickBtn(e){
    console.log(e)
    let that = this;
    let n_text = e.currentTarget.dataset.n;
    let i = e.currentTarget.dataset.index;
    let formData = that.data.formData;
    formData.age = i;
    that.setData({
      is_click: i,
      formData,
    })
    console.log(that.data.formData)
    that.getCurrentTime();
    let QAList = that.data.QAList;
    QAList.push({
      type:2,
      text: n_text,
      time: that.data.curTime,
    })
    that.setData({
      QAList,
    })
    setTimeout(function(){
      let QAList = that.data.QAList;
      QAList.push({
        type:1,
        text:'请选择性别：',
        time: that.data.curTime
      })
      that.setData({
        is_click: '-1',
        QAList,
        is_age: false,
        is_gender: true
      })
      // 滚动
      that.getScrollH();
    },1000)
    return
  },
    // 点击性别选项按钮
  clickGender(e){
    let that = this;
    let n_text = e.currentTarget.dataset.n;
    let i = e.currentTarget.dataset.index;
    let formData = that.data.formData;
    formData.gender = i;
    that.setData({
      is_click: i,
      formData,
    })
    that.getCurrentTime();
    let QAList = that.data.QAList;
    QAList.push({
      type:2,
      text: n_text,
      time: that.data.curTime,
    })
    that.setData({
      QAList
    })
    let params = {
      text:that.data.formData.input_text,
      age: that.data.formData.age,
      gender: that.data.formData.gender
    }
    my.request({
      url: 'https://jm.jiankangche.cn/jmjk/getSymptom',
      method: 'POST',
      data: params,
      headers:{
        'content-type':'application/json'  //默认值
      },
      dataType: 'json',
      success: function(res) {
        let type = res.data.type;
        let name = "";
        let age = params.age;
        let gender = params.gender;
        let text = params.text;
        if(type == 0){
          my.navigateTo({
            url:'/pages/department/index?age=' + age + '&gender=' + gender + '&text=' + text + '&name=' + name
          })
        }else{
          that.setData({
            symptomList:res.data.symptom,
          })
          setTimeout(function(){
            let QAList = that.data.QAList;
            QAList.push({
              type:1,
              text:'请选择以下症状：',
              time: that.data.curTime
            })
            that.setData({
              is_click:'-1',
              QAList,
              is_gender: false,
              is_symptom: true
            })
            // 滚动
            that.getScrollH();
          },1000)
        }
      },
      fail: function(res) {
      },
    })

  },
  // 点击症状选项
  clickSymptom(e){
    let that = this;
    let name = e.currentTarget.dataset.n;
    let i = e.currentTarget.dataset.index;
    let formData = that.data.formData;
    let age = formData.age;
    let gender = formData.gender;
    let text = formData.input_text;
    that.setData({
      is_click: i,
    })
    setTimeout(function(){
      that.setData({
        is_click: '-1',
      })
        my.navigateTo({
          url:'/pages/department/index?age=' + age + '&gender=' + gender + '&text=' + text + '&name=' + name
        })
      return
    },500)

  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {

  },

});
