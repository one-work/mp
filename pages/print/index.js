const plugin = requirePlugin('bluetooth')

Page({
  data: {
    state: '正在连接打印机...'
  },

  onLoad(options) {
    console.debug('print onload', options)
    //const url = decodeURIComponent(options.url)
    const raw = decodeURIComponent(options.raw)
    const data = Uint8Array.fromBase64(raw)
    console.debug('打印数据', data)
    const devices = [options.device]
    this.setData({ registeredDevices: devices })

    this.printer = new plugin.BluetoothPrinter(wx, this)
    this.printer.registeredDevices = devices
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
  },

  doPrint(url) {
    console.debug('print url', url)
    wx.request({
      url: url,
      header: {
        Accept: 'application/json'
      },
      success: res => {
        if (Array.isArray(res.data[0])) {
          res.data.forEach(data => {
            this.printer.writeValue(data)
          })
        } else {
          this.printer.writeValue(res.data)
        }
        wx.navigateBack()
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
