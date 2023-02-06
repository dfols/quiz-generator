CREATE TABLE question(
	question_id BIGINT AUTO_INCREMENT,
	chapter_id BIGINT,
	question VARCHAR(255),
	question_type VARCHAR(255),
	PRIMARY KEY(question_id),
	FOREIGN KEY(chapter_id) REFERENCES chapter(chapter_id)
);
