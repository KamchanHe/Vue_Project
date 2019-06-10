const express=require('express');
const querystring=require('querystring');
const axios=require('axios');
const app=express();
app.get('/getIndexList',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/other/index',
		headers:{
			referer:'http://www.app-echo.com/'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getRecommendsList',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		accept:'application/json',
		url:'http://www.app-echo.com/sound/exploration',
		params:{page:req.query.page},
		headers:{
			'Accept': 'application/json',
			'Referer': 'http://www.app-echo.com/sound/exploration',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
			'X-Requested-With': 'XMLHttpRequest',
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getLyric',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/sound/info?id='+req.query.id+'&comment=1',
		headers:{
			referer:'http://www.app-echo.com/'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getIndexChannel',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/channel/index?page='+req.query.page+'&tag_id='+req.query.tag_id,
		headers:{
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getIndexChannelTag',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/channel/tag',
		headers:{
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getIndexChannelList',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/channel/info?id='+req.query.id+'&order='+req.query.order+'&page='+req.query.page,
		headers:{
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getSuggestion',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/search/suggestion-words?keyword='+encodeURIComponent(req.query.keyword),
		headers:{
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getSearchInfo',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/search/sound?limit=10&src=0&keyword='+encodeURIComponent(req.query.keyword)+'&page='+req.query.page,
		headers:{
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getMrList',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/famous/famous-user?limit='+req.query.limit,
		headers:{
			'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,da;q=0.6',
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getQxList',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/famous/top-user?limit=12&page='+req.query.page,
		headers:{
			'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,da;q=0.6',
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getXrzList',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/famous/latest-users?limit=16&page='+req.query.page,
		headers:{
			'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,da;q=0.6',
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getTjList',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/famous/recommend-users?limit=16&page='+req.query.page,
		headers:{
			'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,da;q=0.6',
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getStarInfo',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/user/info?id='+req.query.id,
		headers:{
			'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,da;q=0.6',
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest',
			'Connection': 'keep-alive',
			'Cookie': '_csrf=921366b8c088f31cb7d8830e8010dd652d8d0a4273ddd48c32d7b1be2975a52da%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22OJhcFz8uHs22PjMTHWyrZZGChS4FxRdj%22%3B%7D; Hm_lvt_46b3b8e7eb78200527b089c276c81a7e=1559527472,1559527751; search_history=aa%2Cnihao%2Ca%2Cantastic%20Melody%20of%203D%20Music%2Cfantastic%20Melody%20of%203D%20Music%2CFantastic%20Melody%20of%203D%20Music%2C%E4%BD%A0%E5%A5%BD%2Csadfsdfasf; Hm_lvt_8c9a0b394fc1f4d9177f4869cfd72618=1560000428; Hm_lpvt_8c9a0b394fc1f4d9177f4869cfd72618=1560000445; echo_language=0fa769e85f49c8f39f1a51b419d5ec98c7821fcdb7666236b7c498a20cee27fea%3A2%3A%7Bi%3A0%3Bs%3A13%3A%22echo_language%22%3Bi%3A1%3Bs%3A2%3A%22cn%22%3B%7D; PHPSESSID=eml4d3rvjogvsrdb5917s01esl; Hm_lpvt_46b3b8e7eb78200527b089c276c81a7e=1560009976; view_statistics_type=api%2Fuser.following; MP_LIST=1043075%2C1631395%2C111822'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.get('/getStarSong',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method:'get',
		url:'http://www.app-echo.com/api/star/info?uid='+req.query.id,
		headers:{
			'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,da;q=0.6',
			'Host': 'www.app-echo.com',
			'Referer': 'http://www.app-echo.com/',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(response=>{
		res.json(response.data)
	})
});
app.listen(3000);






















