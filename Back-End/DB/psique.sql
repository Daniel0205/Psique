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

INSERT INTO doctor values(1234,'Test','Test','1234');


DROP TABLE IF EXISTS patient CASCADE;
CREATE TABLE patient(
	id_patient BIGINT PRIMARY KEY,	
	name VARCHAR(30) NOT NULL,
	surname VARCHAR(30) NOT NULL,
    gender CHAR(1) NOT NULL,
    actual_city  VARCHAR(20) NOT NULL,
	born_city  VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
CHECK(gender IN ('M','F','N'))
);


INSERT INTO patient values(1234,'Test','Test','M','Cali','Bogota','02-05-1999');

/*background-New table*/
DROP TABLE IF EXISTS background CASCADE;
CREATE TABLE background(
	id_background SERIAL PRIMARY KEY,
	id_patient BIGINT REFERENCES patient(id_patient),
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


INSERT INTO background (id_patient,	head_trauma,prenatal_trauma,
meningitis,premature_birth,narcotics,asthma,earache,sinusitis,rhinitis,
pneumothorax,tuberculosis,heart_problems,renal_problems,bone_problems,
epidermal_problems,high_blood_pressure,smoking,alcoholism) 
values(1234, true, true, true, true, true, true, 
true, true, true, true, true, true, true, true, true, true, true, true);

/*CRISIS-NEW TABLE*/
DROP TABLE IF EXISTS crisis CASCADE;
CREATE TABLE crisis(
	id_crisis SERIAL PRIMARY KEY,
	type TEXT NOT NULL
);

INSERT INTO crisis (id_crisis,type) values(0000,'crisis_test');


DROP TABLE IF EXISTS crisis_per_patient CASCADE;
CREATE TABLE crisis_per_patient(
	id_patient BIGINT REFERENCES patient(id_patient),
	id_crisis INT REFERENCES crisis(id_crisis),
	frequency  INT NOT NULL,
	insert_date DATE NOT NULL
);

INSERT INTO crisis_per_patient values(1234,0000,5);

/*medication-new*/
DROP TABLE IF EXISTS medication CASCADE;
CREATE TABLE medication(
	id_medication SERIAL PRIMARY KEY,
	medicine TEXT NOT NULL
);


INSERT INTO medication values(1111,'TEST MEDICINE');


/*cognitive disease - new*/
DROP TABLE IF EXISTS cognitive_disease CASCADE;
CREATE TABLE cognitive_disease(
	id_patient BIGINT REFERENCES patient(id_patient),
	id_disease SERIAL PRIMARY KEY,
	type TEXT NOT NULL
);

INSERT INTO cognitive_disease values(1234,3333,'PATATUS TEST DISEASE');

DROP TABLE IF EXISTS medication_per_disease CASCADE;
CREATE TABLE medication_per_disease(
	id_medication INT REFERENCES medication(id_medication),
	id_disease INT REFERENCES cognitive_disease(id_disease)
);

INSERT INTO medication_per_disease values(1111,3333);


DROP TABLE IF EXISTS medication_per_patient_per_disease CASCADE;
CREATE TABLE medication_per_patient_per_disease(
	id_medication INT REFERENCES medication(id_medication),
	id_disease INT REFERENCES cognitive_disease(id_disease),
	id_patient BIGINT REFERENCES patient(id_patient),
	dosis INT NOT NULL
);

INSERT INTO medication_per_patient_per_disease values(1111,3333,1234, 10);

DROP TABLE IF EXISTS cognitive_disease_per_patient CASCADE;
CREATE TABLE cognitive_disease_per_patient(
	id_disease INT REFERENCES cognitive_disease(id_disease),
	id_patient BIGINT REFERENCES patient(id_patient)
);

INSERT INTO cognitive_disease_per_patient values(3333,1234);


/*****************************/

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


/***************NEW TEST********/

/*boston*/
DROP TABLE IF EXISTS boston CASCADE;
CREATE TABLE boston(
	id_test BIGINT REFERENCES test(id_test),
	result INT 
);

/*token*/
DROP TABLE IF EXISTS token CASCADE;
CREATE TABLE token(
	id_test BIGINT REFERENCES test(id_test),
	result INT 
);

/*hopkins*/
DROP TABLE IF EXISTS hopkins CASCADE;
CREATE TABLE hopkins(
	id_test BIGINT REFERENCES test(id_test),
	right_answers INT NOT NULL,
	semantic_errors INT NOT NULL,
	no_semantic_errors INT NOT NULL
);

/*wisconsin*/
DROP TABLE IF EXISTS wisconsin CASCADE;
CREATE TABLE wisconsin(
	id_test BIGINT REFERENCES test(id_test),
	right_answers INT NOT NULL,
	perseverative_errors INT NOT NULL,
	no_perseverative_errors INT NOT NULL,
	time INT NOT NULL
);

/*addenbrookes*/
DROP TABLE IF EXISTS addenbrookes CASCADE;
CREATE TABLE addenbrookes(
	id_test BIGINT REFERENCES test(id_test),
	orientation INT NOT NULL,
	registry INT NOT NULL,
	attention_concentration INT NOT NULL,
	recovery INT NOT NULL,
	anterograde INT NOT NULL,
	retrograde INT NOT NULL,
	p_letters INT NOT NULL,
	animals INT NOT NULL,
	comprehension INT NOT NULL,
	writting INT NOT NULL,
	word_repetition INT NOT NULL,
	phrase_repetition INT NOT NULL,
	nomination INT NOT NULL,
	reading INT NOT NULL,
	visuospatial_skills INT NOT NULL,
	perceptual_skills INT NOT NULL,
	memory_recovery INT NOT NULL,
	recognition INT NOT NULL
);

/*stroop*/
DROP TABLE IF EXISTS stroop CASCADE;
CREATE TABLE stroop(
	id_test BIGINT REFERENCES test(id_test),
	word INT NOT NULL,
	colour INT NOT NULL,
	word_colour INT NOT NULL
);

/*ineco*/
DROP TABLE IF EXISTS ineco CASCADE;
CREATE TABLE ineco(
	id_test BIGINT REFERENCES test(id_test),
	motor_programming INT NOT NULL,
	conflicting_instructions INT NOT NULL,
	go_no_go INT NOT NULL,
	backward_digits INT NOT NULL,
	verbal_working INT NOT NULL,
	spatial_working INT NOT NULL,
	abstraction_capacity INT NOT NULL,
	verbal_inhibitory INT NOT NULL
);

/*rey*/
DROP TABLE IF EXISTS rey CASCADE;
CREATE TABLE rey(
	id_test BIGINT REFERENCES test(id_test),
	comments INT NOT NULL,
	results INT NOT NULL,
	time INT NOT NULL
);



/**five digits*****/
DROP TABLE IF EXISTS five_digits CASCADE;
CREATE TABLE five_digits(
	id_five_digits SERIAL PRIMARY KEY,
	id_test BIGINT REFERENCES test(id_test)
);

DROP TABLE IF EXISTS reading CASCADE;
CREATE TABLE reading(
	id_five_digits INT REFERENCES five_digits(id_five_digits),
	punctuation INT NOT NULL,
	errors INT NOT NULL,
	time INT NOT NULL
);

DROP TABLE IF EXISTS counting CASCADE;
CREATE TABLE counting(
	id_five_digits INT REFERENCES five_digits(id_five_digits),
	punctuation INT NOT NULL,
	errors INT NOT NULL,
	time INT NOT NULL
);

DROP TABLE IF EXISTS choosing CASCADE;
CREATE TABLE choosing(
	id_five_digits INT REFERENCES five_digits(id_five_digits),
	punctuation INT NOT NULL,
	errors INT NOT NULL,
	time INT NOT NULL
);

DROP TABLE IF EXISTS switching CASCADE;
CREATE TABLE switching(
	id_five_digits INT REFERENCES five_digits(id_five_digits),
	punctuation INT NOT NULL,
	errors INT NOT NULL,
	time INT NOT NULL
);
/*************/


/*WISC*/
DROP TABLE IF EXISTS wisc CASCADE;
CREATE TABLE wisc(
	id_test BIGINT REFERENCES test(id_test),
	cube_design INT NOT NULL,
	similarities INT NOT NULL,
	digits INT NOT NULL,
	matrices INT NOT NULL,
	vocabulary INT NOT NULL,
	arithmetic INT NOT NULL,
	symbol_search INT NOT NULL,
	puzzles INT NOT NULL,
	information INT NOT NULL,
	number_keys INT NOT NULL,
	numbers_letters INT NOT NULL,
	balances INT NOT NULL,
	comprehension INT NOT NULL,
	cancelation INT NOT NULL,
	incomplete_figures INT NOT NULL
);


/*WAIS*/
DROP TABLE IF EXISTS wais CASCADE;
CREATE TABLE wais(
	id_test BIGINT REFERENCES test(id_test),
	cube_design INT NOT NULL,
	similarities INT NOT NULL,
	digits INT NOT NULL,
	draw_concepts INT NOT NULL,
	keys INT NOT NULL,
	vocabulary INT NOT NULL,
	numbers_letters INT NOT NULL,
	matrices INT NOT NULL,
	comprehension INT NOT NULL,
	symbol_search INT NOT NULL,
	incomplete_figures INT NOT NULL,
	records INT NOT NULL,
	information INT NOT NULL,
	arithmetic INT NOT NULL,
	clues INT NOT NULL
);
/***************************************************/
