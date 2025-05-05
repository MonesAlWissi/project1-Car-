const Car = require('../Models/Car');

// إنشاء سيارة جديدة
exports.createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// جلب كل السيارات
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تعديل سيارة
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// حذف سيارة
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'تم حذف السيارة' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
