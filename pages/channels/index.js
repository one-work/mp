Page({
  onLoad(options) { 
    if (options.feed_token) {
      this.setData({
        feed_token: options.feed_token
      })
    }
  }
})
