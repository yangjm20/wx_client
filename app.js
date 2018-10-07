//app.js\
const getOpenIdUrl ='http://localhost:3000/getOpenId'
App({
  config:{
    host:'www.talltree.com.cn'
  },

  onLaunch: function () {

    wx.login({
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success:(res)=>{
          if(res.code){
            wx.request({
              url: getOpenIdUrl,
              data:{
                code:res.code
              },
              method:'POST',
              header:{
                'content-type':'application/json'
              },
              success:(res)=>{
                console.log(res)
                var userInfo=res.data.userInfo;
                if(userInfo){
                  wx.setStorageSync('openid', userInfo.userId)
                  wx.setStorageSync('userInfo', userInfo)
                }else{
                  console.log('获取用户唯一标识失败');
                }
                
              }

            })
          }else{
            console.log('登陆失败！'+res.errMsg)
          }
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: ""
  }
})