const express = require('express')
const app = express()
const fs = require('fs')
const querystring = require('querystring')
const http        = require('http')
const moment = require('moment');
const fetch = require('isomorphic-fetch')
const bodyParser = require('body-parser');
const dev = process.env.ENV !== 'staging' || process.env.ENV !== 'production'
const port        = !dev ? process.env.PORT : 80
const URLBROADCAST = process.env.URLBROADCAST
const URLCRON = process.env.URLCRON
const hardcode = {"status":200,"message":"success"}
const welcome = {"status":200,"message":"Welcome to our api!"}
const received = {"status":200,"message":"already received"}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// setInterval(function(){ 
// 	console.log(received)
// }, 2000);
//==============================================================================
//Root Api Node To ANC
app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.json(welcome)
})
//==============================================================================
//Api Send Noti To ANC Date time
app.post('/nodeancnoti', (req,res) => {
	postDataFromAPI(req)
	res.json(received)
})
//==============================================================================
const postDataFromAPI = async (req) => {

	try{
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
			"app_id" : app_id,
			"use_development_cert" : use_development_cert,
			"url" : url,
			"alert" : alert,
			"screen" : screen,
			"noti_ref" : noti_ref,
			"ref_id" : ref_id,
			"send_date" : send_date,
			"type_noti" : type_noti
		}

		let url_anc = '';
		if(type_noti == "now"){
			url_anc = URLBROADCAST
		}else{
			url_anc = URLCRON
		}
		const response = await fetch(url_anc, {
			method:"POST",
			headers: {
		        'Content-Type': 'application/json'
		    },
		    body:datapost
		})

	    const data = await response.json()

	    console.log(data)
	}catch(e){
		console.log(e.message)
	}
}



app.listen(port, function () {
  // console.log('Example app listening on port!'+port)
})

