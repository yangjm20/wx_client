// pages/result/result.js
const getScoreDetailUrl = "http://localhost:3000/getScoreDetail"
const lessonUrl = "http://localhost:3000/getLessonDetailById"

const saveAnswerAndUseAnswerOp='http://localhost:3000/saveAnswerAndUserAnswerOps'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs: ["第一题", "第二题", "第三题", "第四题", "第五题"],
      scoreStudent:null,
      activeIndex:0,
      lessons:[],
      sessionId:[],
      examinations:[],
      answers:[],
      id:[],
      answerOptions:[],
      userAnswerOptions:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var answerStudent=options.answer;
    var exerciseId = options.lessonId + options.sessionId + options.id;
    
    var userAns=wx.getStorageSync("userAnswer")
    
    wx.request({
      url: getScoreDetailUrl,
      data:{
        answerStudent:answerStudent,
        lessonId: options.lessonId,
        sessionId: options.sessionId,
        vodieId: options.id,
        userId:wx.getStorageSync('openid')
      },
      method:'POST',
      success:(scoreDetail)=>{
        var answerOptions=[null,null,null,null,null];
        var userAnswerOptions=[null,null,null,null,null];
      
        console.log(scoreDetail.data)
      
        for (var i = 0; i <5; i++) {
          var op = parseInt(scoreDetail.data.answers[i].answer)
       
          var userop = parseInt(userAns[i]);
      
         
            switch (op) {
              case 0: {
                answerOptions[i] = 'A';
                break;
              }

              case 1: {
                answerOptions[i] = 'B';
                break;
              }

              case 2: {
                answerOptions[i] = 'C';
                break;
              }

              case 3: {
                answerOptions[i] = 'D';
                break;
              }

            }

          switch (userop) {
              case 0: {
              userAnswerOptions[i] = 'A';
                break;
              }

              case 1: {
              userAnswerOptions[i] = 'B';
                break;
              }

              case 2: {
              userAnswerOptions[i] = 'C';
                break;
              }

              case 3: {
              userAnswerOptions[i] = 'D';
                break;
              }

            }

        }

        console.log("------")
        console.log(userAnswerOptions);


        wx.request({
          url: saveAnswerAndUseAnswerOp,
          data:{
            id: wx.getStorageSync('openid')+options.lessonId+options.sessionId+options.id,
            userId: wx.getStorageSync('openid'),
            lessonId: options.lessonId ,
            sessionId: options.sessionId ,
            vodieId: options.id,
            answerOptions: answerOptions,
            userAnswerOptions: userAnswerOptions

          },
          method:'POST',
          success:(res)=>{
            console.log(res)
          }
        })
        
        this.setData({
            scoreStudent: scoreDetail.data.score,
            answers: scoreDetail.data.answers,
            sessionId: options.sessionId,
            id: options.id,
            examinations: wx.getStorageSync('examinations'),
            answerOptions,
            userAnswerOptions
          })
      }
      
    })

    wx.request({
      url: lessonUrl,
      method:'GET',
      data:{
        lessonId:options.lessonId
      },
      success:(lesson)=>{
        this.setData({
          lessons:lesson.data.data.lesson
        })

        wx.setNavigationBarTitle({
          title: lesson.data.data.lessonName,
        })
        
        console.log(lesson.data.data)
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
  return_index:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },
})