App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('当前基础库版本不支持云开发，请升级微信客户端。');
      return;
    }

    wx.cloud.init({
      env: 'cloud1-3g6zvspe38139c27',
      traceUser: true
    });
  }
});
