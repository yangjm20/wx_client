// pages/buy/buy.jsvar 
var getPrePayId ="https://www.talltree.com.cn/getPrePayId"
var updateUserInfo = "https://www.talltree.com.cn/updateUserInfo"
const getPhoneUrl = "https://www.talltree.com.cn/getPhone"

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
      lessonId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      this.setData({
        lessonId:options.lessonId
      })
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
  
  getPhoneNumber: function (e) {
    var that=this;
    
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
     
      console.log(e)
    } else {
      console.log("phonephone")
      let params = {
        userId: wx.getStorageSync('openid'),//用户open_id,不一定需要
        sessionKey: wx.getStorageSync('session_key'),//调用wx.loign接口 获取code 上传服务器获取用户open_id ,session_key
        encryptedData: e.detail.encryptedData,//调用获取用户手机号组件，直接获取
        iv: e.detail.iv,//调用获取用户手机号组件，直接获取
        userType: 3//不一定需要
      }
      console.log(params);

      wx.request({
        url: getPhoneUrl,
        method: 'POST',
        data: {
          userId: params.userId,
          session_key: params.sessionKey,
          encryptedData: params.encryptedData,
          iv: params.iv
        },
        success: (res) => {
          console.log(res);
        if(res.statusCode==200){
          wx.setStorageSync('userInfos', res.data.userInfo)
          console.log("111")
          this.sure();
        }
        return;
          
        }
      })

      

    }
  }
  ,


  sure:function(e){
    
    wx.request({
      url: getPrePayId,
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openid"),
        lessonId:this.data.lessonId
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