const postman_request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNzdW1lZGRpeiIsImEiOiJja2d3aGEwYnAwMXppMnNvc2d6ano1NDd0In0.fZhbPFZsv5s4gkr0-do39A&limit=1'
    postman_request({
        url,
        json: true
    }, (error, {body}={}) => {
        if (!error) {
            if (body.features.length === 0) {
                callback({
                    info: 'Location not found.'
                })
            } else {
                const geo = {
                    lat: body.features[0].center[1],
                    long: body.features[0].center[0],
                    name: body.features[0].place_name
                }
                callback(undefined, geo)
            }
        } else {
            callback({
                info: 'Unable to reach the location service.'
            })
        }
    })
}

module.exports = geocode

