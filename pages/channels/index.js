Page({
  onLoad(options) { 
    if (options.feed_token) {
      this.setData({
        feed_token: decodeURIComponent(options.feed_token)
      })
    }
  }
})
