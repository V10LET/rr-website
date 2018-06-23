import fs from 'fs'
import path from 'path'

let allPosts = []
let postsByURL = {}
let postsByCategory = {}
let postCategories = []

let db = {}

db.init = function() {
	let jsonData = fs.readFileSync(path.join(__dirname, 'blogs.json'), 'utf8')

	// fill the "allPosts" list so that we can list all of the posts on the /blog page
	allPosts = JSON.parse(jsonData)

	// fill the "postsByURL" object so that we can look up posts by their URL
	for (let post of allPosts) {
		postsByURL[ post.url ] = post

		if (post.categories) {
			for (let category of post.categories) {
				postsByCategory[category] = postsByCategory[category] || []
				postsByCategory[category].push(post)
			}
		}
	}
	postCategories = Object.keys(postsByCategory)
}

db.getAllPosts = function() {
	return allPosts.slice(0)
}

db.getPostsByCategory = function(category) {
	return postsByCategory[ category ].slice(0)
}

db.getPostCategories = function() {
	return postCategories.slice(0)
}

db.getPostByURL = function(url) {
	return Object.assign({}, postsByURL[ url ])
}

export default db
