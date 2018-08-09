//index.js
//获取应用实例
const app = getApp()
var api = require('../../api/api.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    dateModel : {} ,
    BannerList :[],
    SeckillList : [],
    ActivityList : [],
    HotList : [],
    BannerpageList:[],
    RecommendList : [],

    ProductLists : [],
    catogorySelectColor : '#2f88ff',
    categoryDefaultColor: '#666666',

    productCategoryList: [{
      "ID": 0,
      "TenantID": 1,
      "Name": "首页",
      "Picture": "https://static.mammasay.com/image/20171102/6364522992248564746252872.jpg",
      "PageSize": 100,
      "ParentID": 0,
      "Level": 0,
      "Childs": null
    }],

    userSelectCheckCategoryIndex: 0,

    main_actionArray : ['商品分类','扫码积分','防伪追溯','露安适社区'],
    main_actionImageArray: ['https://lelch.mammasay.com/img/index/home_btn_classify@2x.png',
      'https://lelch.mammasay.com/img/index/home_btn_sweep-code@2x.png', 'https://lelch.mammasay.com/img/index/home_btn_anti-fake@2x.png','https://lelch.mammasay.com/img/index/home_btn_community@2x.png']
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    this.getProductCategoryInfo()
    this.getUserMainPageInfo()
    // wx.reLaunch({
    //   url: '../my/DNLogin/DNLogin',
    // })
    
  },
  // 获取商品分类类别
  getProductCategoryInfo : function(e){
    var date = new Date().getTime()
    api.apiForCategory({
      method: "POST",
      data: {
        TenantID: 1,
        ID: 0
      },
      query: {
        date: date
      },
      success: (res) => {
        var tempCategoryList = this.data.productCategoryList
        tempCategoryList = tempCategoryList.concat(res.data.Data)
        this.setData({ productCategoryList: tempCategoryList })
      }
    })
  },
  // 获取首页数据
  getUserMainPageInfo : function(e){
    var that = this
    var date = new Date().getTime()
    api.apiForMainPageDataSumInfo({
      query:{
        date : date
      },
      success:(res)=>{
        if(res.data.Code == 0){
          that.setData({ 
            BannerList: res.data.Data.BannerList,
            SeckillList: res.data.Data.Seckill.list,
            ActivityList: res.data.Data.ActivityList,
            HotList: res.data.Data.HotList,
            BannerpageList: res.data.Data.BannerpageList,
            RecommendList: res.data.Data.RecommendList})
        }
      }
    })
  },

  //  用户切换查看类别
  userSelectCategoryChangeAction:function(e){
    
    let index = e.currentTarget.dataset.index
    let model = e.currentTarget.dataset.item
    this.setData({ userSelectCheckCategoryIndex: index})
    // 
    if (index == 0){
      this.getUserMainPageInfo()
    }else{
      this.userChangeCategoryForProductListAction(model, index)
    }
  },

  // 加载商品列表数据
  userChangeCategoryForProductListAction: function (e, index){
    var CategoryID = e.ID
    var date = new Date().getTime()
    var that = this
    api.apiForCategoryProductList({
      method: "POST",
      data: {
        PageIndex: 1,
        TenantID: e.TenantID,
        PageSize: 20,
        CategoryID: CategoryID,
      },
      query: {
        date: date
      },
      success: (res) => {
        if (res.data.Code == 0) {
          var tempArr = this.data.ProductLists
          tempArr[index - 1] = res.data.Data
          that.setData({
            ProductLists: tempArr,
          })
        }
      }
    }) 
  },

  // 搜索商品
  userSearchProductAction : function(e){
    wx.navigateTo({
      url: '../classify/ProductSearch/ProductSearch',
    })
  },

  // 用户查看商品详细
  userCheckProductDetailAction : function(e){
    var productID 
    switch (e.currentTarget.dataset.type){
      // 秒杀
      case 1: productID = e.currentTarget.dataset.model.ProductID;break;
      // 活动
      case 2: productID = e.currentTarget.dataset.model.ProductID; break;
      // 热门兑换
      case 3: productID = e.currentTarget.dataset.model.ID; break;
      // 推荐
      case 4: productID = e.currentTarget.dataset.model.ID; break;
      case 100: productID = e.currentTarget.dataset.model.ID;break;
      default: productID = ""; break;
    }
    wx.navigateTo({
      url: '../classify/ProductDetailPage/ProductDetailPage?ID=' + productID,
    })
  },
  // 获取用户选择的商品列表
  userGetProductListAction : function(e){
    
    let model = e.currentTarget.dataset.model;
    var activityID = model.Url.substr(model.Url.lastIndexOf('=') + 1, 1)
    let index = '100'
    wx.navigateTo({
      url: '../classify/ProductListPage/ClassifyProductListPage?index=' + index + '&CategoryID=' + activityID,
    })
  },
  // 用户查看热兑排行榜
  userCheckRankListPage : function(e){
    wx.navigateTo({
      url: 'HotRankListPage/HotRankListPage',
    })
  },
  // 用户查看社区专栏
  userCheckCommunityItemAction:function(e){
    let itemModel = e.currentTarget.dataset.model
    wx.navigateTo({
      url: '../webView/CommunitywebView?content=' + itemModel.Content,
    })
  },
  // 用户选择 “商品分类”、‘扫码积分’、’防伪追溯‘、’露安适社区‘
  userCheckTopAction : function(e){
    let index = e.currentTarget.dataset.index
    switch (index){
      case 0 : wx.switchTab({
        url: '../classify/index',
      }); break;
      case 1: wx.navigateTo({
        url: 'scanQRCodePage/scanQRCodePage?title=扫码积分&type=1',
      }); break;
      case 2: wx.navigateTo({
        url: 'scanQRCodePage/scanQRCodePage?title=防伪追溯&type=2',
      });  break;
      case 3: wx.switchTab({
        url: '../community/index',
      });break;
      default : break;
    }
  },

})
