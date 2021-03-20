/***********************************************************************************
------------------------------------------------------------------------------------
-------------------------------DEFINICION DE TABLAS---------------------------------
------------------------------------------------------------------------------------
***********************************************************************************/
DROP TABLE IF EXISTS demographic CASCADE;
CREATE TABLE demographic(
	id_demographic SERIAL PRIMARY KEY,	
    gender CHAR(1) NOT NULL,
    born_city  VARCHAR(20) NOT NULL,
	actual_city  VARCHAR(20) NOT NULL,
	socioeconomic_status INT NOT NULL,
    age INT NOT NULL,
	handedness CHAR(1) NOT NULL,
	scholarship CHAR(1) NOT NULL
);

INSERT INTO demographic values(1111,'M','Cali','Medellin',2,19,'L','T');
INSERT INTO demographic values(2222,'F','Bogota','Bogota',3,23,'R','U');
INSERT INTO demographic values(3333,'N','Medellin','Pasto',4,22,'L','B');



DROP TABLE IF EXISTS background CASCADE;
CREATE TABLE background(
	id_background SERIAL PRIMARY KEY,
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
	alcoholism BOOLEAN NOT NULL
);


INSERT INTO background values(3333,false,false,false,false,false,false,false,false,false,
										 false,false,false,false,false,false,false,false,false);

INSERT INTO background values(1111,true,true,true,true,true,true,true,true,true,
										 true,true,true,true,true,true,true,true,true);


INSERT INTO background values(2222,true,true,true,true,true,true,true,true,true,
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

DROP TABLE IF EXISTS neuropsychological_assessment CASCADE;
CREATE TABLE neuropsychological_assessment(
	id_assessment INT NOT NULL,
	id_background INT NOT NULL,
	id_demographic INT NOT NULL,
	id_crisis INT NOT NULL,
	id_disease INT NOT NULL,
	id_medicine INT NOT NULL,
	iq INT NOT NULL,
	executive_functions INT NOT NULL,
	language INT NOT NULL,
	visuospatial INT NOT NULL,
	memory INT NOT NULL,
	FOREIGN KEY(id_background) REFERENCES background(id_background),
	FOREIGN KEY(id_demographic) REFERENCES demographic(id_demographic),
	FOREIGN KEY(id_crisis) REFERENCES crisis(id_crisis),
	FOREIGN KEY(id_disease) REFERENCES cognitive_disease(id_disease),
	FOREIGN KEY(id_medicine) REFERENCES medication(id_medication)
);


INSERT INTO neuropsychological_assessment values(1,1111,1111,1111,1111,1111,1,1,1,1,1);
INSERT INTO neuropsychological_assessment values(2,2222,2222,2222,2222,2222,2,2,2,2,2);
INSERT INTO neuropsychological_assessment values(3,3333,3333,3333,3333,3333,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(4,1111,1111,3333,3333,3333,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(5,1111,1111,2222,2222,3333,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(6,2222,2222,1111,2222,3333,3,3,3,3,3);
INSERT INTO neuropsychological_assessment values(7,3333,2222,3333,2222,3333,3,3,3,3,3);
