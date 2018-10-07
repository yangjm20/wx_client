//  pages/login_/login_.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
    }),

    wx.getUserInfo({
      success:(data)=>{
        console.log(data.userInfo)
        this.setData({
          userInfo:data.userInfo
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

  }
})