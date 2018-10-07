// pages/exercise/exercise.js
//let examination=require("../../data/examination.js");

const exercisesUrl = "http://132.232.155.172:3000/getExercise";
var imgUrl=[null]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["第一题", "第二题", "第三题", "第四题", "第五题"],
    activeIndex: 0,
    sliderOffset: 0,
    examinations: [],
    userAnswer: [null, null, null, null, null],
    user: [],
    lessonId: null,
    sessionId: null,
    id: null,
    upLoadimgUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: exercisesUrl,
      method: 'GET',
      data: {
        exerciseId: (options.lessonId + options.sessionId + options.id)
      },
      success: (res) => {
        console.log(res.data.data.examinations)
        this.setData({
          examinations: res.data.data.examinations,
          lessonId: options.lessonId,
          sessionId: options.sessionId,
          id: options.id
        })
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

  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },

  radioChange: function (e) {
    this.data.userAnswer[this.data.activeIndex] = e.detail.value;
    this.setData({
      userAnswer: this.data.userAnswer
    })
  }
  ,


  next_examination: function (e) {

    this.setData({
      activeIndex: (parseInt(this.data.activeIndex) + 1) % 5,
    })

  }
  ,
  pre_examination: function (e) {
    this.setData({
      activeIndex: (parseInt(this.data.activeIndex) - 1) % 5,
    })
  },

  submitHandle: function (e) {
    var flag = true;
    for (var i = 0; i < this.data.userAnswer.length; i++) {
      if (this.data.userAnswer[i] == null) {
        flag = true;
        break;
      } else {
        flag = false;
      }

    }
    if (flag) {
      wx.showModal({
        title: '提示',
        content: '本章节还有未上传的答案，请完成后再提交',
        showCancel: false
      })
    } else {

      wx.setStorageSync("examinations", this.data.examinations);
      wx.setStorageSync("userAnswer", this.data.userAnswer);
      wx.redirectTo({
        url: '/pages/result/result?answer=' + this.data.userAnswer + '&lessonId=' + this.data.lessonId + '&sessionId=' + this.data.sessionId + '&id=' + this.data.id
      })
    }
  }
  ,
  uploadImg:function(e){
      wx.chooseImage({
        success: (res) =>{
          imgUrl[this.data.activeIndex]=res.tempFilePaths[0]
        },
      })
  }
})