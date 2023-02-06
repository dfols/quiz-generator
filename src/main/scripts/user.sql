CREATE TABLE user(
	user_id BIGINT AUTO_INCREMENT,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY(user_id),
	UNIQUE(username)
);
