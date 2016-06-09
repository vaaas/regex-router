# regex-router

A very simple router based on regular expressions.

# Usage

```javascript
	const router = require("regex-router")
	
	// creating routes
	// use the method name, a regular expression object, and a function
	myrouter = new router()
	myrouter.add_route("GET", RegExp("^/$"), my_root_callback)
	myrouter.add_route("PUT", RegExp("^/posts/(.+)$"), my_post_creator_callback)

	// matching routes
	// returns an object of defined functions if found, otherwise null
	function request_listener (req, res) {
		req.url = url.parse(req.url)
		const m = myrouter.match(req)
		if (m === null)
			// not found
		else if (m[req.method] === undefined)
			// method not allowed
		else
			m[req.method](req, res)
	
	// callbacks
	// the request object is populated with the param property
	function my_post_creator_callback (req, res) {
		const post_name = req.params[0]
	}
```
