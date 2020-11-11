const postman_request = require('postman-request')

const getweather = ({lat,long,name}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=23a1cd7dcb934016409ee2d4bc730702&query=' + lat +','+ long
    postman_request({
        url,
        json: true
    }, (error, {body}={}) => {
        if (!error) {
            if (body.error) {
                callback({
                    info: body.error.info + ' - code: ' + body.error.code
                })
            } else {
                callback(undefined, body.current.weather_descriptions[0] + '. Its currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
            }
        } else {
            callback({
                info: 'Unable to reach weather service.'
            })
        }
    })
}
module.exports = getweather