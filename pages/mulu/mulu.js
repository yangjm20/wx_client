// pages/mulu/mulu.js
var sliderWidth = 96; 
var updateUserInfo="http://localhost:3000/updateUserInfo"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBuy:[],
    mathName:[],
    highMath:[],
    tabs: ["目录", "详情", "评价"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    top:73,
    lessonId:0,//书
    sessionId:0,//章节
    id:-1,//具体视频
    comData:[
      {
        lujing:"../../images/ke1@2x.png",
        title:"王妈妈",
        subtitle:"课程内容很棒，孩子非常喜欢"
      },
      {
        lujing:"../../images/ke1@2x.png",
        title:"张妈妈",
        subtitle:"宝宝学完很开心"
      },
      {
        lujing:"../../images/motherL.gif",
        title:"李妈妈",
        subtitle:"课程内容很棒，孩子非常喜欢"
      }

    ]
  },

  onLoad: function (options) {

        wx.setStorageSync('lessonIdBuy', options.lessonId)
        this.setData({
          lessonId: options.lessonId,
          mathName: wx.getStorageSync('lessonDetail')[options.lessonId].lessonName,
          highMath: wx.getStorageSync('lessonDetail')[options.lessonId].lesson
        })

        wx.setNavigationBarTitle({
          title: this.data.mathName,
        });
      

    // 设置顶部标题
   
    var that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });

  },
  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
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
    console.log("show");
    console.log
    this.setData({
      isBuy:wx.getStorageSync('userInfo').isBuy
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide:function(){
    console.log("hide");
    var videoContent = wx.createVideoContext('video',this);
    videoContent.pause();
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

  shikan:function(){
    console.log("视频播放完毕");
    wx.showModal({
      title: '',
      cancelText:"下次再说",
      confirmText:"立即购买",
      content: '试看已结束，如需继续观看，请购买此课程',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          console.log("好的");
          wx.navigateTo({
            url: "/pages/buy/buy"
          });
        }
      }
    })
  },
  huan:function(e){
    if (this.data.isBuy[this.data.lessonId].lessonIsBuy){
      this.setData({
        id: e.currentTarget.dataset.idx,
        sessionId: e.currentTarget.dataset.sessionidx
      })
    }else{
      wx.navigateTo({
        url: "/pages/buy/buy"
      });
    }

    
  },



  wxPay:function(){  
    wx.navigateTo({
      url: "/pages/buy/buy"
    });
  },
  setTitle:function(e){
      wx.setNavigationBarTitle({
          title:this.data.highMath[e.currentTarget.dataset.chapter].sectionName,
      });
  },
  
  listTap:function(e){
    var Index = e.currentTarget.dataset.parentindex;//获取点击的下标
    var highMath=this.data.highMath;
    highMath[Index].show=!highMath[Index].show || false;//变换七打开、关闭的状态
    if(highMath[Index].show){//如果点击后展开状态，则让其他已经展开的列表收起
      this.packUp(highMath,Index);
    }
    this.setData({
      highMath
    })
  },

    //让其他展开的列表收起
  packUp(data,index){
    for(let i=0,len=data.length;i<len;i++){
      if(index!=i){
        data[i].show=false;
      }
    }
  }
})