var database = require("../database/config");
 
async function registrar(quantidade, comida, petSelecionado, fkusuario, dtRegistro, texto) {
    
   
    var instrucaoSqlAnimal = `
        INSERT INTO animal (tipo, fkusuario) 
        VALUES ('${petSelecionado}', ${fkusuario});
    `;
    console.log("Passo 1 - Cadastrando Animal: \n" + instrucaoSqlAnimal);
    var resultadoAnimal = await database.executar(instrucaoSqlAnimal);
 
    var fkanimalGerada = resultadoAnimal.insertId;
 
    if (fkanimalGerada == undefined) {
        throw new Error("Falha ao recuperar o insertId do animal cadastrado.");
    }
 
    var instrucaoSqlComida = `
        INSERT INTO Comida (peso, comida, dtcomida, fkanimal) 
        VALUES (${quantidade}, '${comida}', NOW(), ${fkanimalGerada});
    `;
    console.log("Passo 2 - Inserindo dados em Comida: \n" + instrucaoSqlComida);
    var resultadoComida = await database.executar(instrucaoSqlComida);

    var fkcomidaGerada = resultadoComida.insertId;

    if (fkcomidaGerada == undefined) {
        throw new Error("Falha ao recuperar o insertId da comida cadastrada.");
    }
 
   
    var instrucaoSqlregistro = `
        INSERT INTO registro (dtRegistro, texto, fkusuario, fkcomida)
        VALUES (NOW(), '${texto}', ${fkusuario}, ${fkcomidaGerada});
    `;
    console.log("Passo 3 - Inserindo Registro: \n" + instrucaoSqlregistro);
    return database.executar(instrucaoSqlregistro);
}
 
function buscarDashboard(idUsuario) {
    var instrucaoSql = `
        SELECT 
            c.peso,
            c.comida,
            c.dtcomida,
            a.tipo,
            r.texto
        FROM Comida c
        JOIN animal a
            ON c.fkanimal = a.idanimal
        LEFT JOIN registro r
            ON r.fkcomida = c.idcomida
        WHERE a.fkusuario = ${idUsuario}
        ORDER BY c.dtcomida ASC;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
 
module.exports = {
    registrar,
    buscarDashboard,
};
