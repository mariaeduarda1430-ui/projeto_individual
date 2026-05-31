var express = require("express");
var router = express.Router();
var medidaController = require("../controllers/medidaController");

router.post("/cadastrar", function (req, res) {
  medidaController.registrar(req, res);
});

router.get("/dashboard/:idUsuario", function (req, res) {
  medidaController.buscarDashboard(req, res);
});

module.exports = router;
