
var api = require('../../api/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items : [
      '我的宝宝','我的推荐',
      '我的红包', '我的收藏',
      '邀请好友（有奖）', '收货地址',
      '解绑微信', '设置'
      ],

    middleCategoryS: ['待发货', '待收货', '待评论','已完成'],
    middleCategoryIconS: ['https://lelch.mammasay.com/img/my/user_btn_car@2x.png',
    'https://lelch.mammasay.com/img/my/user_btn_product@2x.png',
    'https://lelch.mammasay.com/img/my/user_btn_comment@2x.png',
    'https://lelch.mammasay.com/img/my/user_btn_succeed@2x.png'],

    daoGouBaoBaseInfoModel : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentLoginBaseInfoAction()
  },

  // 获取当前登录导购的基本信息
  getCurrentLoginBaseInfoAction : function(e){
    var date = new Date().getTime()
    var that = this
    api.apiForLoginUserBaseInfo({
      query:{
        date:date
      },
      success:(res)=>{
        if(res.data.Code == 0){
          that.setData({ daoGouBaoBaseInfoModel : res.data.Data})
        }
      }
    })
  },

  // 查看当前登录用户的基本信息
  checkUserAccountSumInfo : function(e){
    var sessionKey = wx.getStorageSync('sessionKey');
   if (sessionKey.length > 0){
     // 用户已经登录
     wx.navigateTo({
       url: 'UserAccountBasePage/UserAccountBasePage',
     })
   }else{
     // 用户未登录
   }
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
    
  }
})