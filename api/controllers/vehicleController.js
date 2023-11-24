const { models } = require('../models/index.js');

const createVehicle = async (req, res) => {
  try {
    const { code, name , name2,box_count,bottom_box_count } = req.body;
    let publicUrl = null;    

    if (req.image) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const filename = req.file.filename;
      publicUrl = `/uploads/${year}/${month}/${day}/${filename}`;    
    }
    name
    const vehicle = await models.Vehicle.create({ box_count,bottom_box_count,code, name, image : publicUrl, name2 });
    res.status(201).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const { id, page } = req.query;
    if(id){
      const vehicle = await models.Vehicle.findOne({
       where:{id:Number(id)}
      });
      res.status(200).json(vehicle);
    }else{
      const vehicles = await models.Vehicle.findAndCountAll({
        limit: 20,
        offset: page ? (Number(page) - 1) * 20 : 0,
        order: [['id', 'DESC']],
      });
      res.status(200).json(vehicles);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error', error });
  }
};

const getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await models.Vehicle.findByPk(id);
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { code, name , name2,box_count,bottom_box_count } = req.body;
  try {
    const [updated] = await models.Vehicle.update({ box_count,bottom_box_count,code, name, name2 }, {
      where: { id },
    });
    if (updated) {
      const updatedVehicle = await models.Vehicle.findByPk(id);
      res.status(200).json(updatedVehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await models.Vehicle.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'نوع وسیله نقلیه حذف شد' });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
