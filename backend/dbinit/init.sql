CREATE DATABASE IF NOT EXISTS realEstate;
USE realEstate;

    -- PROPERTY
DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS property_features;
DROP TABLE IF EXISTS property_location;
DROP TABLE IF EXISTS property_images;

    -- USER ROLES
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;


    -- USER PROFILES
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS user_verification_tokens;
DROP TABLE IF EXISTS user_verifications;
DROP TABLE IF EXISTS user_profile;

    -- CONTACTING
DROP TABLE IF EXISTS messages;


CREATE TABLE IF NOT EXISTS roles (
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS users (
    id          VARCHAR(255) UNIQUE NOT NULL,
    first_name   VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    country     VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) UNIQUE,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    verified     BOOLEAN DEFAULT FALSE,
    is_active   BOOLEAN DEFAULT FALSE,
    last_login  TIMESTAMP NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT  UQ_User_Email UNIQUE (email)
);

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


CREATE TABLE IF NOT EXISTS user_profile (
    id          VARCHAR(255) UNIQUE NOT NULL,
    user_id     VARCHAR(255) NOT NULL,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    avatar_path  VARCHAR(512),
    description TEXT,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS user_roles (
    user_id     VARCHAR(255) NOT NULL,
    role_id     INT NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS property (
    id                      VARCHAR(255) UNIQUE NOT NULL,
    user_profile_id         VARCHAR(255) NOT NULL,
    property_type           VARCHAR(255) NOT NULL,
    price                   DECIMAL(15, 2) NOT NULL,
    living_expenses         DECIMAL(10, 2) NOT NULL,
    building_type           VARCHAR(255),
    building_condition      VARCHAR(255),
    ownership_type          VARCHAR(255),
    floor                   INT,
    total_floors            INT,
    usable_area             DECIMAL(10, 2),
    land_size               DECIMAL(10, 2),
    cellar_size             DECIMAL(10, 2),
    move_in_date            DATE,
    water_supply            VARCHAR(255),
    heating_type            VARCHAR(255),
    sewage_type             VARCHAR(255),
    electricity_type        VARCHAR(255),
    energy_efficiency_class VARCHAR(255),
    energy_certificate      BOOLEAN,
    partially_furnished     BOOLEAN,
    has_elevator            BOOLEAN,
    created_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_profile_id) REFERENCES user_profile(id) ON DELETE CASCADE
    );


CREATE TABLE IF NOT EXISTS property_features (
    id            VARCHAR(255) UNIQUE NOT NULL,
    property_id   VARCHAR(255) NOT NULL,
    feature_name  VARCHAR(255),
    feature_value VARCHAR(255),
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE CASCADE
    );


CREATE TABLE IF NOT EXISTS property_location (
    id            VARCHAR(255) UNIQUE NOT NULL,
    property_id   VARCHAR(255) NOT NULL,
    latitude      DECIMAL(10, 8),
    longitude     DECIMAL(11, 8),
    address       VARCHAR(512),
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS property_images (
    id            VARCHAR(255) UNIQUE NOT NULL,
    property_id   VARCHAR(255) NOT NULL,
    image_path    VARCHAR(512) NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE CASCADE
    );


CREATE TABLE IF NOT EXISTS messages (
    id          VARCHAR(255) UNIQUE NOT NULL,
    estate_id   VARCHAR(255) NOT NULL,
    sender_id   VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estate_id) REFERENCES estates(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO roles (name) VALUES ('user');
INSERT INTO roles (name) VALUES ('admin');
