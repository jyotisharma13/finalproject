DROP TABLE IF EXISTS profile_images;



CREATE TABLE profile_images(

    id SERIAL PRIMARY KEY,

    img_url VARCHAR(300) NOT NULL,

    user_id INTEGER NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
