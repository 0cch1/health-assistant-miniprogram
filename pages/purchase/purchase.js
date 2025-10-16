Page({
  data: {
    prescriptionData: null
  },

  onLoad() {
    // 从本地存储中获取购买数据
    try {
      const purchaseData = wx.getStorageSync('purchaseData');
      if (purchaseData) {
        this.setData({
          prescriptionData: purchaseData
        });
      } else {
        wx.showToast({
          title: '未找到推荐数据',
          icon: 'none'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    } catch (error) {
      console.error('获取购买数据失败:', error);
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      });
    }
  },

  selectPurchaseMethod(event) {
    const { method } = event.currentTarget.dataset;
    
    switch (method) {
      case 'online':
        this.showOnlinePurchase();
        break;
      case 'store':
        this.showStoreLocator();
        break;
      case 'consultation':
        this.showConsultation();
        break;
      default:
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        });
    }
  },

  showOnlinePurchase() {
    wx.showModal({
      title: '在线购买',
      content: '在线购买功能正在开发中。您可以：\n\n1. 截图保存推荐配方\n2. 到附近药店购买\n3. 联系客服协助购买',
      showCancel: true,
      cancelText: '取消',
      confirmText: '联系客服',
      success: (res) => {
        if (res.confirm) {
          this.contactService();
        }
      }
    });
  },

  showStoreLocator() {
    wx.showModal({
      title: '到店购买',
      content: '推荐您到以下药店购买：\n\n• 同仁堂\n• 康美药业\n• 本地知名中药房\n\n建议提前电话咨询是否有推荐的中药材。',
      showCancel: true,
      cancelText: '取消',
      confirmText: '查看地图',
      success: (res) => {
        if (res.confirm) {
          wx.openLocation({
            latitude: 39.9042, // 示例坐标，实际应用中可以根据用户位置调整
            longitude: 116.4074,
            name: '附近中药房',
            address: '请在地图上查找附近的中药房'
          });
        }
      }
    });
  },

  showConsultation() {
    wx.showModal({
      title: '专家咨询',
      content: '专业中医师在线咨询服务：\n\n• 详细解读您的体质分析\n• 个性化调整中药配方\n• 解答用药疑问\n• 制定调理计划',
      showCancel: true,
      cancelText: '取消',
      confirmText: '立即咨询',
      success: (res) => {
        if (res.confirm) {
          this.contactService();
        }
      }
    });
  },

  contactService() {
    wx.showActionSheet({
      itemList: ['拨打客服电话', '在线客服咨询', '微信客服'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            wx.makePhoneCall({
              phoneNumber: '400-123-4567' // 示例客服电话
            });
            break;
          case 1:
            wx.showToast({
              title: '正在转接在线客服...',
              icon: 'loading'
            });
            // 这里可以集成在线客服系统
            break;
          case 2:
            wx.showModal({
              title: '微信客服',
              content: '请添加微信号：wechat_service\n或扫描二维码联系客服',
              showCancel: false,
              confirmText: '我知道了'
            });
            break;
        }
      }
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    const prescriptionData = this.data.prescriptionData;
    return {
      title: prescriptionData ? `推荐中药配方：${prescriptionData.prescription}` : '中药智能推荐',
      path: '/pages/index/index',
      imageUrl: '' // 可以添加分享图片
    };
  }
});
