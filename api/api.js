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

module.exports = {
  getVolById,
  apiForCommunityPage,
  apiForCategory,
  apiForCategoryProduct
}