
var api = require('../../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageIndex : 1,  // 加载页数
    ProductLists : [],
    index : '', // 页面指示
    searchKeys : ['新品','价格','可积分','可兑换'],
    sortIndex : 0,
    defaultColor :'#333333',
    selectColor : '#2f88ff',
    SortType : 0,
    DifferentType : '',
    TagWeight : '',
    CategoryID : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DifferentType = ''
    var TagWeight = ''
    var CategoryID = ""
    var e = options.index
    var that = this
    if (e == '0' || e == '1' || e == '2' || e=='100') {
      DifferentType = 2
    }
    if (e == '100'){
      CategoryID = options.CategoryID
    }
    if (e == '3') {
      TagWeight = 1;
    } else if (e == '4') {
      TagWeight = 2;
    }
    this.setData({ 
      index: options.index, 
      DifferentType: DifferentType, 
      TagWeight: TagWeight, CategoryID: CategoryID},()=>{
        that.userGetCategoryProductByParam(options.index)
      })
    
  },
  /**
   * 加载商品列表
   */
  userGetCategoryProductByParam : function(e,isLoadMore){
    var DifferentType = this.data.DifferentType
    var TagWeight = this.data.TagWeight
    var SortType = this.data.SortType
    var PageIndex = this.data.PageIndex
    var CategoryID = this.data.CategoryID
    var date = new Date().getTime()

    api.apiForCategoryProductList({
      method: "POST",
      data: {
        PageIndex: PageIndex,
        TenantID: 1,
        PageSize : 20,
        SortType: SortType,
        CategoryID: CategoryID,
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
          var itemIndex = this.data.PageIndex
          if (res.data.Data.length > 0){
            itemIndex = itemIndex + 1
            if (isLoadMore == true){
              tempArray = tempArray.concat(res.data.Data)
              this.setData({
                ProductLists: tempArray,
                PageIndex: itemIndex
              })
            }else{
              this.setData({
                ProductLists: res.data.Data,
                PageIndex: itemIndex
              })
            }
          }
        }
      }
    }) 
  },
  /**
   * 加载更多数据
   */
  bindscrolltolowerAction : function(e){
    this.userGetCategoryProductByParam(this.data.index,true)
  },
  /**
   * 用户更改排序规则
   */
  userChangeSortAction : function(e){
    let sortIndex = e.currentTarget.dataset.sortindex
    var SortType;
    var DifferentType;
    var TagWeight;
    const that = this;
    if (sortIndex == 0){
      SortType = 0
      DifferentType = 2
      TagWeight = ''
    }else if(sortIndex == 1){
      SortType = 0
      DifferentType = ''
      TagWeight = ''
    }else if(sortIndex == 2){
      SortType = 1
      DifferentType = ''
      TagWeight = 1
    }else{
      SortType = 1
      DifferentType = ''
      TagWeight = 2
    }
    this.setData({
      SortType: SortType,
      DifferentType: DifferentType,
      TagWeight: TagWeight, 
      PageIndex: 1, 
      sortIndex: sortIndex
    }, (e) => {
      that.userGetCategoryProductByParam(this.data.index, false)
    })
    
  },
  /**
   * 查看商品详情
   */
  userCheckProductDetailAction :function(e){
    var productID = e.currentTarget.dataset.itemmodel.ID
    wx.navigateTo({
      url: '../ProductDetailPage/ProductDetailPage?ID=' + productID,
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