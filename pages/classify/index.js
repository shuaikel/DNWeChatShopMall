
var api = require('../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryLists: [{
      "ID": 0,
      "TenantID": 1,
      "Name": "所有产品",
      "Picture": "",
      "PageSize": 100,
      "ParentID": 0,
      "Level": 0,
      "Childs": ['按新品查看','按销量查看','按价格查看','参与积分','参与兑换']
    }],
    currentSelectCategory:0,
    indexBGColor : '#f3f3f3',
    indexSelectBGColor : 'white',
    categoryProductLists : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryIndexAction()
  },
  /**
   * 获取推荐列表
   */
  getCategoryIndexAction:function(e){
    var date = new Date().getTime()
    api.apiForCategory({
      method: "POST",
      data:{
        TenantID : 1,
        ID : 0
      },
      query:{
        date: date
      },
      success:(res)=>{
        var tempCategoryList = this.data.categoryLists
        tempCategoryList = tempCategoryList.concat(res.data.Data)
        this.setData({ categoryLists: tempCategoryList})
      }
    })
  },
  /**
   * 用户选择某一个产品分类
   */
  handleUserSelectProductCategory:function(e){
    let index = e.currentTarget.dataset.index 
    this.setData({ currentSelectCategory: index})
    if (index == 0)return;
    // 加载推荐商品列表
    var date = new Date().getTime()
    api.apiForCategoryProduct({
      method: "POST",
      data: {
        TenantID: 1,
        ID: index
      },
      query: {
        date: date
      },
      success: (res) => {
        var tempArray = this.data.categoryProductLists
        tempArray[index-1] = res.data.Data
        this.setData({ categoryProductLists: tempArray})
      }
    })
  },
  /**
   * 所有产品时用户选择查看类别
   */
  userCheckProductAction:function(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'ProductListPage/ClassifyProductListPage?index='+index,
    })
  },
  /**
   * 用户选择分类非所有产品类别时响应
   */
  userSelectProductSerialAction : function(e){
    let model = e.currentTarget.dataset.model;
    let index = '100'
    wx.navigateTo({
      url: 'ProductListPage/ClassifyProductListPage?index=' + index +'&CategoryID='+model.ID,
    })
  },
  /**
   * 用户搜索事件
   */
  userSearchAction: function(e){
    wx.navigateTo({
      url: 'ProductSearch/ProductSearch',
    })
  },
  /**
   * 用户点击banner
   */
  userTapBannerImageViewAction : function(e){
    let index = this.data.currentSelectCategory
    wx.navigateTo({
      url: 'ProductListPage/ClassifyProductListPage?index=' + '100' + '&CategoryID=' + index.toString(),
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