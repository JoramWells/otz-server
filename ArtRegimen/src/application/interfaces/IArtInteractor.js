import artRepository from '../../adapters/repositories/ARTRepository'

class ARTService{
    async createART(artData){
        return await artRepository.createART(artData)
    }
    async getAllARTs(){
        return await artRepository.getAllARTs()
    }
}

module.exports = new ARTService()