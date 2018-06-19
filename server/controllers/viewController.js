const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)

const viewController = {}

viewController.index = function (req, res) {
    return res.render('index.html')
}

viewController.mailingList = function (req, res) {
    const { email, name } = req.body
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
        console.log('results ~>', results)
        res.status(200).json({})

    }).catch(function (err) {
        console.error('ERROR ~>', err)
    })
}

export default viewController
