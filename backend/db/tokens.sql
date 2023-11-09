\c stockShinobi_db;
DROP TABLE IF EXISTS tokens;
CREATE TABLE IF NOT EXISTS tokens
(
    hash    bytea PRIMARY KEY,
    user_id bigint                      NOT NULL REFERENCES users ON DELETE CASCADE,
    expiry  timestamp(0) with time zone NOT NULL
);