const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const getweather = require('./getweather')

const app = express()
const port =  process.env.PORT || 3000
//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
//setup static dir to  serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Mq'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Mq'
    })

})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mq'
    })
})
app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (err, location) => {
            if (err) {
                res.send({
                    error: err.info
                })
            } else {
                getweather(location, (err, forecast) => {
                    if (err) {
                        res.send({
                            error: err.info
                        })
                    } else {
                        res.send({
                            forecast,
                            address: req.query.address,
                            location: location.name
                        })
                    }
                })
            }
        })
    } else {
        res.send({
            error: 'No location provided!'
        })
    }
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather app',
        error: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather app',
        error: 'Page not found.',
        name: 'Mq'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})