const express = require('express')
const fs = require('fs')
const querystring = require('querystring')
const http = require('http')
const moment = require('moment');
const fetch = require('isomorphic-fetch')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// Set port
const dev = process.env.NODE_ENV !== 'staging' || process.env.NODE_ENV !== 'production'
const port = dev ? process.env.NODE_PORT : 80

// Set url
const URLBROADCAST = process.env.NODE_URLBROADCAST
const URLCRON = process.env.NODE_URLCRON

// Set output
const welcome = { 'status': 200, 'message': 'Welcome to our api!' }
const received = { 'status': 200, 'message': 'already received' }

const app = express()

// Root Api Node To ANC
app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.json(welcome)
})

// Api Send Noti To ANC Date time
app.post('/nodeancnoti', multipartMiddleware, function(req, res) {
    postDataFromAPI(req)
    res.json(received)

    // don't forget to delete all req.files when done
});

const postDataFromAPI = async(req) => {
    try {
        const {
            app_id,
            use_development_cert,
            url,
            alert,
            screen,
            noti_ref,
            ref_id,
            send_date,
            type_noti
        } = req.body


        const datapost = {
            'app_id': app_id,
            'use_development_cert': use_development_cert,
            'url': url,
            'alert': alert,
            'screen': screen,
            'noti_ref': noti_ref,
            'ref_id': ref_id,
            'send_date': send_date,
            'type_noti': type_noti
        }

        // Get url
        let url_anc;
        switch (type_noti) {
            case 'now':
                url_anc = URLBROADCAST;
                break;
            case 'settime':
                url_anc = URLCRON;
                break;
            default:
                url_anc = '';
        }

        // Send datas to ANC
        const response = await fetch(url_anc, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: datapost
        })
        const data = await response.json()

        // For Test
        // console.log(url_anc);
        // console.log(datapost);
        // const data = 'test mode !!!';

        console.log(data)
    } catch (e) {
        console.log(e.message)
    }
}

app.listen(port, function() {
    console.log('listening on port! ' + port)
})