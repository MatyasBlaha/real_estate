CREATE DATABASE IF NOT EXISTS realEstate;

USE realEstate;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS estates;
DROP TABLE IF EXISTS estate_images;
DROP TABLE IF EXISTS user_estates;
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS users (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    CONSTRAINT  UQ_User_Email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS roles (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL UNIQUE,
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id     INT NOT NULL,
    role_id     INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS estates (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(255) NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    address     VARCHAR(255) NOT NULL,
    city        VARCHAR(255) NOT NULL,
    `type`      VARCHAR(20) NOT NULL,
    size        VARCHAR(20) NOT NULL,
    bedrooms    INT NOT NULL,
    bathrooms   INT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

    -- CONTACT INFORMATION
    author_id       INT NOT NULL,
    contact_name    VARCHAR(50) NOT NULL,
    contact_email   VARCHAR(100) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS estate_images (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    estate_id   INT NOT NULL,
    image       VARCHAR(512) NOT NULL,
    FOREIGN KEY (estate_id) REFERENCES estates(id) ON DELETE CASCADE,
);

CREATE TABLE IF NOT EXISTS user_estates (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT NOT NULL,
    estate_id   INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (estate_id) REFERENCES estates(id) ON DELETE CASCADE,
);

CREATE TABLE IF NOT EXISTS messages (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    estate_id   INT NOT NULL,
    sender_id   INT NOT NULL,
    message     TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estate_id) REFERENCES estates(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);