// 负责封装请求
var request = function (url, method = "get", data = {}, header = {}) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '数据加载中'
        })
        // 执行逻辑
        wx.request({
            url: url,
            method: method,
            data: data,
            header: header,
            success: (res) => {
                wx.hideLoading()
                // this 的指向
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            }
        })
    })
}

// 扩展封装一上get的方法
request.get = function (url, data) {
    return request(url, "get", data, {})
}

// 扩展一个 post 方法
request.post = function(url, data) {
    return request(url, "post", data, {})
}

// 暴露方法
export default request