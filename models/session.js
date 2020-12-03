const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// var SchemaTypes = mongoose.Schema.Types;

const sessionSchema = mongoose.Schema(
    {
        frequentation: {
            baigneurs: { type: Number, required: true},
            travailleurs_nautiques: { type: Number, required: true},
            bateaux: { 
                peche: {type: Number, required: true},
                loisir: {type: Number, required: true},
                voile: {type: Number, required: true}
            }
        },
        date_debut: { type: Date, required: true, default: Date.now},
        date_fin: { type: Date, required: true, default: Date.now},
        produits_utilises: {type: Array},
        declarations: [
            {type: mongoose.SchemaTypes.ObjectId, ref: 'Declaration'}
        ],
        spot: {type: mongoose.SchemaTypes.ObjectId, ref: 'Declaration'}
    },
    { timestamps: { createdAt: 'created_at' }}
);


module.exports = mongoose.model('Session', sessionSchema);