const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Spare part 
const SparePartSchema = new Schema({
    name: String,                      // name
    shelf_life: Number,                // a shelf life for storage 
    quantity_available: Number,        // how many there are in storage
    buying_price: Number,              // an in-price
    selling_price: Number,             // an out-price
    manufacturer: {                    // manufacturer, 
        name: String,                  // company name, 
        phone: String,                 // phone number, 
        address: String                // headoffice address.
    },
    supplier: {
        name: String,                  // name 
        address: String,               // address
        contact_person: String,        // contact person name 
        phone: String,                 // contact person phone number
        email: String,                 // contact person e-mail
    },                                 // supplier,
    critical_number: Number,           // a number for critical level that should be ordered automatically if too low, 
    arrival_date: Date,                // a date for when the parts have arrived. 
    car_model: String                  // which car and model it fits.
}, { collection: 'spare_parts' });

// Supplier model
const SparePart = mongoose.model('spare_part', SparePartSchema);

module.exports = SparePart;