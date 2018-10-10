// pages/buy/buy.jsvar 
var getPrePayId="http://localhost:3000/getPrePayId"
var updateUserInfo = "http://localhost:3000/updateUserInfo"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/hui@2x.png'
      //'../../images/hui1@2x.png'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000, 
      nextMargin:"10rpx",
      circular:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  sure:function(){

    wx.request({
      url: getPrePayId,
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openid")
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: 'MD5',
            paySign: res.data.sign,
            success: function (res) {
              console.log("success", res);


              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              });

              wx.request({
                url: updateUserInfo,
                method: 'POST',
                data: {
                  userId: wx.getStorageSync('openid'),
                  lessonId: wx.getStorageSync('lessonIdBuy')
                },
                success: function (res) {
                  
                  console.log(res);
                 
                  wx.switchTab({
                    url: '/pages/mine/mine'
                  })
                }
              })

              
            },
            fail: function (err) {
              console.log('fail', err);
            }
          })
        }
      }
    })

/*
    wx.showToast({
      title: "恭喜你，购买成功",
      icon: 'success',
      duration: 1500,
      mask: true,
      success: function (e) {
        wx.switchTab({
          url: '/pages/mine/mine'
        })

      }
      })*/
  }
})