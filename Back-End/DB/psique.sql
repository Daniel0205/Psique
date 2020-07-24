

/***********************************************************************************
------------------------------------------------------------------------------------
-------------------------------DEFINICION DE TABLAS---------------------------------
------------------------------------------------------------------------------------
***********************************************************************************/
DROP TABLE IF EXISTS doctor;
CREATE TABLE doctor(
	id_doctor BIGINT PRIMARY KEY,	
	name VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
    password TEXT NOT NULL
);


DROP TABLE IF EXISTS patient ;
CREATE TABLE patient(
	id_patient BIGINT PRIMARY KEY,	
	name VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
    gender CHAR(1) NOT NULL,
    city  VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
CHECK(gender IN ('M','F','N'))
);

DROP TABLE IF EXISTS assessment ;
CREATE TABLE assessment(
	id_assessment SERIAL PRIMARY KEY,	
	id_patient BIGINT NOT NULL REFERENCES patient(id_patient),	
	id_doctor BIGINT NOT NULL REFERENCES patient(id_doctor),	
	start_date DATE NOT NULL,
	end_date DATE,
	isActive BOOLEAN	
);


DROP TABLE IF EXISTS test ;
CREATE TABLE test(
	id_test SERIAL PRIMARY KEY,
	id_assessment BIGINT REFERENCES assessment(id_assessment),
	start_date DATE NOT NULL,
	isActive BOOLEAN	
);

