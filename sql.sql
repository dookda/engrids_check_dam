create table users(
	gid serial not null,
	userid text primary key,
	username text,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table checkdam(
	gid serial not null,
	cdname VARCHAR(255) NOT NULL,
    cdcreator VARCHAR(255) NOT NULL,
    cddetails TEXT,
    cdimage VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	userid text,
	FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE SET NULL
);