
var api = require('../../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageIndex : 1,
    ProductLists : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userGetCategoryProductByParam(options)
  },
  /**
   * 加载商品列表
   */
  userGetCategoryProductByParam : function(e){
    var DifferentType = ''
    var TagWeight = ''
    var PageIndex = this.data.PageIndex
    var date = new Date().getTime()
    if (e.index == '0' || e.index == '1' || e.index == '2'){
      DifferentType = 2
    }
    if (e.index == '3'){
      TagWeight = 1;
    }else if(e.index == '4'){
      TagWeight = 2;
    }
    api.apiForCategoryProduct({
      method: "POST",
      data: {
        PageIndex: PageIndex,
        TenantID: 1,
        PageSize : 20,
        SortType : 0,
        CategoryID : '',
        Sortkey : 2,
        DifferentType: DifferentType,
        SeasonWeight : '',
        TagWeight: TagWeight,
        Name : '',
      },
      query: {
        date: date
      },
      success: (res) => {
        if (res.data.Code == 0){
          var tempArray = this.data.ProductLists
          tempArray = tempArray.concat(res.data.Data)
          this.setData({ ProductLists: tempArray })
        }
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
    
  }
})