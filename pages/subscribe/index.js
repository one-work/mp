Page({
  onLoad(query) {
    this.setData({
      tmpId: query.tmpId
    })
  },

  handleSubscribe(e) {
    console.log(e)
    const ds = e.currentTarget.dataset
    wx.requestSubscribeMessage({
      tmplIds: [ds.tmpId],
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})
