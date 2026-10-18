Page({
  onLoad(options) { 
    if (options.service_url) {
      this.setData({
        service_url: options.service_url,
        service_corp: options.service_corp
      })
    }
  },

  handleContact(e) {
    wx.openCustomerServiceChat({
      extInfo: { url: this.data.service_url },
      corpId: this.data.service_corp,
      success: res => {
        console.debug(res)
      },
      fail: res => {
        wx.showModal({
          title: '打开错误',
          content: JSON.stringify(res)
        })
      }
    })
  }

})
