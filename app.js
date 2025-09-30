App({
  onLaunch() {
    // 初始化云开发能力，后续可在小程序中直接调用云函数和云存储
    if (!wx.cloud) {
      console.error("当前基础库版本不支持云能力，请升级微信客户端");
      return;
    }

    wx.cloud.init({
      env: "cloud1-3g6zvspe38139c27",
      traceUser: true
    });
  }
});
