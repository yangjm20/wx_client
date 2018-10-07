// pages/exercisemulu/exercisemulu.js
const lessonDetailUrl = "http://132.232.155.172:3000/getLessonDetail"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessons: [],
    lessonId: "",
    mathName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: lessonDetailUrl,
      method: 'GET',
      success: (res) => {
        this.setData({
          lessonId: options.lessonId,
          mathName: res.data.data[options.lessonId].lessonName,
          lessons: res.data.data[options.lessonId].lesson
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
  huan: function (e) {

   


    console.log(e)
    this.setData({
      id: e.currentTarget.dataset.idx,
      sessionId: e.currentTarget.dataset.sessionidx
    })

    wx.navigateTo({
      url: '/pages/admin/exercises/exercises?lessonId=' + this.data.lessonId + '&sessionId=' + this.data.sessionId + '&id=' + this.data.id,
    })
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
  }
})