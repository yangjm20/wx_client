 // pages/index/index.js
let hotLesson = require("../../data/hotLesson.js");
let recommendLesson = require("../../data/recommend_lesson.js");
const getlessonUrl = "http://localhost:3000/getLesson";
const lessonDetailUrl = "http://localhost:3000/getLessonDetail"
const isExercisedUrl = "http://localhost:3000/getIsExercised"


Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            '../../images/banner-01@2x.png',
            '../../images/banner-01@2x.png',
            '../../images/banner-03@2x.png'
        ],
        indicatorDots: true,
        indicatorColor: 'greenyellow',
        indicatorActiveColor: 'green',
        autoplay: true,
        interval: 5000,
        duration: 1000,
        previousMargin: "30rpx",
        nextMargin: "30rpx",
        circular: true,
        // 热门课程数据
        hotLesson: [],
        recommendLesson: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      wx.request({
        url: getlessonUrl,
        method: 'GET',
        success: (res) => {
          wx.setStorageSync('lesson', res.data.data)
        }
      })


      wx.request({
        url: lessonDetailUrl,
        method: 'GET',
        success: (res) => {
          console.log(res.data.data)
          wx.setStorageSync('lessonDetail', res.data.data)
        }
      })

      this.setData({
            hotLesson: hotLesson.hot_lesson,
            recommendLesson:recommendLesson.recommend_lesson
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

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    tiao: function (e) {
        var lessonId = e.currentTarget.dataset.id;
        console.log(e)
        console.log(lessonId)
        var id2 = e.currentTarget.dataset.id2;
        var id3 = e.currentTarget.dataset.id3;
        wx.navigateTo({
            url: "/pages/mulu/mulu?lessonId=" + lessonId+"&sessionId="+id2+"&voideId="+id3
        });
    },

  toExercise: function (e) {
   
    var lessonId = e.currentTarget.dataset.id;
    console.log(e)
    console.log(lessonId)
    var id2 = e.currentTarget.dataset.id2;
    var id3 = e.currentTarget.dataset.id3;
    wx.navigateTo({
        url: '/pages/exercise/exercise?lessonId=' +lessonId + '&sessionId=' + id2 + '&id=' + id3,
    })
  } ,
  toLesson:function(e){
    console.log(e)
    var lessonId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/mulu/mulu?lessonId=" + lessonId
    });
  }
          
    

  
})