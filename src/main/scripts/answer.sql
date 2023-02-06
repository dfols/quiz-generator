CREATE TABLE answer(
	answer_id BIGINT AUTO_INCREMENT,
	question_id BIGINT,
	correct_answer BOOLEAN,
	answer VARCHAR(255),
	PRIMARY KEY(answer_id),
	FOREIGN KEY(question_id) REFERENCES question(question_id)
);