
var api = require('../../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommandArr : ['面膜',"手霜",'纸尿裤','卫生巾','沐浴露'],
    PageIndex : 1,
    ProductLists : []
  },
  /**
   * 加载商品数据
   */
  loadDataAction :function(e){
    var date = new Date().getTime()
    var PageIndex = this.data.PageIndex
    api.apiForUserSearchProductList({
      method:'POST',
      query:{
        date: date
      },
      data: {
        PageIndex: PageIndex,
        TenantId: 1,
        PageSize: 20,
        SortType: 0,
        CategoryID: '',
        Sortkey: 0,
        SeasonWeight: 0,
        Name: '',
      },
      success:(res)=>{
        
        if(res.data.Code == 0){
          let pageIndex = this.data.PageIndex;
          var tempArr = this.data.ProductLists
          if(res.data.Data.length > 0){
            tempArr = tempArr.concat(res.data.Data)
            pageIndex = pageIndex + 1;
            this.setData({ ProductLists: tempArr, PageIndex: pageIndex })
          }
        }
      }
    })
  },
 // 用户搜索事件 
  userSearchWithParam : function(e){
  },

  // 文本框输入结束
  bindconfirmAction : function(e){
    debugger
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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