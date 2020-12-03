const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var SchemaTypes = mongoose.Schema.Types;
const userSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true},
        nom: { type: String, required: true},
        prenom: { type: String, required: true},
        password: { type: String, required: true},
        imageUrl: { type: String, required: true},
        sexe: {type: String, require: true, enum: ['H','F']},
        sessions: [
            {type: SchemaTypes.ObjectId, ref: 'Session'}
          ]
    },
    { timestamps: { createdAt: 'created_at' }}
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);