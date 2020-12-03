const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var SchemaTypes = mongoose.Schema.Types;

const spotSchema = mongoose.Schema(
    {
        ville: { type: String, required: true},
        longitude: { type: SchemaTypes.Double, required: true},
        latitude: { type: SchemaTypes.Double, required: true}
    },
    { timestamps: { createdAt: 'created_at' }}
);

spotSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Spot', spotSchema);