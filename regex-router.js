// jshint asi: true
// jshint esversion: 6
// jshint node: true
"use strict"
module.exports = class Router extends Array {
	indexOf (regex) {
		for (var i = 0, len = this.length; i < len; i++)
			if (regex.toString() === this[i].regex.toString())
				return i
		return -1
	}

	add_route (method, regex, handler) {
		let i = this.indexOf(regex)
		if (i >= 0) this[i][method] = handler
		else {
			let obj = {}
			obj.regex = regex
			obj[method] = handler
			this.push(obj)
		}
	}

	match (req) {
		for (let i = 0, len = this.length; i < len; i++) {
			const params = this[i].regex.exec(req.url.pathname)
			if (params === null) continue
			else {
				params.shift()
				req.params = params
				return this[i]
			}
		}
		return null
	}
}
