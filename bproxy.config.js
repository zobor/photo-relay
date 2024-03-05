module.exports = {
	"debug": false,
	"disableCache": true,
	"port": 8888,
	"https": true,
	"rules": [
		{
			"url": {
				
			},
			"proxy": "http://127.0.0.1:4780"
		},
		{
			"url": "https://qq.com/bproxy",
			"target": "hello bproxy\n"
		}
	]
}