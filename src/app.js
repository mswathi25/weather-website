const path = require('path')
const express= require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weathercode = require('./utils/weathercode')
const app =express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

///Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather app',
        name: 'Swathi'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send( {
            error: 'Please provide address' 
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        weathercode(longitude ,latitude, (error, response)=>{
            if(error) {
                return res.send({
                error: error
                })
            }
            res.send({
                forecast: response,
                location,
                address: req.query.address
            })
        })
        
    })
    
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must specify a search item"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Swathi'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'We are here to help you',
        name: 'Swathi'
    })
})


app.get('/help/*',(req,res) => {
    res.render('notfound',{
        title: 'We are here to help you',
        name: 'Swathi',
        error: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('notfound',{
        title: 'We are here to help you',
        name: 'Swathi',
        error: 'Page not found'
    })
})

app.listen(port, () =>{
    console.log("Server is up on port" + port)
});