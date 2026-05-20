var express = require("express");
var router = express.Router();
var medidaController = require("../controllers/medidaController");

// Mudado de "/registrar" para "/cadastrar" para casar com o seu Front-end!
router.post("/cadastrar", function (req, res) {
    medidaController.registrar(req, res);
});

router.get("/dashboard/:idAnimal", function (req, res) {
    medidaController.buscarDashboard(req, res);
});

module.exports = router;