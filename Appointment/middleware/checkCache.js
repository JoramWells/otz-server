const redis = require('redis')

const client = redis.createClient()

function checkCache(req,res, next){
    const key = req.path

    // check if data
    client.get(key, (err, data)=>{
        if(err) throw err
        if(data){
            res.json(JSON.parse(data))
        }
    })
    next()
}