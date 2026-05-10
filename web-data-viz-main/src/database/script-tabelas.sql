create database proj_individual;
use proj_individual;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(70),
senha varchar(15)
);

create table caracteristica (
idcaracteristica int primary key auto_increment,
raça varchar(45),
porte varchar(45),
cor varchar(45),
especie varchar(45)
);

create table animal (
idAnimal int primary key auto_increment,
tipo varchar(45),
fkusuario int,
fkcaracteristica int,
constraint fkusuario_const foreign key (fkusuario) references usuario(idUsuario),
constraint fkcaracteristica_const foreign key (fkcaracteristica) references caracteristica(idcaracteristica)
);

create table Comida (
idcomida int primary key auto_increment,
peso decimal(4,2),
comida varchar(45),
dtcomida datetime,
fkanimal int,
constraint fkanimal_const foreign key (fkanimal ) references animal(idAnimal)
);