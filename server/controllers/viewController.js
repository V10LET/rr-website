import db from '../db/index.js'

let Mailchimp = require('mailchimp-api-v3')
let mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)

let viewController = {}

viewController.index = function (req, res) {
    return res.render('index.html')
}

viewController.about = function (req, res) {
    return res.render('about.html')
}

viewController.community = function (req, res) {
    return res.render('community.html')
}

viewController.contact = function (req, res) {
    return res.render('contact.html')
}

viewController.blogIndex = function (req, res) {
    let categories = db.getPostCategories()

    let postsByCategory = categories.map(function(category) {
        return {
            category: category,
            categoryClass: category.replace(/ /g, '-'),
            posts: db.getPostsByCategory(category),
        }
    })

    // Add a fake "all" category to the top of the list of categories
    postsByCategory.unshift({
        category: 'all',
        categoryClass: 'all',
        posts: db.getAllPosts(),
    })

    // reverse all of the lists of posts
    for (let category of postsByCategory) {
        category.posts.reverse()
    }

    return res.render('blog-index.html', {
        categories: postsByCategory,
        defaultCategory: 'all',
    })
}

viewController.blogPost = function (req, res) {
    let url = req.params.url
    let post = db.getPostByURL(url)

    if (!post) {
        return res.status(404).render('404.html')
    }
    
    return res.render('blog-post.html', {
        post: post,
    })
}

viewController.mailingList = function (req, res) {
    let { email, name } = req.body
    if (!email) {
        return res.status(400).json({ error: 'Missing email' })
    } else if (!name) {
        return res.status(400).json({ error: 'Missing name' })
    }

    let nameParts = name.split(' ')
    let firstName = nameParts[0]
    let lastName
    if (nameParts.length > 1) {
        lastName = nameParts[1]
    }

    mailchimp.post('/lists/4cb6dba887/members', {
        email_address : email,
        status : 'subscribed',
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
        },
    }).then(function(results) {
        res.status(200).json({})

    }).catch(function (err) {
        console.error('ERROR ~>', err)
        res.status(err.status).json({ error: err.detail })
    })
}

export default viewController
