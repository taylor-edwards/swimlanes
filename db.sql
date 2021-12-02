CREATE USER swimlanes;
CREATE SCHEMA swimlanes AUTHORIZATION swimlanes;
CREATE DATABASE swimlanes;
GRANT CONNECT ON DATABASE swimlanes TO swimlanes;

-- Destroy rows and tables:
--     TRUNCATE tag, note, lane, pool, account RESTART IDENTITY CASCADE;
--     DROP TABLE note_tag, tag, note, lane_access, lane, pool_access, pool, account CASCADE;
--     DROP TYPE permission, note_status;

CREATE TYPE permission AS ENUM ('none', 'read', 'write', 'delete');

CREATE TYPE note_status AS ENUM ('initial', 'in_progress', 'error', 'complete');

CREATE TABLE IF NOT EXISTS account (
    account_id SERIAL PRIMARY KEY,
    account_name VARCHAR(24) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    edited_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP
);

-- each pool only has one owner, but can have many viewers and editors
-- only the owner can delete the pool itself
CREATE TABLE IF NOT EXISTS pool (
    pool_id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES account ON UPDATE CASCADE ON DELETE CASCADE,
    pool_name VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    edited_at TIMESTAMP NOT NULL DEFAULT now()
);

-- permission to modify lanes in a pool per account
CREATE TABLE IF NOT EXISTS pool_access (
    pool_id INTEGER REFERENCES pool ON UPDATE CASCADE ON DELETE CASCADE,
    account_id INTEGER REFERENCES account ON UPDATE CASCADE ON DELETE CASCADE,
    permission PERMISSION NOT NULL DEFAULT 'none',
    PRIMARY KEY (account_id, pool_id)
);

CREATE TABLE IF NOT EXISTS lane (
    lane_id SERIAL PRIMARY KEY,
    pool_id INTEGER NOT NULL REFERENCES pool ON UPDATE CASCADE ON DELETE CASCADE,
    lane_name VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    edited_at TIMESTAMP NOT NULL DEFAULT now()
);

-- permission to modify notes in a lane per account
CREATE TABLE IF NOT EXISTS lane_access (
    lane_id INTEGER NOT NULL REFERENCES lane ON UPDATE CASCADE ON DELETE CASCADE,
    account_id INTEGER NOT NULL REFERENCES account ON UPDATE CASCADE ON DELETE CASCADE,
    permission PERMISSION NOT NULL DEFAULT 'none',
    PRIMARY KEY (account_id, lane_id)
);

CREATE TABLE IF NOT EXISTS note (
    note_id SERIAL PRIMARY KEY,
    lane_id INTEGER NOT NULL REFERENCES lane ON UPDATE CASCADE ON DELETE CASCADE,
    note_text TEXT NOT NULL,
    note_status NOTE_STATUS NOT NULL DEFAULT 'initial',
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    edited_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tag (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(24) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS note_tag (
    note_id INTEGER NOT NULL REFERENCES note ON UPDATE CASCADE ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tag ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
);

-- create user accounts
INSERT INTO account (account_name) VALUES ('jojo'), ('chumpy'), ('eragon');

-- create pools
INSERT INTO pool (account_id, pool_name) VALUES (
    (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'eragon'),
    'Swim practice'
), (
    (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'chumpy'),
    'Tempering progress'
);

-- grant users access to pools
INSERT INTO pool_access (pool_id, account_id, permission) VALUES (
    (SELECT pool_id FROM pool WHERE pool_name = 'Swim practice' LIMIT 1),
    (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'eragon'),
    'delete'
), (
    (SELECT pool_id FROM pool WHERE pool_name = 'Swim practice' LIMIT 1),
    (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'jojo'),
    'read'
), (
    (SELECT pool_id FROM pool WHERE pool_name = 'Tempering progress' LIMIT 1),
    (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'chumpy'),
    'delete'
);

-- add lanes to pools
INSERT INTO lane (pool_id, lane_name) VALUES
    (1, 'Morning'),
    (1, 'Afternoon'),
    (1, 'Evening'),
    (2, 'Adamantite ring'),
    (2, 'Dragonscales 2H Axe');

-- grant users access to lanes
INSERT INTO lane_access(lane_id, account_id, permission) VALUES
    (1, (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'eragon'), 'delete'),
    (2, (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'eragon'), 'delete'),
    (3, (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'eragon'), 'delete'),
    (2, (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'jojo'), 'write'),
    (4, (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'chumpy'), 'delete'),
    (5, (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'chumpy'), 'delete');

-- add notes to lanes
INSERT INTO note (lane_id, note_text) VALUES
    (1, '5 laps backstroke'),
    (1, '2 laps freestyle'),
    (1, 'float for 5 minutes'),
    (3, '10 laps breastroke'),
    (3, '6 laps doggy paddle'),
    (4, 'Apply essences'),
    (5, 'Apply essences'),
    (5, 'Add abilities'),
    (5, 'Max out damage');

-- create tags
INSERT INTO tag (tag_name) VALUES
    ('lakeshore'),
    ('aquatics center'),
    ('solo'),
    ('team'),
    ('rare'),
    ('switch'),
    ('ps4');

-- add tags to notes
INSERT INTO note_tag (note_id, tag_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 4),
    (4, 6),
    (4, 5),
    (5, 7);

-- grab all active accounts
SELECT account_id, account_name, created_at FROM account WHERE deleted_at IS NULL;

-- grab all deleted accounts
SELECT account_id, account_name, deleted_at FROM account WHERE deleted_at IS NOT NULL;

-- grab all pools owned by an account
SELECT pool_id, pool_name, created_at FROM pool WHERE account_id = (
    SELECT DISTINCT account_id FROM account WHERE account.account_name = 'eragon'
);

-- grab all pools an account has any level of access to
SELECT p.pool_id, p.pool_name, p.account_id, p.created_at, p_a.permission FROM pool_access AS p_a
JOIN pool AS p ON p_a.pool_id = p.pool_id
WHERE p_a.permission = 'read'
AND p_a.account_id = (SELECT DISTINCT account_id FROM account WHERE account.account_name = 'jojo');

-- grab all lanes for a pool
SELECT lane_id, lane_name, created_at, edited_at
FROM lane WHERE pool_id = (SELECT pool_id FROM pool LIMIT 1);

-- grab all accounts with access to a lane
SELECT a.account_id, a.account_name, l_a.permission FROM lane_access AS l_a
JOIN account AS a ON a.account_id = l_a.account_id
WHERE l_a.permission > 'none'
AND l_a.lane_id = 2;

-- grab all notes for a lane
SELECT note_id, note_text, note_status, created_at, edited_at
FROM note WHERE lane_id = (SELECT lane_id FROM lane LIMIT 1);

-- grab all tags for a note
SELECT t.tag_id, t.tag_name FROM note_tag AS n_t
JOIN tag AS t ON n_t.tag_id = t.tag_id
WHERE n_t.note_id = (SELECT note_id FROM note LIMIT 1);
