var baseUrl='http://weixin.piesat.cn/jms/';
function login(dataJson,callback){
	callback = callback || $.noop;
	uni.showLoading();
	uni.request({
		url: baseUrl+'Login/selectLoginResponseList',
		data: dataJson,
		success: (res) => {
			uni.hideLoading();
			// console.log('request success'+JSON.stringify(res.data));
			return callback(res.data);
		},
		fail: (err) => {
			uni.hideLoading();
			console.log('request fail', err);
			uni.showModal({
				content:'登录失败，请稍后重试！',
				showCancel:false
			})
		},
		complete:()=> {
			uni.hideLoading();
		}
	})
}

export {
		login
}