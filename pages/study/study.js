// pages/study/study.js
let lessons=require("../../data/list-lesson.js");
var getUserInfoUrl = 'http://localhost:3000/getUserInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessons:[],
    isBuy:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          lessons:wx.getStorageSync('lesson')
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
    wx.request({
      url: getUserInfoUrl,
      method: 'GET',
      data: {
        userId: wx.getStorageSync('openid')
      },
      success: (res) => {
        if (res.data.code == 0) {
          this.setData({
            isBuy: res.data.userInfo.isBuy
          })
        }
      }
    })
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
  tiao:function(e){
    var id=e.currentTarget.dataset.lessonid
    wx.navigateTo({
      url: '/pages/exercisemulu/exercisemulu?lessonId='+id,
    })
  },
  toBuy:function(e){
    console.log(e);
    wx.setStorageSync('lessonIdBuy', e.currentTarget.dataset.lessonid)
      wx.navigateTo({
        url: "/pages/buy/buy"
      });
    
  }
})