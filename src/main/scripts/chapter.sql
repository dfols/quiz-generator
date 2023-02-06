CREATE TABLE chapter(
	chapter_id BIGINT AUTO_INCREMENT,
	subject_id BIGINT,
	chapter_title VARCHAR(255),
	PRIMARY KEY(chapter_id),
	FOREIGN KEY(subject_id) REFERENCES subject(subject_id)
);
