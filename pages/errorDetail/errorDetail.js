// pages/result/result.js
const getScoreDetailUrl = "http://localhost:3000/getScoreDetail"
const lessonUrl = "http://localhost:3000/getLessonDetailById"
const errorsUrl = "http://localhost:3000/getErrorsById"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["第一题", "第二题", "第三题", "第四题", "第五题"],
    activeIndex: null,
    answerOptions:[],
    userAnswerOptions:[],
    answers:[],
    errors:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        url: errorsUrl,
        data:{
          exerciseId:options.exerciseId,
          id:options.id
        },
        method:'GET',
        success:(res)=>{
          console.log(res)
          this.setData({
            answers:res.data.answer.answers,            
            answerOptions: res.data.answerOps[0].userAnswerAndAnswer.answerOptions,
            userAnswerOptions: res.data.answerOps[0].userAnswerAndAnswer.userAnswerOptions,
            errors: res.data.errors,
            activeIndex:res.data.errors.errorIndex[0]
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
  onShow: function (options) {
    
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
    console.log("1111")
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },
})