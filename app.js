const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})
app.post('/', (req, res) => {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email 
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data) 
    const list_id = 'e096ff7e5e'
    const api_key = '2edff36a4e68567857911d79d7becffa-us6'
    const url = `https://us6.api.mailchimp.com/3.0/lists/${list_id}`
    const options = {
        method: 'POST',
        auth: `sang_tqs:${api_key}`

    }
    const request = https.request(url, options, (response) => {
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end()
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// 
// 