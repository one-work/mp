const plugin = requirePlugin('bluetooth')

Page({
  data: {
    state: '正在连接打印机...'
  },

  onLoad(options) {
    console.debug('print onload', options)
    //const url = decodeURIComponent(options.url)

    const devices = [options.device]
    this.setData({ registeredDevices: devices })

    this.printer = new plugin.BluetoothPrinter(wx, this)
    this.printer.registeredDevices = devices

    const raw = decodeURIComponent(options.raw)
    if (raw) {
      const data = Uint8Array.fromBase64(raw)
      console.debug('打印数据', data)
      this.printer.getState({
        success: res => {
          if (res.printable) {
            this.setData({
              state: '打印机已连接，即将打印'
            })
            this.printer.writeValue(data)
            wx.navigateBack()
          }
        },
        complete: res => {
          this.setData({
            devices: res
          })
        }
      })
    }
  },

  selected(e) {
    this.setData({
      connectedId: e.detail.deviceId,
      connectedName: e.detail.deviceName
    })
    console.debug(e)
    const app = getApp()
    app.globalData.connectedId = this.data.connectedId
    app.globalData.connectedName = this.data.connectedName
  },

  unselected(e) {
    this.setData({
      connectedId: '',
      connectedName: ''
    })
    const app = getApp()
    app.globalData.connectedId = this.data.connectedId
    app.globalData.connectedName = this.data.connectedName
  },

  setPrinter(url) {
    console.debug('print url', url)
    wx.request({
      url: url,
      header: {
        Accept: 'application/json'
      },
      success: res => {
      },
      fail: res => {
        wx.showModal({
          title: 'do Print fail',
          content: `Url: ${url}，${JSON.stringify(res)}`
        })
      }
    })
  }
})
