
var api = require('../../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    HotRankList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotRankListAction()
  },

  getHotRankListAction : function(e){
    var date = new Date().getTime()
    api.apiForHotRankList({
      query:{
        date : date
      },
      success:(res)=>{
        if(res.data.Code == 0){
          this.setData({ HotRankList : res.data.Data})
        }
      }
    })
  },
  // 查看商品详情
  userCheckProductDetailAction:function(e){
    var productID= e.currentTarget.dataset.model.ID;
    wx.navigateTo({
      url: '../../classify/ProductDetailPage/ProductDetailPage?ID=' + productID,
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
    
  }
})