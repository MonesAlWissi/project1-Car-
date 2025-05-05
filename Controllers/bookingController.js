const Booking = require('../mdels/Booking');
const Car = require('../mdels/Car');

// إنشاء حجز
exports.createBooking = async (req, res) => {
  try {
    const { car, startDate, endDate } = req.body;
    const carData = await Car.findById(car);
    if (!carData) return res.status(404).json({ message: 'السيارة غير موجودة' });

    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * carData.pricePerDay;

    const booking = await Booking.create({
      user: req.user.id,
      car,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// عرض الحجوزات الخاصة بالمستخدم
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('car');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// (اختياري) عرض كل الحجوزات (للمشرف فقط)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car user');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
