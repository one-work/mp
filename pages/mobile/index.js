const APPID = wx.getAccountInfoSync().miniProgram.appId

Page({
  onLoad(query) {
    console.debug('Mobile query:', query)

    wx.login({
      success: res => {
        wx.request({
          url: url,
          method: 'POST',
          header: {
            Accept: 'application/json'
          },
          data: {
            code: res.code,
            appid: APPID
          },
          success: response => {
            
          },
          fail: res => {
            let content = JSON.stringify(res)
            if (res.errno === 600002) {
              content = `${res.errMsg}：${url}`
            }
            wx.showModal({
              title: `登录请求失败！`,
              content: content
            })
          }
        })
      },
      fail: res => {
        wx.showModal({
          title: '登录(wx.login)失败',
          content: JSON.stringify(res)
        })
      }
    })

    this.url = decodeURIComponent(query.url) 
  },

  getPhoneNumber(e) {
    wx.request({
      url: this.url,
      method: 'POST',
      header: {
        Accept: 'application/json'
      },
      data: {
        appid: APPID,
        ...e.detail
      },
      success: res => {
        wx.navigateBack()
      },
      fail: res => {
        let content = JSON.stringify(res)
        wx.showModal({
          title: `授权手机号失败！`,
          content: content
        })
      }
    })
  }
})
