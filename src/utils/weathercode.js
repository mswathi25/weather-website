const request = require('request')
module.exports= (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=b174e84584a93c97da835b2e8296ebab&query=" + longitude + "," + latitude + "&units=f";
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to mapbox app", undefined);
        } else if (body.error) {
            callback("specify proper coordinates", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. But it feels like " + body.current.feelslike + " degrees");
        }

    });
}
