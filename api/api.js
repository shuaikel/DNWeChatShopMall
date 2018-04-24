const host = 'https://ws.mammasay.com'
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

// Index
const getVolById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id)

// community page
const apiForCommunityPage = (params) => wxRequest(params, host + '/api/cms/lelch/communityPage')

// 获取推荐列表
const apiForCategory = (params) => wxRequest(params, host + '/api/shop/category/getCategoryDown?time=' + params.query.date)

// 分类获取商品列表
const apiForCategoryProduct = (params) => wxRequest(params, host + '/api/shop/category/getCategoryByID?time=' + params.query.date)

// 所有产品获取商品列表
const apiForCategoryProductList = (params) => wxRequest(params, host + '/api/shop/prdoucts/getProductsCategoryPage?time=' + params.query.date)

// 获取商品详情数据
const apiForCategoryProductDetail = (params) => wxRequest(params, host + '/api/shop/prdouct/getPrdouctByID?time=' + params.query.date)

// 获取搜索相关商品
const apiForUserSearchProductList = (params) => wxRequest(params, host + '/api/shop/prdoucts/getPrdouctsPage?time=' + params.query.date)

// 获取评价列表
const apiForProductEvaluateList = (params) => wxRequest(params, host + '/api/shop/productEvaluate/getProductIDEvaluatePage?time=' + params.query.date)

// 获取评价统计数据
const apiForProductEvaluateSumInfo = (params) => wxRequest(params, host + '/api/shop/productEvaluate/getCommentParameter?product=' + params.query.productID+'&time='+params.query.date)

// 首页填充数据
const apiForMainPageDataSumInfo = (params) => wxRequest(params, host + '/api/cms/lelch/homePage?time=' + params.query.date)

// 获取热兑排行
const apiForHotRankList = (params) => wxRequest(params, host + '/api/shop/shop/getExchanges?countNum=30&TenantID=1&time=' + params.query.date)

module.exports = {
  getVolById,
  apiForCommunityPage,
  apiForCategory,
  apiForCategoryProduct,
  apiForCategoryProductDetail,
  apiForCategoryProductList,
  apiForUserSearchProductList,
  apiForProductEvaluateList,
  apiForProductEvaluateSumInfo,
  apiForMainPageDataSumInfo,
  apiForHotRankList
}