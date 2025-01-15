const router = require('express').Router();
const PetController = require('../controllers/PetController');

// Pet Routes
router.post('/pet/:petId/uploadImage', PetController.uploadImage);
router.post('/pet', PetController.createPet);
router.put('/pet', PetController.updatePet);
router.get('/pet/findByStatus', PetController.findByStatus);
router.get('/pet/findByTags', PetController.findByTags);
router.get('/pet/:petId', PetController.findById);
router.post('/pet/:petId', PetController.updatePetForm);
router.delete('/pet/:petId', PetController.deletePet);

module.exports = router;
