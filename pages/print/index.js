const plugin = requirePlugin('bluetooth')

Page({
  data: {
    state: '正在连接打印机...'
  },

  onLoad(options) {
    console.debug('print onload', options)

    if (options.url) {
      this.url = decodeURIComponent(options.url)
    } 

    if (options.device) {
      const devices = [options.device]
      this.setData({ registeredDevices: devices })
    }

    this.printer = new plugin.BluetoothPrinter(wx, this)
    this.printer.registeredDevices = devices

    if (options.raw) {
      this.raw = decodeURIComponent(options.raw)
    }
    if (this.raw) {
      this.doPrint(this.raw)
    }
  },

  printerReady(e) {
    this.printer.registeredDevices = [e.detail.connectedName]
    if (this.raw) {
      this.doPrint(this.raw)
    }
  },

  selected(e) {
    this.printer.registeredDevices = [e.detail.deviceName]
    if (this.raw) {
      this.doPrint(this.raw)
    }
  },

  unselected(e) {
    this.setData({
      state: '打印机已断开连接！'
    })
  },

  doPrint(raw) {
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
  },

  setPrinter(url) {
    wx.request({
      url: this.url,
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
