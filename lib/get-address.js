//function to return address from latitude and longitude
const {Client} = require("@googlemaps/google-maps-services-js");

export const getAddress = async (latitude, longitude) => {
    const client = new Client();
    const data = await client.reverseGeocode({ params: {
            key: process.env.GEOCODER_API_KEY,
            latlng: `${latitude},${longitude}`
        } });
    return data.data.results[0].formatted_address
}
