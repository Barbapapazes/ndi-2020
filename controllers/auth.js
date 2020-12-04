const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const sendMail = require('../utils/mailer');



exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                ...req.body,
                password: hash,
                imageUrl: `${req.protocol}://${req.get('host')}/images/defaultImage.png`
            });
            user.save()
              .then(() => {
                  res.status(201).json({message: 'Utilisateur créé avec succès'})
                })
              .catch(error => res.status(400).json({ error: "Utilisateur non créé" }));
          })
        .catch(error => { console.log(error); res.status(500).json({ error })});
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          return res.status(200).json({
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET,
              { expiresIn: '5h' }
            )  
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.reset_pass = (req, res, next) => {
  const mail = req.body.email;
  User.findOne({email: mail})
  .then( user => {
    if(!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    // var secret = user.password+'-'+user.updatedAt;
    // console.log('secret ==> ', secret)
    const tok = jwt.sign(
      {
        uid: user._id,
        email: user.email
      }, process.env.SECRET, { expiresIn: '1h' });
    const mailOptions = {
      html: '<p><span>Bonjour</span></p>\
            <p>Veuillez suivre ce lien pour modifier votre mot de passe, il est valide pendant une heure</p>\
            <a href="http://127.0.0.1:4000/auth/change_password/'+tok+'">Changez votre mot de passe</a>',
      to: mail
    }
    sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({message: 'Mail sent'});
      }
    });
  })
  .catch(error => {console.log('error: ', error);res.status(500).json({ error: 'Utilisateur non reconnu' })})
}

exports.change_pass = (req, res, next) => {
  const token = req.params.token;
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(400).json({message: 'Le jeton que vous avez est invalide'})
    } else {
      res.render('../views/change_pass',{token: token});
    }
  });
}

exports.pass_changed = (req, res, next) => {
  const token = req.body.token;
  const pass = req.body.pass;
  const cpass = req.body.cpass;
  frontUrl = process.env.FRONT_URL;
  if (pass !== "" && cpass === pass) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.render('../views/pass_changed', {ok: false, front: frontUrl});
      } else {
        User.findById(decoded.uid)
        .then(user => {
          if(!user) {
            res.render('../views/pass_changed', {ok: false, front: frontUrl},);
          } else {
            bcrypt.hash(pass, 10)
            .then(hash => {
              user.password = hash;
              user.save()
              .then((usy) => {res.render('../views/pass_changed', {ok: true, front: frontUrl});})
              .catch(error => res.status(500).json({error}));
            })
            .catch(error => res.status(500).json({error}))
          }
        })
        .catch(error => res.status(500).json({error: "Utilisateur non reconnu"}));
      }
    })
  } else {
    res.render('../views/pass_changed', {ok: false, front: frontUrl});
  }
}
