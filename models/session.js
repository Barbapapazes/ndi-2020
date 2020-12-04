const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
    {
        frequentation: {
            baigneurs: { type: Number, required: true, default: 0},
            travailleurs_nautiques: { type: Number, required: true, default: 0},
            bateaux: { 
                peche: {type: Number, required: true, default: 0},
                loisir: {type: Number, required: true, default: 0},
                voile: {type: Number, required: true, default: 0}
            }
        },
        date: { type: Date, required: true, default: Date.now},
        heure_debut: { type: String, required: true, default: new Date().getHours()+':'+new Date().getMinutes()},
        heure_fin: { type: String, required: true, default: new Date().getHours()+':'+new Date().getMinutes()},
        produits_utilises: {type: Array},
        spot: {type: mongoose.SchemaTypes.ObjectId, ref: 'Session'},
        declarations: [
            {type: mongoose.SchemaTypes.ObjectId, ref: 'Declaration'}
        ]
    },
    { timestamps: { createdAt: 'created_at' }}
);


module.exports = mongoose.model('Session', sessionSchema);