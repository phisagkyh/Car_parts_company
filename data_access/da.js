const Person = require('../models/person');
const SparePart = require('../models/spare_part');
const mongoose = require('mongoose');


function connect2db() {
    mongoose.connect('mongodb://localhost:27017/car_parts_company',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePart(p, cb) {
    connect2db();
    var spare_part = new SparePart({
        name: p.name,                                       // name
        shelf_life: p.shelf_life,                           // a shelf life for storage 
        quantity_available: p.quantity_available,           // how many there are in storage
        buying_price: p.buying_price,                       // an in-price
        selling_price: p.selling_price,                     // an out-price
        manufacturer: {                                     // manufacturer, 
            name: p.manufacturer_name,                      // company name, 
            phone: p.manufacturer_phone,                    // phone number, 
            address: p.manufacturer_address                 // headoffice address.
        },
        supplier: {
            name: p.supplier_name,                          // name 
            address: p.supplier_address,                    // address
            contact_person: p.supplier_contact_person,      // contact person name 
            phone: p.supplier_phone,                        // contact person phone number
            email: p.supplier_email,                        // contact person e-mail
        },                                                  // supplier,
        critical_number: p.critical_number,                 // a number for critical level that should be ordered automatically if too low, 
        arrival_date: p.arrival_date,                       // a date for when the parts have arrived. 
        car_model: p.car_model                              // which car and model it fits.
    });
    spare_part.save(function(err){
        if(err) {
            console.log("Error creating user" + err)
        }
        cb(err);
    });
}

function searchPart(pattern, cb) {
    connect2db();
    SparePart.find({$or: [
                        {name: {$regex: pattern }}
                      ]
    }, function(err, parts){
        cb(err, parts);
    });
}

function deletePart(id, cb) {
    connect2db();
    SparePart.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}


function getAllParts(cb) {
    connect2db();
    SparePart.find(function(err, parts) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, parts);
    });
}




module.exports = {
    savePartFromForm: savePart,
    findParts: getAllParts,
    searchPart: searchPart,
    deletePart: deletePart,
};