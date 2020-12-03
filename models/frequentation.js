const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// var SchemaTypes = mongoose.Schema.Types;

const freqSchema = mongoose.Schema(
    {
        baigneurs: { type: Number, required: true},
        travailleurs_nautiques: { type: Number, required: true},
        bateaux: { 
            peche: {type: Number, required: true},
            loisir: {type: Number, required: true},
            voile: {type: Number, required: true}
        }
    },
    { timestamps: { createdAt: 'created_at' }}
);

// freqSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Frequentation', freqSchema);