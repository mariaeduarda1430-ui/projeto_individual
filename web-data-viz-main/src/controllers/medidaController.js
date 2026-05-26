var medidamodel = require("../models/medidaModel");

function registrar(req, res) {
  var quantidade = req.body.pesoServer;
  var comida = req.body.comidaServer;
  var petSelecionado = req.body.tipoAnimalServer;
  var fkUsuario = req.body.fkUsuarioServer;
  var texto = req.body.mensagem;

  console.log(
    `[Controller] Tentando Registrar - Peso: ${quantidade}, Alimento: ${comida}, Animal: ${petSelecionado}, Usuário: ${fkUsuario}`,
  );

  // Validação de segurança para impedir qualquer injeção de undefined no SQL
  if (
    quantidade == "undefined" ||
    comida == "undefined" ||
    petSelecionado == "undefined" ||
    petSelecionado == "nada" ||
    fkUsuario == "undefined" ||
    texto == "un"
  ) {
    return res
      .status(400)
      .send(
        "Seus dados estão vindo como undefined ou inválidos no Controller!",
      );
  }

  // Corrigido o nome do objeto medidamodel de acordo com o require do seu arquivo
  medidamodel
    .registrar(quantidade, comida, petSelecionado, fkUsuario)
    .then(function (resultado) {
      res.status(201).json(resultado);
    })
    .catch(function (erro) {
      console.log("Erro no Controller ao registrar:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarDashboard(req, res) {
  var idUsuario = req.params.idUsuario;

  medidamodel
    .buscarDashboard(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  registrar,
  buscarDashboard,
};
