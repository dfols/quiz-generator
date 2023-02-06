CREATE TABLE subject(
	subject_id BIGINT AUTO_INCREMENT,
	subject_name VARCHAR(255),
	user_id BIGINT,
	PRIMARY KEY(subject_id),
	FOREIGN KEY(user_id) REFERENCES user(user_id)
);
