

var api = require('../../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    producetDetailModel : {},
    segmentSortArray : ['商品','详情','评价'],
    bottomActionIndexArray : ['客服','收藏','购物车'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userGetProductDetailAction(options)
  },

  // 加载商品详情
  userGetProductDetailAction: function(e){
    var productID = e.ID
    var date = new Date().getTime()
    var that = this
    api.apiForCategoryProductDetail({
      method: "POST",
      data: {
        ID: productID,
      },
      query: {
        date: date
      },
      success : (res) =>{
        if(res.data.Code == 0){
          that.setData({ producetDetailModel: res.data.Data })
        }
      }
    })
  },
  /**
   * 用户选择规格数量
   */
  userSelectProductAmountOrScale : function(e){
    debugger
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