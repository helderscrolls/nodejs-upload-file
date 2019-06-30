const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/uploadfile', upload.array('myfile', 3), function (req, res, next) {
  // traitement du formulaire
  for (i in req.files) {
    if ((req.files[i].size < 1024 * 1024 * 3) && (req.files[i].mimetype == 'image/png')) {
      fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function (err) {
        if (err) {
          res.send('Problème durant le déplacement');
        } else {
          res.send('Fichier uploadé avec succès');
        }
      });
    } else {
      res.send('Le fichier est trop lourd. (Supérieur à 3 Mo)')
    }
  }
});

module.exports = router;
