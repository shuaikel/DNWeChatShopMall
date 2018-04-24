

var api = require('../../../api/api.js')
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productEvelauteLoadIndex : 1,
    productID : '',
    producetDetailModel : {},
    segmentSortArray : ['商品','详情','评价'],
    bottomActionIndexArray : ['客服','收藏','购物车'],
    chooseSize : false,
    animationData : {},
    showModal: false,
    userSelectProductScaleStr : '',
    userSelectProductScaleIndex : '100',
    indexSelectBGColor : '#2f88ff',
    indexBGColor : '#f3f3f3',
    indexSelectTitleColor : 'white',
    indexDefaultColor : '#333333',
    productNoOperationBGColor : 'red',
    userSelectProductAmount : 1,

    userSelectCheckIndex : 0, // 用户现在商品，详情，评价指引
    userSelectContainerHeight : '100%',
    productDetailH5Data : '',
    UserSelectProductEvaluteLists : [],
    UserSelectProductEvaluteSumInfo : {},
    userSelectProductEvaluteSumInfoIndexArr : ['全部','好评','中评','差评','有图'],
    userSelectProductEvaluteSumInfoCheckType : 0
  },
  
// 显示弹框View
  showModelView: function () {
    this.setData({
      showModal: true
    })
  },
  // 隐藏弹框View
  hiddenModelAction: function () {
    this.hiddenModelView()
  },
//   隐藏弹框View
  hiddenModelView: function () {
    this.setData({
      showModal: false
    })
  },
  // 用户选择商品的规格
  userSelectProcuctScale : function(e){
    this.setData({ 
      userSelectProductScaleStr: e.currentTarget.dataset.itemmodel.Size,
      userSelectProductScaleIndex: e.currentTarget.dataset.index
    })
  },
  // 用户增加或者减少商品数量
  userAddOrReduceProductAmount :function(e){
    var amount = this.data.userSelectProductAmount
    if (e.currentTarget.dataset.index == 2){
      // 增加商品数量
      amount = amount + 1; 
      this.setData({ userSelectProductAmount: amount})
    } else if (e.currentTarget.dataset.index == 0){
      // 减少商品数量
      amount = amount - 1 < 0 ? 1 : amount -1;
      this.setData({ userSelectProductAmount: amount })
    }
  },
  // 用户将商品加入购物车
  userAddProductToCart : function(e){
    this.hiddenModelView()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userGetProductDetailAction(options) // 加载商品信息
    this.getProductEvaluteListAction()   // 加载商品评价列表
    this.userGetProductEvaluteSumInfo(options) // 加载商品评价列表
  },

  // 加载商品评价统计数据
  userGetProductEvaluteSumInfo : function(e){
    var productID = e.ID
    var date = new Date().getTime()
    var that = this
    api.apiForProductEvaluateSumInfo({
      query:{
        date : date,
        productID: productID
      },
      success : (res)=>{
        if(res.data.Code == 0){
          this.setData({ UserSelectProductEvaluteSumInfo : res.data.Data})
        }
      }
    })
  },

  // 加载商品详情
  userGetProductDetailAction: function(e){
    this.setData({ productID:e.ID});
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
          let replaceNodeStr = res.data.Data.FullDescription
          while (replaceNodeStr.indexOf('_.webp') != -1) { replaceNodeStr = replaceNodeStr.replace('_.webp', '') }
          that.setData({ 
            producetDetailModel: res.data.Data, 
            productDetailH5Data: replaceNodeStr},()=>{
              WxParse.wxParse('productDetailH5Data', 'html', that.data.productDetailH5Data, that, 5);
          })
        }
      }
    })
  },
  /**
   * 用户选择规格数量,显示弹框
   */
  userSelectProductAmountOrScale : function(e){
    this.showModelView(e)
  },
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  // 隐藏
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  // 用户选择商品，详情，评价切换
  userSelectCheckIndexChangeAction:function(e){
    let index = e.currentTarget.dataset.index
    var that = this
    this.setData({ userSelectCheckIndex : index},()=>{

    })
    if (index == 2 && this.data.UserSelectProductEvaluteLists.length<=0){
      this.getProductEvaluteListAction()
    }
  },
  // 加载商品评价列表
  getProductEvaluteListAction : function(e,loadMore){
    var productID = this.data.productID
    var date = new Date().getTime()
    var pageIndex = this.data.productEvelauteLoadIndex
    var that = this
    api.apiForProductEvaluateList({
      method:'POST',
      data: {
        PageIndex: pageIndex,
        PageSize	:20,
        ProductID: productID,
        GoodorBad	:0
      },
      query:{
        date : date
      },
      success:(res)=>{
        
        if (res.data.Data.length > 0){
           // 
          pageIndex = pageIndex + 1;
          var tempArr = this.data.UserSelectProductEvaluteLists;
          if(loadMore){
            tempArr = tempArr.concat(res.data.Data)
            this.setData({ productEvelauteLoadIndex: pageIndex, UserSelectProductEvaluteLists: tempArr})
          }else{
            this.setData({ productEvelauteLoadIndex: pageIndex, UserSelectProductEvaluteLists:res.data.Data})
          }
          
        }
      }
    })
  },
  //  用户选择全部，好评，中评，差评，有图等
  userSelectProductEvaluteSumInfoCheckAction :function(e){
    let index = e.currentTarget.dataset.index
    if (index != this.data.userSelectProductEvaluteSumInfoCheckType){
      this.setData({ userSelectProductEvaluteSumInfoCheckType : index})
    }
  },
// 加载更多评论数据
  productEvaluteLoadMoreAction : function(e){
    if (this.data.userSelectCheckIndex == 2){
      this.getProductEvaluteListAction(e, true)
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