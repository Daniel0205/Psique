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
	id_wada SERIAL PRIMARY KEY,
	hemisphere  CHAR(1) NOT NULL,
	propofol_aplication INT NOT NULL,
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
	id_wada BIGINT REFERENCES wada(id_wada),
	time interval,
	name TEXT NOT NUll
);