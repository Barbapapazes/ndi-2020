const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;

const spotSchema = mongoose.Schema(
    {
        ville: { type: String, required: true},
        long: { type: Number, required: true},
        lat: { type: Number, required: true}
    },
    { timestamps: { createdAt: 'created_at' }}
);


module.exports = mongoose.model('Spot', spotSchema);