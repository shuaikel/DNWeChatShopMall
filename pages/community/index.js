
var api = require('../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    BannerList : []
  },
  bindscrolltolowerAction :function(e){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommunityRecommandPage()
  },
  /**
   * 加载社区推荐数据
   */
  getCommunityRecommandPage : function(){
    let that = this
    api.apiForCommunityPage({
      success: (res) => {
        if (res.data.Code == 0){
          this.setData({ BannerList: res.data.Data.BannerList })
        }
      }
    })
  },
  /**
   * 社区item点击事件
   */
  activityItemTapAction:function(e){
    
    console.log('activityItemTapAction' + e)
    let itemModel = e.currentTarget.dataset.contentmodel

    wx.navigateTo({
      url: '../webView/CommunitywebView?content='+itemModel.Content,
    })
  

  } ,
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