create database adivinaquien;
use adivinaquien;

create table user(
	id int not null auto_increment,
    name varchar(50) not null,
    email varchar(50) not null,
    password varchar(40) not null,
    primary key(id)
);

drop table user;
select * from user;

create table personajesview(
	idp int not null auto_increment,
    name varchar(50) not null,
    descripcion varchar(500),
    lentes bool,
    acceso bool,
    cabello varchar(4),
    barba varchar(4),
    casa varchar(4),
    imagen varchar(50),
    primary key(idp)
);

select * from personajesview;

create table statics(
    id_user int not null,
    wins int,
    loos int,
    games int,
    primary key(id_user),
	constraint FK_user foreign key (id_user) references user(id)
);

drop table statics;
select * from statics;

create table staticspersonales(
	id_juego int not null auto_increment,
	id_user int not null,
    fecha timestamp default current_timestamp,
    win int,
    loos int,
    primary key(id_juego,id_user),
    constraint FK_sp_user foreign key (id_user) references user(id)
);

drop table staticspersonales;
select * from staticspersonales;


create or replace view staticsfull as 
select u.name,t.games, t.wins,t.loos from statics t, user u where t.id_user = u.id;

create or replace view staticsperso as 
select u.name,t.games, t.wins,t.loos, t.fecha from statics t, user u where t.id_user = u.id;

insert into personajesview(name,descripcion,lentes,acceso,cabello,piel,barba,casa,imagen) values ("Lee Jordan",
"Lee Jordan es un alumno de la Casa Gryffindor, dos cursos por delante de Harry Potter en Hogwarts. Él es alto, bromista, lleva
 rastas y tiene una tarántula por mascota.",false,false,"negr","negr","none","grif","R.drawable.leejo");


update personajesview set imagen="R.drawable.lupi" where idp=16;

select * from personajesview where idp=12;

update personajesview set cabello="negr" where idp=18;

select * from personajesview where cabello="cafe" and piel="blan";

select * from user;
select * from personajesview;

delete from user where id =6;

GRANT select ON adivinaquien.* to 'brayan'@'localhost';
GRANT insert ON adivinaquien.* to 'brayan'@'localhost';
GRANT update ON adivinaquien.* to 'brayan'@'localhost';
GRANT delete ON adivinaquien.* to 'brayan'@'localhost';
