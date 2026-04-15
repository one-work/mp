Page({
  onLoad(query) {
    console.debug('Share Onload:', query)
    this.setData({
      query: query
    })
  },

  openOther() {
    wx.navigateToMiniProgram({
      appId: 'wxe44dc002dd0d29b0',
      path: '/pages/share/index',
      extraData: this.data.query,
      fail: () => {
        wx.navigateBack()
      },
      success: () => {
        wx.navigateBack()
      }
    })
  }
})
