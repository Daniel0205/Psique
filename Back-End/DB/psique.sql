/***********************************************************************************
------------------------------------------------------------------------------------
-------------------------------DEFINICION DE TABLAS---------------------------------
------------------------------------------------------------------------------------
***********************************************************************************/
DROP TABLE IF EXISTS doctor CASCADE;
CREATE TABLE doctor(
	id_doctor BIGINT PRIMARY KEY,	
	name VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
    password TEXT NOT NULL
);


DROP TABLE IF EXISTS patient CASCADE;
CREATE TABLE patient(
	id_patient BIGINT PRIMARY KEY,	
	name VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
    gender CHAR(1) NOT NULL,
    city  VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
CHECK(gender IN ('M','F','N'))
);

DROP TABLE IF EXISTS assessment CASCADE;
CREATE TABLE assessment(
	id_assessment SERIAL PRIMARY KEY,	
	id_patient BIGINT NOT NULL REFERENCES patient(id_patient),	
	id_doctor BIGINT NOT NULL REFERENCES doctor(id_doctor),	
	start_date DATE NOT NULL,
	end_date DATE,
	is_active BOOLEAN	
);


DROP TABLE IF EXISTS test CASCADE;
CREATE TABLE test(
	id_test SERIAL PRIMARY KEY,
	id_assessment BIGINT REFERENCES assessment(id_assessment),
	start_date DATE NOT NULL,
	is_active BOOLEAN	
);


DROP TABLE IF EXISTS wada CASCADE;
CREATE TABLE wada(
	id_test BIGINT REFERENCES test(id_test),
	hemisphere  CHAR(1) NOT NULL,
	propofol_aplication INT,
	duration INT NOT NULL,
	counting INT,
	denomination INT,
	verbal_instructions INT,
	repetition INT,
	lecture INT,
	follow_instructions INT,

CHECK(hemisphere IN ('D','I','P'))
);

DROP TABLE IF EXISTS aphasia CASCADE;
CREATE TABLE aphasia(
	id_test BIGINT REFERENCES test(id_test),
	time INT,
	name TEXT NOT NUll
);


DROP TABLE IF EXISTS zung CASCADE;
CREATE TABLE zung(
	id_test BIGINT REFERENCES test(id_test),
	result INT 
);


INSERT INTO patient values(1234,'Test','Test','M','Cali','02-05-1999')


