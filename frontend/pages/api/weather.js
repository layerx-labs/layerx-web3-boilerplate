import Cors from "cors";
const cors = Cors({
    origin: "*"
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors);
    const { query } = req;

    const lat = query.lat
    const long = query.long
    const precipitation = query.precipitation
    const startdate = query.startdate //timestamp
    const enddate = query.enddate //timestamp

    // convert timestamp to date in format yyyy-mm-dd
    const startdateFormatted = new Date(startdate * 1000).toISOString().slice(0, 10)
    const enddateFormattted = new Date(enddate * 1000).toISOString().slice(0, 10)
    
    // find number of days between startdate and enddate
    const diffTime = Math.abs(enddate - startdate) ;
    const days = Math.ceil(diffTime / (60 * 60 * 24));

    const requestUrl = `https://my.meteoblue.com/packages/historybasic-1h?lat=${lat}&lon=${long}&startdate=${startdateFormatted}&enddate=${enddateFormattted}&format=json&apikey=${process.env.NEXT_PUBLIC_METEOBLUE_API_KEY}`
  
    const response = await fetch(requestUrl)
    const data = await response.json()

    const historyArray = data["history_1h"]
    const precipitationArray = historyArray["precipitation"]
    const precipitationSum = precipitationArray.reduce((a, b) => a + b, 0)
    const precipitationAvg = precipitationSum / days
    console.log(`precipitationAvg: ${precipitationAvg}`)

    res.status(200).json({result: precipitationAvg > precipitation, error: false})
}