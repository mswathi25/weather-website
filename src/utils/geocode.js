const request = require('request')
module.exports = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibXN3YXRoaSIsImEiOiJjazl2N2lwMjkwMHo5M2lzNHNxZnN0eDhjIn0.gP0fI8JPvOxfkHXBOVWAsw&limit=1";
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to mapbox app", undefined);
        } else if (body.features.length === 0) {
            callback("specify a valid search address", undefined);
        } else {
            //.log(body.features[0].place_name);
            callback(undefined, {longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}
