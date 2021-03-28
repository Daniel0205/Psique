/***********************************************************************************
------------------------------------------------------------------------------------
-------------------------------DEFINICION DE TABLAS---------------------------------
------------------------------------------------------------------------------------
***********************************************************************************/
DROP TABLE IF EXISTS demographic CASCADE;
CREATE TABLE demographic(
	id_demographic BIGINT UNIQUE NOT NULL,
	update_date BIGINT NOT NULL,
    gender CHAR(1) NOT NULL,
    born_city  VARCHAR(20) NOT NULL,
	actual_city  VARCHAR(20) NOT NULL,
	civil_state CHAR(1) NOT NULL,
	socioeconomic_status INT NOT NULL,
    age INT NOT NULL,
	handedness CHAR(1) NOT NULL,
	scholarship TEXT NOT NULL,
	PRIMARY KEY(id_demographic, update_date)
);

INSERT INTO demographic values(1111,20190520,'M','Cali','Medellin','S',2,19,'L','T');
INSERT INTO demographic values(2222,20190520,'F','Bogota','Bogota','C',3,23,'R','U');
INSERT INTO demographic values(3333,20190520,'N','Medellin','Pasto','D',4,22,'L','B');



DROP TABLE IF EXISTS background CASCADE;
CREATE TABLE background(
	id_background BIGINT UNIQUE NOT NULL,
	update_date BIGINT NOT NULL,
	head_trauma BOOLEAN NOT NULL,
	prenatal_trauma BOOLEAN NOT NULL,
	meningitis BOOLEAN NOT NULL,
	premature_birth BOOLEAN NOT NULL,
	narcotics BOOLEAN NOT NULL,
	asthma BOOLEAN NOT NULL,
	earache BOOLEAN NOT NULL,
	sinusitis BOOLEAN NOT NULL,
	rhinitis BOOLEAN NOT NULL,
	pneumothorax BOOLEAN NOT NULL,
	tuberculosis BOOLEAN NOT NULL,
	heart_problems BOOLEAN NOT NULL,
	renal_problems BOOLEAN NOT NULL,
	bone_problems BOOLEAN NOT NULL,
	epidermal_problems BOOLEAN NOT NULL,
	high_blood_pressure BOOLEAN NOT NULL,
	smoking BOOLEAN NOT NULL,
	alcoholism BOOLEAN NOT NULL,
	primary key (id_background, update_date)
);


INSERT INTO background values(3333,20190520,false,false,false,false,false,false,false,false,false,
										 false,false,false,false,false,false,false,false,false);

INSERT INTO background values(1111,20190520,true,true,true,true,true,true,true,true,true,
										 true,true,true,true,true,true,true,true,true);


INSERT INTO background values(2222,20190520,true,true,true,true,true,true,true,true,true,
									false,false,false,false,false,false,false,false,false);

DROP TABLE IF EXISTS crisis CASCADE;
CREATE TABLE crisis(
	id_crisis SERIAL PRIMARY KEY,
	frequency  INT NOT NULL,
	type VARCHAR(30) NOT NULL
);

INSERT INTO crisis values(1111,1,'paralisis');
INSERT INTO crisis values(2222,2,'crisis');
INSERT INTO crisis values(3333,3,'crisis');


DROP TABLE IF EXISTS cognitive_disease CASCADE;
CREATE TABLE cognitive_disease(
	id_disease SERIAL PRIMARY KEY,
	type VARCHAR(30) NOT NULL
);

INSERT INTO cognitive_disease values(1111,'alzheimer');
INSERT INTO cognitive_disease values(2222,'epilepsia');
INSERT INTO cognitive_disease values(3333,'aasdasdas');

DROP TABLE IF EXISTS medication CASCADE;
CREATE TABLE medication(
	id_medication SERIAL PRIMARY KEY,
	medicine VARCHAR(30) NOT NULL
);

INSERT INTO medication values(1111,'acetaminofen');
INSERT INTO medication values(2222,'loratadina');
INSERT INTO medication values(3333,'asdad');

DROP TABLE IF EXISTS date CASCADE;
CREATE TABLE date(
	id_date SERIAL PRIMARY KEY,
	day INT NOT NULL,
	month INT NOT NULL,
	year INT NOT NULL
);

INSERT INTO date values(1111,15,09,2019);
INSERT INTO date values(2222,15,10,2018);
INSERT INTO date values(3333,30,12,2012);

DROP TABLE IF EXISTS neuropsychological_assessment CASCADE;
CREATE TABLE neuropsychological_assessment(
	id_assessment INT PRIMARY KEY,
	id_background INT NOT NULL,
	id_background_date INT NOT NULL,
	id_demographic INT NOT NULL,
	id_demographic_date INT NOT NULL,
	id_disease INT NOT NULL,
	id_medication INT NOT NULL,
	id_date INT NOT NULL,
	iq INT ,
	executive_functions INT ,
	language INT,
	visuospatial INT,
	memory INT,
	FOREIGN KEY(id_background,id_background_date) REFERENCES background(id_background,update_date),
	FOREIGN KEY(id_demographic,id_demographic_date) REFERENCES demographic(id_demographic,update_date),
	FOREIGN KEY(id_disease) REFERENCES cognitive_disease(id_disease),
	FOREIGN KEY(id_medication) REFERENCES medication(id_medication)
);


INSERT INTO neuropsychological_assessment values(1,1111,20190520,1111,20190520,1111,1111,1111,1,1,1,1,1);
INSERT INTO neuropsychological_assessment values(2,2222,20190520,2222,20190520,2222,2222,1111,2,2,2,2,2);
INSERT INTO neuropsychological_assessment values(3,3333,20190520,3333,20190520,3333,3333,1111,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(4,1111,20190520,1111,20190520,3333,3333,2222,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(5,1111,20190520,1111,20190520,2222,3333,2222,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(6,2222,20190520,2222,20190520,2222,3333,3333,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(7,3333,20190520,2222,20190520,2222,3333,3333,3,3,3,3,3);
