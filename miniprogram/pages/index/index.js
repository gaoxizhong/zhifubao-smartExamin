var plugin = requirePlugin("myPlugin");

Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
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
    // 返回自定义分享信息
    return {
      title: '智能导诊',
      desc: '智能导诊',
      path: 'pages/index/index',
    };
  },
  // 跳转插件
  navigateToPlugin() {
    my.navigateTo({
      url: 'plugin://myPlugin/smart-examin',
    });
  }
});
