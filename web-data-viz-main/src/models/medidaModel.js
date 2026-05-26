var database = require("../database/config");

// Adicionado o async/await de forma sequencial para garantir todas as inserções
async function registrar(quantidade, comida, petSelecionado, fkusuario, dtRegistro, texto) {
    
    // 1. Monta e executa o insert do Animal
    var instrucaoSqlAnimal = `
        INSERT INTO animal (tipo, fkusuario) 
        VALUES ('${petSelecionado}', ${fkusuario});
    `;
    console.log("Passo 1 - Cadastrando Animal: \n" + instrucaoSqlAnimal);
    var resultadoAnimal = await database.executar(instrucaoSqlAnimal);

    // Recupera o ID gerado para usar na tabela de Comida
    var fkanimalGerada = resultadoAnimal.insertId;

    if (fkanimalGerada == undefined) {
        throw new Error("Falha ao recuperar o insertId do animal cadastrado.");
    }

    // 2. Monta e executa o insert da Comida usando a FK gerada acima
    var instrucaoSqlComida = `
        INSERT INTO Comida (peso, comida, dtcomida, fkanimal) 
        VALUES (${quantidade}, '${comida}', NOW(), ${fkanimalGerada});
    `;
    console.log("Passo 2 - Inserindo dados em Comida: \n" + instrucaoSqlComida);
    await database.executar(instrucaoSqlComida);

    // 3. Monta e executa o insert na tabela Registro (O que estava faltando!)
    var instrucaoSqlregistro = `
        INSERT INTO registro (dtRegistro, texto, fkusuario)
        VALUES (NOW(), '${texto}', ${fkusuario});
    `;
    console.log("Passo 3 - Inserindo dados em Registro: \n" + instrucaoSqlregistro);
    
    // O último executa com return para encerrar a função enviando o resultado de volta
    return database.executar(instrucaoSqlregistro);
}

function buscarDashboard(idUsuario) {
    var instrucaoSql = `
        SELECT 
            c.peso,
            c.comida,
            c.dtcomida,
            a.tipo
        FROM comida c
        JOIN animal a
            ON c.fkanimal = a.idanimal
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