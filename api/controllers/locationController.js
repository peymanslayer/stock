const LocationService=require('../services/locationService');

module.exports= class LocationController{
   #service=new LocationService();
   async insertLocations(req,res,next){
     const insertLocations=await this.#service.insertLocations(req.file);
     
   } 
}