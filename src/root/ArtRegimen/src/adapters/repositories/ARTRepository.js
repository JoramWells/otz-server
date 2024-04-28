import ART from "../../../models/art.model"

class ARTRepository{
    async createART(artData){
        return await ART.create(artData)
    }

    async getAllARTs (){
        return await ART.findAll()
    }
}

module.exports = new ARTRepository()