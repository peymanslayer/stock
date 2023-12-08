const LocationService = require("../services/locationService");
const service = new LocationService();

module.exports = class LocationController {
  async insertLocationsByExcel(req, res) {
    try {
      const insertLocations = await service.insertLocations(req.file);
      res.status(insertLocations.status).json(insertLocations.message);
    } catch (err) {
        console.log(err);
      res.status(500).json("internal server error");
    }
  }

  async fillLocation(req, res) {
    try {
      const fillLocation = await service.fillLocation(req.body);
      res.status(fillLocation.status).json(fillLocation.message);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async setLocationEqualEmpty(req, res) {
    try {
      const setLocationEqualEmpty = await service.setLocationEqualEmpty(
        req.body
      );
      res
        .status(setLocationEqualEmpty.status)
        .json(setLocationEqualEmpty.message);
    } catch (err) {
      res.status(500).json("internal server error");
    }
  }

  async orderBySituation(req,res) {
    try {
     const orderBySituation=await service.orderBySituation(req.body);
     res.status(orderBySituation.status).json(orderBySituation.message);
    } catch (err) {
     console.log(err);
     res.status(500).json('internal server error');
    }
  }

  async findOneLocation(req,res){
    try{
      const findOneLocation=await service.findOneLocation(req.body);
      res.status(findOneLocation.status).json(findOneLocation.message);
    }catch(err){
      res.status(500).json('internal server error');
    }
  }

  async findValidNumberAndCharacter(req,res){
    try{
      const findValidNumberAndCharacter=await service.listOfValidCharacterAndNumberOfLocation(req.body);
      res.status(findValidNumberAndCharacter.status).json(findValidNumberAndCharacter.message);

    }catch(err){
      res.status(500).json('internal server error');
    }
  }

  async orderPallet(req,res){
    try{
     const orderPallet=await service.orderPallet(req.body);
     console.log(orderPallet.message);
     res.status(orderPallet.status).json(orderPallet.message);

    }catch(err){
      console.log(err);
     res.status(500).json('internal')
    }
  }

  async fillPallet(req,res){
   try{
    const fillPallet= await service.fillPallet(req.body);
    res.status(fillPallet.status).json(fillPallet.message)
   }catch(err){
    console.log(err);
    res.status(500).json('internal server error')
   }
  }
};
