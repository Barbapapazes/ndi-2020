const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// var SchemaTypes = mongoose.Schema.Types;

const declarationSchema = mongoose.Schema(
    {
        commentaire: { type: String, required: true},
        Pertinence: { type: Number, required: true, default: 1, enum: [1,2,3,4,5,6,7,8,9,10]},
        type_pol: {type: String, default: "Autre", enum: ["Crème solaire","Parfum","Crème hydratante","Maquillage","Essence","Cigarette","Engrais","Peintures","Autre"]}
    },
    { timestamps: { createdAt: 'created_at' }}
);


module.exports = mongoose.model('Declaration', declarationSchema);