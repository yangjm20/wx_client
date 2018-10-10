// pages/mine/mine.js
let lessons = require("../../data/list-lesson.js");
const getHistoryUrl ='http://localhost:3000/getHistory'
const getErrosUrl = 'http://localhost:3000/getErrors'
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
   userInfo:{},
   lessons:[],
   lesson:[],
   answerHistory:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    console.log(app.globalData.userInfo);
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
      url: getHistoryUrl,
      data: {
        userId: wx.getStorageSync('openid')
      },
      method: 'GET',
      success: (res) => {
        if (res.data.code == 0) {
          console.log("00000")
          console.log(wx.getStorageSync('lessonDetail'))
          this.setData({
            userInfo: app.globalData.userInfo,
            lessons: wx.getStorageSync('lessonDetail'),
            answerHistory: res.data.history,
            lesson: lessons.list_lesson
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

  
  tiao:function(){
    wx.navigateTo({
      url: "/pages/cellphone/cellphone"
    });
  },

toMyBuyLesson:function(){
  wx.navigateTo({
    url: '/pages/buyLessons/buyLessons',
  })
},
  toErrorExe:function(){
    wx.request({
      url: getErrosUrl,
      data: {
        userId: wx.getStorageSync('openid')
      },
      method: 'GET',
      success: (res) => {
       
        if (res.data.code == 1) {
          wx.showToast({
            title: '未发现错题',
          })
        } else {
          
          wx.setStorageSync('errors', res.data.errors)
          wx.navigateTo({
            url: '/pages/errorExercise/errorExercise',
          })
        }

      }
    })

    
  }
})