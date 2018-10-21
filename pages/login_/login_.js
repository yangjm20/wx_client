//  pages/login_/login_.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userInfos:{},
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      userInfos: wx.getStorageSync('userInfo')
    })
    //this.getUserInfo()
  },

  getUserInfo(){
    wx.getSetting({
      success:(res)=>{
        console.log(res);
        if(res.authSetting['scope.userInfo']){
          this.setData({
            isShow:false
          })
        }else{
          this.setData({
            isShow: true
          })
        }
      }
    })

    wx.getUserInfo({
      success:(data)=>{
        console.log(data.userInfo)
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  },

  handleUserInfo(userInfo){
    console.log(userInfo)
    if (userInfo.detail.rawData){
      this.getUserInfo()
    }
  },
  
  handleTap(){
    wx.switchTab({
      url: '/pages/index/index',
      success:()=>{
        console.log("ff")
      }
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

  getPhoneNumber:function(e){
    console.log(e)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      that.callBackError(e.detail.errMsg);
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
            console.log("---------rere")
            console.log(res);
            wx.setStorageSync('userInfos', res.data.userInfo)
            
            this.handleTap();
          }
        })
      
      return;
      
    }
  }
})