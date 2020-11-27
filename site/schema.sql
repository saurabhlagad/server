create database car_rental;
use car_rental;
create table user(id integer primary key auto_increment,firstname varchar(20),lastname varchar(20),email varchar(30),password varchar(100),phone varchar(20),status integer default 0,created_on timestamp default CURRENT_TIMESTAMP,activationToken varchar(100));
create table admin(id integer primary key auto_increment,firstname varchar(20),lastname varchar(20),email varchar(30),password varchar(100),phone varchar(20),created_on timestamp default CURRENT_TIMESTAMP);
create table cars(id integer primary key auto_increment,carName varchar(20),noOfSeats integer,plateNo varchar(20),pricePerHour float,model varchar(30),image varchar(100),description varchar(100),transmission varchar(100),fuel varchar(20),isAvailable integer default 1,created_on timestamp default CURRENT_TIMESTAMP);
create table feedback(id integer primary key auto_increment,carId integer,userId integer,content varchar(100),rating integer,created_on timestamp default CURRENT_TIMESTAMP);
create table bookedCar(id integer primary key auto_increment,userId integer,carId integer,toDate varchar(15),toTime varchar(20),fromDate varchar(15),fromTime varchar(20),drivingLicence varchar(200),destination varchar(20),isReturned integer default 2,created_on timestamp default CURRENT_TIMESTAMP);
insert into admin(firstname,lastname,email,password,phone) values('abhishek','thombare','abhisheka.thombare07@gmail.com','d6576afa8181b4a62a83f1cab24ea1a71881ab5973d49093205ad7ee0301c198','8788857061');
delimiter //
CREATE TRIGGER book_trig
after insert
on bookedcar
for each row
begin
update cars set isAvailable=2 where id=new.carId;
end
//
CREATE TRIGGER updatestatus_trig
after update
on bookedcar
for each row
begin
if new.isReturned=3 then
update cars set isAvailable=1 where id=new.carId;
else
update cars set isAvailable=new.isReturned where id=new.carId;
end if;
end
//
CREATE TRIGGER cancelBooking_trig
after delete
on bookedcar
for each row
begin
update cars set isAvailable=1 where id=old.carId;
end
//