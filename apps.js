//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https =require('https')
const { options } = require('request')

const app = express()
const port = 8080

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+ '/signup.html')
})

app.post("/",(req,res)=>{
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/75cef08fe2"

    const options = {
        method: "POST",
        auth:"zahar7:5b43c6b8b00597419ae039177b3b2b4bd-us21"
    } 

    const request = https.request(url,options, (response)=>{
        
        if(response.statusCode === 200){
            res.sendFile(__dirname+ '/success.html')
        }else{
            res.sendFile(__dirname+ '/failure.html')
        }

        response.on("data",(data)=>{
            console.log(JSON.parse(data));
            
        })
    })

    request.write(jsonData);
    request.end()
})

app.post("/failure",(req,res)=>{   
    res.redirect('/');
})

app.listen(process.env.PORT || port,()=>{
    console.log(`app listening on port ${port}`)
})



//API key
// 5b43c6b8b00597419ae039177b3b2b4b-us21

//audiens ID
//75cef08fe2