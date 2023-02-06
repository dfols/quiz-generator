CREATE TABLE user(
	user_id BIGINT AUTO_INCREMENT,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY(user_id),
	UNIQUE(username)
);

CREATE TABLE subject(
	subject_id BIGINT AUTO_INCREMENT,
	subject_name VARCHAR(255),
	user_id BIGINT,
	PRIMARY KEY(subject_id),
	FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE chapter(
	chapter_id BIGINT AUTO_INCREMENT,
	subject_id BIGINT,
	chapter_title VARCHAR(255),
	PRIMARY KEY(chapter_id),
	FOREIGN KEY(subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE question(
	question_id BIGINT AUTO_INCREMENT,
	chapter_id BIGINT,
	question VARCHAR(255),
	question_type VARCHAR(255),
	point_value BIGINT,
	PRIMARY KEY(question_id),
	FOREIGN KEY(chapter_id) REFERENCES chapter(chapter_id)
);

CREATE TABLE answer(
	answer_id BIGINT AUTO_INCREMENT,
	question_id BIGINT,
	correct_answer BOOLEAN,
	answer VARCHAR(255),
	PRIMARY KEY(answer_id),
	FOREIGN KEY(question_id) REFERENCES question(question_id)
);
