const mongoose = require('mongoose');
const professionalSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true ,
        },
        category: { 
            type: String, 
            required: true,
        },
        tags: [String],
        isActive: { 
            type: Boolean, 
            default: true,
         },
    }, {
        timestamps: true,
    });

    const Professional = mongoose.model('Professional', professionalSchema);

    module.exports = Professional;