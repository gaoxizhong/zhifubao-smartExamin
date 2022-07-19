App({
  onLaunch(options) {
    
    const plugin = requirePlugin('myPlugin');
    plugin.setAppNavigater((options) => {
      // 这里可以进行逻辑校验
      my.navigateTo(options);
    });
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
