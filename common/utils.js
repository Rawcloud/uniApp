function getStorage (obj,callback){
	callback = callback || $.noop;
	uni.getStorage({
		key: obj,
		success: (res) => {
			return callback(res);
		},
		fail: () => {
			console.log('读取数据失败 找不到 key 对应的数据');
		}
	})
}
export default{
	getStorage
}