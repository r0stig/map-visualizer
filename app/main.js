'use strict'

let geoip = require('geoip-lite')
let express = require('express')
let Primus = require('primus')
let http = require('http')
let app = express()

app.use('/', express.static('public'))

let server = http.createServer(app)

let primus = new Primus(server, {
	transformer: 'sockjs',
	parser: 'JSON'
})


server.listen(3000, function () {
	console.log('listening...')
})

primus.on('connection', function (spark) {
	console.log('new connection')

	setInterval(function () {
		spark.write(getRandCoord())
	}, 1000)

	setInterval(function () {
		spark.write({
			type: 'requests',
			value: (Math.random() * 5 + 5)
		})
	} , 1000)
})

primus.save(__dirname + '/../public/primus.js')


function getRandCoord () {
  return [((Math.random() * 10) - 5) + 15,
  ((Math.random() * 10) - 5) + 63]
}

console.log(geoip.lookup('85.224.105.149'))

console.log(geoip.lookup('85.24.214.204'))