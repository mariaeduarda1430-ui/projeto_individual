create database proj_individual;
use proj_individual;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(70),
senha varchar(15)
);



create table animal (
idAnimal int primary key auto_increment,
tipo varchar(60),
fkusuario int,
constraint fkusuario_const foreign key (fkusuario) references usuario(idUsuario)
);

create table registro (
idregistro int primary key auto_increment,
dtRegistro date,
texto varchar(75),
fkusuario int,
constraint fkusuarioo_const foreign key (fkusuario) references animal(idAnimal)
);

create table Comida (
idcomida int primary key auto_increment,
peso decimal(6,2),
comida varchar(45),
dtcomida datetime,
fkanimal int,
constraint fkanimal_const foreign key (fkanimal ) references animal(idAnimal)
);
