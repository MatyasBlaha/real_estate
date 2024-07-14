-- Initialize the real estate database
CREATE DATABASE IF NOT EXISTS realEstate;
USE realEstate;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS user_estates;
DROP TABLE IF EXISTS estate_images;
DROP TABLE IF EXISTS estates;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS user_verification_tokens;
DROP TABLE IF EXISTS user_avatar;
DROP TABLE IF EXISTS user_verifications;
DROP TABLE IF EXISTS user_profiles;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL UNIQUE
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id          VARCHAR(255) UNIQUE NOT NULL,
    first_name   VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    verified     BOOLEAN DEFAULT FALSE,
    is_active   BOOLEAN DEFAULT FALSE,
    last_login  TIMESTAMP NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT  UQ_User_Email UNIQUE (email)
);

-- Create user_verifications table
CREATE TABLE IF NOT EXISTS user_verification_tokens (
    user_id             VARCHAR(255) NOT NULL,
    verification_token   VARCHAR(255) NOT NULL,
    token_created_at          TIMESTAMP NOT NULL,
    token_expires_at          TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS sessions (
    session_id          VARCHAR(255) NOT NULL,
    expires             INT(11) UNSIGNED NOT NULL,
    data                TEXT,
    PRIMARY KEY (session_id)
);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id          VARCHAR(255) UNIQUE NOT NULL,
    user_id     VARCHAR(255) NOT NULL,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    avatar_url  VARCHAR(512),
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_avatar table (deprecated)
CREATE TABLE IF NOT EXISTS user_avatar (
    id          VARCHAR(255) UNIQUE NOT NULL,
    user_id     VARCHAR(255) NOT NULL,
    avatar_url  VARCHAR(512) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id     VARCHAR(255) NOT NULL,
    role_id     INT NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);


-- Create estates table
CREATE TABLE IF NOT EXISTS estates (
    id              VARCHAR(255) UNIQUE NOT NULL,
    title           VARCHAR(255) NOT NULL,
    price           DECIMAL(10, 2) NOT NULL,
    description     VARCHAR(512) NOT NULL,
    address         VARCHAR(255) NOT NULL,
    city            VARCHAR(255) NOT NULL,
    `type`          VARCHAR(20) NOT NULL,
    size            VARCHAR(20) NOT NULL,
    bedrooms        INT NOT NULL,
    bathrooms       INT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id       VARCHAR(255) NOT NULL,
    contact_name    VARCHAR(50) NOT NULL,
    contact_email   VARCHAR(100) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Create estate_images table
CREATE TABLE IF NOT EXISTS estate_images (
    id          VARCHAR(255) UNIQUE NOT NULL,
    estate_id   VARCHAR(255) NOT NULL,
    image_url   VARCHAR(512) NOT NULL,
    FOREIGN KEY (estate_id) REFERENCES estates(id) ON DELETE CASCADE
);

-- Create user_estates table
CREATE TABLE IF NOT EXISTS user_estates (
    id          VARCHAR(255) UNIQUE NOT NULL,
    user_id     VARCHAR(255) NOT NULL,
    estate_id   VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (estate_id) REFERENCES estates(id) ON DELETE CASCADE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id          VARCHAR(255) UNIQUE NOT NULL,
    estate_id   VARCHAR(255) NOT NULL,
    sender_id   VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estate_id) REFERENCES estates(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default roles
INSERT INTO roles (name) VALUES ('user');
INSERT INTO roles (name) VALUES ('admin');

-- Create indexes for optimization
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_estates_city ON estates (city);
