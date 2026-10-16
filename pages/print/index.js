const plugin = requirePlugin('bluetooth')

Page({
  onLoad(options) {
    console.debug('print onload', options)
    this.printer = new plugin.BluetoothPrinter(wx, this)

    if (options.url) {
      this.url = decodeURIComponent(options.url)
    }

    if (options.device) {
      const devices = [options.device]
      this.setData({ 
        registeredDevices: devices,
        state: '正在连接打印机...'
      })
      this.printer.registeredDevices = devices
    } else {
      this.setData({
        state: '等待选择并连接打印机...'
      })
    }

    if (options.raw) {
      this.raw = decodeURIComponent(options.raw)
    }
    if (this.raw) {
      this.doPrint(this.raw)
    }
  },

  printerConnected(e) {
    this.printer.registeredDevices = [e.detail.deviceName]
    if (this.raw) {
      this.doPrint(this.raw)
    }
    this.setData({
      state: '打印机已连接！'
    })
  },

  printerUnselected(e) {
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
