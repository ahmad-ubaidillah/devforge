-- DevForge Auto-Merged Migration
-- Generated at: 2026-03-05T22:03:59.725Z

-- Source: 0001_users.sql
CREATE TABLE users (id SERIAL PRIMARY KEY);

-- Source: 0002_payments.sql
CREATE TABLE payments (id SERIAL PRIMARY KEY, user_id INTEGER);

