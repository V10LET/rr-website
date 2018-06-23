import fs from 'fs'
import path from 'path'

let allPosts = []
let byURL = {}

let db = {}

db.init = function() {
	let jsonData = fs.readFileSync(path.join(__dirname, 'blogs.json'), 'utf8')

	// fill the "allPosts" list so that we can list all of the posts on the /blog page
	allPosts = JSON.parse(jsonData)

	// fill the "byURL" object so that we can look up posts by their URL
	for (let blog of allPosts) {
		byURL[ blog.url ] = blog
	}
}

db.getAllPosts = function() {
	return allPosts
}

db.getPostByURL = function(url) {
	return byURL[ url ]
}

export default db
