const User = require('../models/user');
const Session = require('../models/session');
const Declaration = require('../models/declaration');
const Spot = require('../models/spot');
const axios = require('axios');
const { isValidObjectId } = require('mongoose');

exports.get_sessions = (userId, req, res, next) => {
    User.findOne({_id: userId})
    .then(user => {
        if(!user)   {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        return res.status(200).json({
            ...user.sessions
        })
    })
    .catch(error => {res.status(500).json({ error: 'Utilisateur non reconnu' })})
}

exports.add_session = (userId, req, res, next) => {
    User.findOne({_id: userId})
    .then(user => {
        if(!user)   {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        if(isValidObjectId(req.body.spot))  {
            if (user.sessions.some(sess => {
                (sess.spot.lat === req.body.spot.lat && sess.spot.long === req.body.spot.long && sess.heure_fin > req.body.heure_debut) 
            })) {
                return res.status(400).json({error : 'Cette session existe déjà'});
            }
            const session = new Session({});
            
            Spot.findOne({_id: req.body.spot})
            .then((sp) => {
                if(!sp)  {
                    return res.status(400).json({error : 'Spot not found'})
                }
                session.spot = sp;
            })
            .catch(error => { return res.status(500).json({error});});
            session.date = req.body.date;
            session.heure_debut = req.body.heure_debut;
            session.heure_fin = req.body.heure_fin;
            session.produits_utilises = req.body.produits_utilises;
            session.frequentation = {...req.body.frequentation};
            session.save()
            .then((s) => {
                if(!s)  {
                    return res.status(400).json({error : 'Unable to save session'})
                }
                user.sessions.push(session);
                user.save()
                .then((usy) => {res.status(201).json({message: 'Session successfully created'});})
                .catch(error => res.status(500).json({error}));
            })
        } else {
            return res.status(400).json({error: 'Spot id not found'});
        }
    })
    .catch(error => {res.status(500).json({ error: '1- Utilisateur non reconnu' })})
}

exports.declare = (userId, req, res, next) => {
    sessionId = req.body.sessionid;
    if(isValidObjectId(sessionId))  {
        Session.findOne({_id: sessionId})
        .then((se) => {
            if(!se) {
                return res.status(400).json({error : 'Unable to get session'})
            }
            
            const declaration = new Declaration({...req.body.declaration});
            declaration.save()
            .then((de) => {
                if(!de) {
                    return res.status(400).json({error : 'Unable to save declaration'})
                }
                se.declarations.push(de);
                se.save()
                .then((s) => {
                    if(!s)  {
                        return res.status(400).json({error : 'Unable to save session'})
                    }
                    return res.status(200).json({message : 'Declaration successfully added'})
                }).catch(error => res.status(500).json({error}));

                
            })
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    }
}

exports.update_declare = (userId, req, res, next) => {
    declId = req.params.id;
    Declaration.findOneAndUpdate({_id: declId}, {...req.body.declaration}, (err, result) => {
        if(err) {
            return res.status(400).json({error : 'Unable to update declaration'})
        } else {
            console.log(result)
            return res.status(200).json({message : 'Declaration successfully added'})
        }
    });
}

exports.get_spot = (req, res, next) => {
    spotId = req.params.spotid;
    if(isValidObjectId(spotId))  {
        Spot.findOne({_id: spotId})
        .then((spot) => {
            res.status(200).json({data: {ville: spot.ville, long: spot.long, lat: spot.lat}});
        })
        .catch(error => res.status(500).json({error}));
    }
}  

exports.add_spot = (req, res, next) => {
    console.log(req.body.spot);
    const spot = new Spot({...req.body.spot});
    spot.save()
    .then((usy) => res.status(201).json({message: 'Session successfully created'}))
    .catch(error => res.status(500).json({error}));
} 


exports.get_weather = (req, res, next) => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+req.body.lat+'&lon='+req.body.lon+'&appid=a28da395fc9e2c65c67ef82374ae0061')
    .then(response => {
        res.status(200).json({data: response.data});
    })
    .catch(error => {
        res.status(500).json({ error: 'Problème serveur' })
    });
}