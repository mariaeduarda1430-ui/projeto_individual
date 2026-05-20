var database = require("../database/config");

// Removido o parâmetro dtcomida que não era usado, deixando limpo
async function registrar(quantidade, comida, petSelecionado, fkusuario) {
   
    var instrucaoSqlAnimal = `
        INSERT INTO animal (tipo, fkusuario) 
        VALUES ('${petSelecionado}', ${fkusuario});
    `;
    
    console.log("Passo 1 - Cadastrando Animal: \n" + instrucaoSqlAnimal);
    var resultadoAnimal = await database.executar(instrucaoSqlAnimal);
    
    // Para a biblioteca mysql2 usada no seu config, o insertId vem diretamente na raiz do objeto retornado
    var fkanimalGerada = resultadoAnimal.insertId; 

    if (fkanimalGerada == undefined) {
        throw new Error("Falha ao recuperar o insertId do animal cadastrado.");
    }

    // Passo 2: Insere a refeição usando a FK gerada no Passo 1. 
    // Peso e fkanimal são numéricos no seu banco, por isso não levam aspas simples.
    var instrucaoSqlComida = `
        INSERT INTO Comida (peso, comida, dtcomida, fkanimal) 
        VALUES (${quantidade}, '${comida}', NOW(), ${fkanimalGerada});
    `;
    
    console.log("Passo 2 - Inserindo dados em Comida: \n" + instrucaoSqlComida);
    return database.executar(instrucaoSqlComida);
}

function buscardash(idAnimal) {
    var instrucaoSql = `
        SELECT Comida.*, animal.tipo AS Animal
        FROM Comida
        JOIN animal ON fkanimal = idAnimal
        WHERE fkanimal = ${idAnimal}
        ORDER BY idcomida DESC;
    `;
    console.log("Executando a instrução SQL de busca: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    buscardash
};