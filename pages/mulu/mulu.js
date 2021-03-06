// pages/mulu/mulu.js
var sliderWidth = 96; 
var getUserInfoUrl ='https://www.talltree.com.cn/getUserInfo'
const getanswerUrl = 'https://www.talltree.com.cn/getAnswer'

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

    comData:[{},{},{}]
    /*
    comData:[
      {
        lujing:"../../images/ke1@2x.png",
        title:"会飞的鱼",
        subtitle:"课程内容很棒，一听就懂"
      },
      {
        lujing:"../../images/ke1@2x.png",
        title:"远方",
        subtitle:"课程很便宜，考研很有用"
      },
      {
        lujing:"../../images/motherL.gif",
        title:"文都机构",
        subtitle:"数学知识点讲解生动"
      }

    ]*/
  },

  onLoad: function (options) {

        console.log(options)
        wx.setStorageSync('lessonIdBuy', options.lessonId)

    if (options.sessionId!=undefined){
      this.setData({
       
        sessionId: options.sessionId,
        id: options.voideId,
        
      })

      
    }

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
    wx.request({
      url: getUserInfoUrl,
      method:'GET',
      data:{
        userId:wx.getStorageSync('openid')
      },
      success:(res)=>{
        if(res.data.code==0){
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
    var that=this;
    wx.showModal({
      title: '',
      cancelText:"下次再说",
      confirmText:"即刻答题",
      content: '视屏播放结束，请前往答题区练习此节',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          console.log(res);
          that.toExercise();
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
        url: "/pages/buy/buy?lessonId=" + this.data.lessonId
      });
    }

  },
  toExercise:function(){
    if(this.data.id==-1){
      wx.navigateTo({
        url: '/pages/exercisemulu/exercisemulu?lessonId=' + this.data.lessonId,
      })
    }else{

      wx.request({
        url: getanswerUrl,
        data: {
          lessonId: this.data.lessonId,
          sectionId: this.data.sessionId,
          voideId: this.data.id
        },
        method: 'GET',
        success: (res) => {
          console.log("1111")
          if (res.data.code == 0) {

            wx.navigateTo({
              url: '/pages/exercise/exercise?lessonId=' + this.data.lessonId + '&sessionId=' + this.data.sessionId + '&id=' + this.data.id,
            })
          } else {

            wx.showToast({
              title: '还未上传答案',
            })
          }
        }
      })



    }
  },


  wxPay:function(){  
    wx.navigateTo({
      url: "/pages/buy/buy?lessonId=" + this.data.lessonId
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