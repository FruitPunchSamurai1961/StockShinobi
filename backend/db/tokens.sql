\c stockShinobi_db;
DROP TABLE IF EXISTS tokens;
CREATE TABLE IF NOT EXISTS tokens
(
    hash    bytea PRIMARY KEY,
    user_id bigint                      NOT NULL UNIQUE REFERENCES users ON DELETE CASCADE,
    expiry  timestamp(0) with time zone NOT NULL,
    version integer                     NOT NULL DEFAULT 1
);