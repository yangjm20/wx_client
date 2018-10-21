// pages/exercisemulu/exercisemulu.js
const answersHisUrl ='https://www.talltree.com.cn/getAnswerHistory'
const getanswerUrl ='https://www.talltree.com.cn/getAnswer'
const isExercisedUrl = 'https://www.talltree.com.cn/getIsExercised'
const lessonDetailUrl = "https://www.talltree.com.cn/getLessonDetail"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessons:[],
    lessonId:"",
    mathName:"",
    isExercised:[],
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
          //var lessonDetail = wx.getStorageSync('lessonDetail')
          //wx.setStorageSync('lessons', lessonDetail[options.lessonId].lesson)
          this.setData({
            lessonId:options.lessonId,
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

    console.log("showshow")
    
        wx.request({
          url: isExercisedUrl,
          data: {
            userId: wx.getStorageSync('openid')
          },
          method: 'POST',
          success: (res) => {
            console.log("000------------")
            console.log(res)
            this.setData({
              isExercised:res.data.isExercised.lessons
            })
          }
        }) 

    wx.request({
      url: lessonDetailUrl,
      method: 'GET',
      success: (res) => {
        console.log(res.data.data)
        var lessonDetail=res.data.data;
        wx.setStorageSync('lessonDetail', res.data.data)
        this.setData({
          lessons: lessonDetail[this.data.lessonId].lesson,
          mathName: lessonDetail[this.data.lessonId].lessonName,
          
        })
        
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
  huan: function (e) {

    /*wx.request({
      url: answersHisUrl,
      data:{
        id: wx.getStorageSync('openid') + this.data.lessonId + e.currentTarget.dataset.sessionidx + e.currentTarget.dataset.idx
      },
      success:(res)=>{
        console.log(res.data.msg)
        if(res.data.code==0){

          wx.request({
            url: getanswerUrl,
            data:{
              lessonId:this.data.lessonId,
              sectionId: e.currentTarget.dataset.sessionidx,
              voideId: e.currentTarget.dataset.idx
            },
            method:'GET',
            success:(res)=>{
              console.log("1111")
              if(res.data.code==0){
*/
                this.setData({
                  id: e.currentTarget.dataset.idx,
                  sessionId: e.currentTarget.dataset.sessionidx
                })

                wx.navigateTo({
                  url: '/pages/exercise/exercise?lessonId=' + this.data.lessonId + '&sessionId=' + this.data.sessionId + '&id=' + this.data.id,
                })
               /*}else{

                wx.showToast({
                  title: '还未上传答案',
                })
              }
            }
          })
  
       }else{

          wx.showToast({
            title: '此题已做',
            duration:1000
          })
        }
      }
    })*/


  },
  listTap: function (e) {
    console.log(e)
    var Index = e.currentTarget.dataset.parentindex;//获取点击的下标
    var lessons = this.data.lessons;
    lessons[Index].show = !lessons[Index].show || false;//变换七打开、关闭的状态
    if (lessons[Index].show) {//如果点击后展开状态，则让其他已经展开的列表收起
      this.packUp(lessons, Index);
    }
    this.setData({
      lessons
    })
  },

  //让其他展开的列表收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (index != i) {
        data[i].show = false;
      }
    }
  },

})