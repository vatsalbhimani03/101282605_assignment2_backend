const mongoose = require('mongoose');
require('mongoose-type-email');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const employeeSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    LastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;