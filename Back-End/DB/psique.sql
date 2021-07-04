/***********************************************************************************
------------------------------------------------------------------------------------
-------------------------------DEFINICION DE TABLAS---------------------------------
------------------------------------------------------------------------------------
***********************************************************************************/
DROP TABLE IF EXISTS doctor CASCADE;
CREATE TABLE doctor(
	id_doctor INT PRIMARY KEY,	
	name TEXT NOT NULL,
	surname TEXT NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO doctor values(12345,'Test','Test','12345');


DROP TABLE IF EXISTS patient CASCADE;
CREATE TABLE patient(
	id_patient INT PRIMARY KEY,	
	name TEXT NOT NULL,
	surname TEXT NOT NULL,
    gender TEXT NOT NULL,
    actual_city  TEXT NOT NULL,
	born_city  TEXT NOT NULL,
    birth_date DATE NOT NULL,
	civil_state TEXT NOT NULL,
	scholarship TEXT NOT NULL,
	handedness TEXT NOT NULL,
	socioeconomic_status INT NOT NULL,
	update_date DATE NOT NULL
CHECK(gender IN ('M','F','N'))
CHECK(handedness IN ('D','I'))
);


INSERT INTO patient values(1234,'Test','Test','M','Cali','Bogota',TO_DATE('02/05/1999', 'DD/MM/YYYY'),'Casado','Universitario','D',2,TO_DATE('20/03/2021', 'DD/MM/YYYY'));

/*background-New table*/
DROP TABLE IF EXISTS background CASCADE;
CREATE TABLE background(
	id_background SERIAL PRIMARY KEY,
	id_patient INT REFERENCES patient(id_patient),
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
	smoking BOOLEAN NOT NULL,
	alcoholism BOOLEAN NOT NULL,
	update_date DATE NOT NULL
);


INSERT INTO background (id_patient,	head_trauma,prenatal_trauma,
meningitis,premature_birth,narcotics,asthma,earache,sinusitis,rhinitis,
pneumothorax,tuberculosis,heart_problems,renal_problems,bone_problems,
epidermal_problems,smoking,alcoholism,update_date) 
values(1234, true, true, true, true, true, true, 
true, true, true, true, true, true, true, true, true, true, true,TO_DATE('21/03/2021', 'DD/MM/YYYY'));

/*CRISIS-NEW TABLE*/
DROP TABLE IF EXISTS crisis CASCADE;
CREATE TABLE crisis(
	id_crisis SERIAL PRIMARY KEY,
	type TEXT NOT NULL
);

INSERT INTO crisis (id_crisis,type) values(0000,'crisis_test');


DROP TABLE IF EXISTS crisis_per_patient CASCADE;
CREATE TABLE crisis_per_patient(
	id_patient INT REFERENCES patient(id_patient),
	id_crisis INT REFERENCES crisis(id_crisis),
	frequency  INT NOT NULL,
	insert_date DATE NOT NULL
);

INSERT INTO crisis_per_patient values(1234,0000,5,TO_DATE('20/03/2021', 'DD/MM/YYYY'));

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
	id_patient INT REFERENCES patient(id_patient),
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
	id_patient INT REFERENCES patient(id_patient),
	dosis INT NOT NULL
);

INSERT INTO medication_per_patient_per_disease values(1111,3333,1234, 10);

DROP TABLE IF EXISTS cognitive_disease_per_patient CASCADE;
CREATE TABLE cognitive_disease_per_patient(
	id_disease INT REFERENCES cognitive_disease(id_disease),
	id_patient INT REFERENCES patient(id_patient)
);

INSERT INTO cognitive_disease_per_patient values(3333,1234);


/*****************************/

DROP TABLE IF EXISTS assessment CASCADE;
CREATE TABLE assessment(
	id_assessment SERIAL PRIMARY KEY,	
	id_patient INT NOT NULL REFERENCES patient(id_patient),	
	id_doctor INT NOT NULL REFERENCES doctor(id_doctor),	
	start_date DATE NOT NULL,
	end_date DATE,
	is_active BOOLEAN	
);


INSERT INTO assessment values(5555,1234,12345,TO_DATE('20/03/2021', 'DD/MM/YYYY'),TO_DATE('20/03/2021', 'DD/MM/YYYY'),false);


DROP TABLE IF EXISTS test CASCADE;
CREATE TABLE test(
	id_test SERIAL PRIMARY KEY,
	id_assessment INT REFERENCES assessment(id_assessment),
	start_date DATE NOT NULL,
	is_active BOOLEAN	
);

INSERT INTO test values(5555,5555,TO_DATE('20/03/2021', 'DD/MM/YYYY'),false);
INSERT INTO test values(6666,5555,TO_DATE('20/03/2021', 'DD/MM/YYYY'),false);
INSERT INTO test values(7777,5555,TO_DATE('20/03/2021', 'DD/MM/YYYY'),false);

DROP TABLE IF EXISTS stage CASCADE;
CREATE TABLE stage(
	id_stage SERIAL PRIMARY KEY,
	stage TEXT NOT NUll
);

INSERT INTO stage values(1111,'Hemisferio Derecho');
INSERT INTO stage values(2222,'Hemisferio Izquierdo');
INSERT INTO stage values(3333,'Pre-cirugia');

DROP TABLE IF EXISTS wada CASCADE;
CREATE TABLE wada(
	id_test INT REFERENCES test(id_test),
	id_stage INT REFERENCES stage(id_stage),
	propofol_aplication INT,
	duration INT NOT NULL,
	counting INT,/*1*/
	denomination INT,/*6*/
	verbal_instructions INT,/*3*/
	repetition INT,/*3*/
	lecture INT,/*2*/
	follow_instructions INT/*3*/
);
INSERT INTO wada values(5555,1111,50,60,1,null,3,null,2,1);
INSERT INTO wada values(6666,2222,1,50,null,5,null,3,null,1);
INSERT INTO wada values(7777,3333,2,45,null,5,null,3,null,1);

DROP TABLE IF EXISTS aphasia CASCADE;
CREATE TABLE aphasia(
	id_aphasia SERIAL PRIMARY KEY,
	aphasia TEXT NOT NUll
);

INSERT INTO aphasia values(1111,'Afasia 1');
INSERT INTO aphasia values(2222,'Afasia 2');
INSERT INTO aphasia values(3333,'Afasia 3');

DROP TABLE IF EXISTS aphasia_per_wada CASCADE;
CREATE TABLE aphasia_per_wada(
	id_test INT REFERENCES test(id_test),
	id_aphasia INT REFERENCES aphasia(id_aphasia),
	time INT NOT NULL
);

INSERT INTO aphasia_per_wada values(5555,1111,50);
INSERT INTO aphasia_per_wada values(5555,2222,50);
INSERT INTO aphasia_per_wada values(6666,2222,50);
INSERT INTO aphasia_per_wada values(7777,3333,50);

DROP TABLE IF EXISTS motor_deficit CASCADE;
CREATE TABLE motor_deficit(
	id_deficit SERIAL PRIMARY KEY,
	deficit TEXT NOT NUll
);

INSERT INTO motor_deficit values(1111,'Deficit 1');
INSERT INTO motor_deficit values(2222,'Deficit 2');
INSERT INTO motor_deficit values(3333,'Deficit 3');

DROP TABLE IF EXISTS deficit_per_wada CASCADE;
CREATE TABLE deficit_per_wada(
	id_test INT REFERENCES test(id_test),
	id_deficit INT REFERENCES motor_deficit(id_deficit)
);

INSERT INTO deficit_per_wada values(5555,1111);
INSERT INTO deficit_per_wada values(5555,2222);
INSERT INTO deficit_per_wada values(6666,2222);
INSERT INTO deficit_per_wada values(7777,3333);

DROP TABLE IF EXISTS zung CASCADE;
CREATE TABLE zung(
	id_test INT REFERENCES test(id_test),
	result INT 
);


/***************NEW TEST********/

/*boston*/
DROP TABLE IF EXISTS boston CASCADE;
CREATE TABLE boston(
	id_test INT REFERENCES test(id_test),
	result INT 
);

/*token*/
DROP TABLE IF EXISTS token CASCADE;
CREATE TABLE token(
	id_test INT REFERENCES test(id_test),
	result INT 
);

/*hopkins*/
DROP TABLE IF EXISTS hopkins CASCADE;
CREATE TABLE hopkins(
	id_test INT REFERENCES test(id_test),
	right_answers INT NOT NULL,
	semantic_errors INT NOT NULL,
	no_semantic_errors INT NOT NULL
);

/*wisconsin*/
DROP TABLE IF EXISTS wisconsin CASCADE;
CREATE TABLE wisconsin(
	id_test INT REFERENCES test(id_test),
	right_answers INT NOT NULL,
	perseverative_errors INT NOT NULL,
	no_perseverative_errors INT NOT NULL,
	time INT NOT NULL
);

/*addenbrookes*/
DROP TABLE IF EXISTS addenbrookes CASCADE;
CREATE TABLE addenbrookes(
	id_test INT REFERENCES test(id_test),
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
	id_test INT REFERENCES test(id_test),
	word INT NOT NULL,
	colour INT NOT NULL,
	word_colour INT NOT NULL
);

/*ineco*/
DROP TABLE IF EXISTS ineco CASCADE;
CREATE TABLE ineco(
	id_test INT REFERENCES test(id_test),
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
	id_test INT REFERENCES test(id_test),
	comments INT NOT NULL,
	results INT NOT NULL,
	time INT NOT NULL
);



/**five digits*****/
DROP TABLE IF EXISTS five_digits CASCADE;
CREATE TABLE five_digits(
	id_five_digits SERIAL PRIMARY KEY,
	id_test INT REFERENCES test(id_test)
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


/*WAIS*/
DROP TABLE IF EXISTS wais CASCADE;
CREATE TABLE wais(
	id_test INT REFERENCES test(id_test),
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


/*WISC*/
DROP TABLE IF EXISTS wisc CASCADE;
CREATE TABLE wisc(
	id_test INT REFERENCES test(id_test),
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
