CREATE DATABASE forum
DEFAULT CHARACTER SET latin1
DEFAULT COLLATE latin1_bin;

use forum;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    biography TEXT,
    user_connexion VARCHAR(20),
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(id)
);

INSERT INTO users (username, email, user_password, photo, biography, user_connexion, admin_id)
VALUES 
('LegoFan123', 'legofan123@example.com', 'password123', 'photo1.jpg', 'A huge fan of Lego, especially Star Wars sets.', 'active', 1),
('MasterBuilder', 'masterbuilder@example.com', 'securepass', 'photo2.jpg', 'I love building complex Lego structures.', 'active', 2),
('BrickLover', 'bricklover@example.com', 'mypassword', 'photo3.jpg', 'Collecting Lego sets for over 10 years.', 'active', 2),
('MinifigMaker', 'minifigmaker@example.com', 'minifigs4life', 'photo4.jpg', 'Creating custom Lego minifigures.', 'inactive', 2),
('StopMotionPro', 'stopmotionpro@example.com', 'filmlover', 'photo5.jpg', 'Making stop motion videos with Lego.', 'active', 2),
('EduBuilder', 'edubuilder@example.com', 'teachandlearn', 'photo6.jpg', 'Using Lego as an educational tool.', 'inactive', 2),
('CollectorJoe', 'collectorjoe@example.com', 'collectall', 'photo7.jpg', 'I have a large collection of rare Lego pieces.', 'active', 2),
('CompetitiveBuilder', 'compbuilder@example.com', 'winningmove', 'photo8.jpg', 'Competing in Lego building competitions.', 'active', 2),
('MovieCritic', 'moviecritic@example.com', 'movielover', 'photo9.jpg', 'Discussing Lego movies.', 'active', 2),
('BargainHunter', 'bargainhunter@example.com', 'savemoney', 'photo10.jpg', 'Finding the best deals on Lego sets.', 'inactive', 2),
('Admin', 'admintest@gmail.com', 'adminmdp', 'photo11', 'Je suis ladmin de ce site', 'active', 1);

CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin_status VARCHAR(50)
);

INSERT INTO admin (admin_status) 
VALUES ('admin'), ('user');


CREATE TABLE topics(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    body text,
 	publish_date date,
   	author VARCHAR(50),
    state VARCHAR (50),
   	users_id INT,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

INSERT INTO topics (title, body, publish_date, author, state, users_id)
VALUES 
('New Lego Set Announcement', 'The new Star Wars Lego set is coming out next month! Excited to see all the new pieces.', '2024-06-01', 'LegoFan123', 'published', 1),
('Best Techniques for Building', 'Share your best techniques for building complex Lego structures. I personally love using Technic pieces for stability.', '2024-06-02', 'MasterBuilder', 'published', 2),
('Lego Collections', 'How do you display your Lego collections? I use glass cabinets to keep them dust-free.', '2024-06-03', 'BrickLover', 'published', 3),
('Custom Lego Minifigures', 'Has anyone tried creating custom minifigures? I am looking for tips and resources.', '2024-06-04', 'MinifigMaker', 'draft', 4),
('Lego Stop Motion Videos', 'I am making a Lego stop motion video. Any advice on lighting and camera settings?', '2024-06-05', 'StopMotionPro', 'published', 5),
('Lego for Education', 'Discussing how Lego can be used as an educational tool in classrooms.', '2024-06-06', 'EduBuilder', 'draft', 6),
('Rare Lego Pieces', 'What are the rarest Lego pieces you own? I have a chrome gold C-3PO minifigure.', '2024-06-07', 'CollectorJoe', 'published', 7),
('Lego Competitions', 'Are there any upcoming Lego building competitions? I am eager to participate.', '2024-06-08', 'CompetitiveBuilder', 'published', 8),
('Lego Movie Discussion', 'Lets talk about the latest Lego movie. What did you think of the plot and the animation?', '2024-06-09', 'MovieCritic', 'published', 9),
('Lego Deals and Discounts', 'Share any current deals and discounts on Lego sets you find online.', '2024-06-10', 'BargainHunter', 'draft', 10);


CREATE TABLE post(
    id INT PRIMARY KEY AUTO_INCREMENT,
    body text,
 	publish_date date,
   	author VARCHAR(50),
    topics_id VARCHAR (255),
   	users_id INT,
    FOREIGN KEY (topics_id) REFERENCES topics(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
);

INSERT INTO post (body, publish_date, author, topics_id, users_id)
VALUES 
('The new Star Wars Lego set is coming out next month! Excited to see all the new pieces.', '2024-06-01', 'LegoFan123', 1, 1),
('I heard it includes a new type of lightsaber piece. Can’t wait to see it in person!', '2024-06-02', 'StarWarsFan2', 1, 2),
('I hope they include more minifigures in this set. The more, the better!', '2024-06-03', 'StarWarsFan3', 1, 3),
('Does anyone know if this set will have any exclusive minifigures?', '2024-06-04', 'StarWarsFan4', 1, 4),
('I read somewhere that it will have a new version of Luke Skywalker!', '2024-06-05', 'StarWarsFan5', 1, 5),
('That’s awesome! I’m definitely going to pre-order it as soon as possible.', '2024-06-06', 'StarWarsFan6', 1, 6),
('Has anyone seen the leaked images? The set looks incredible!', '2024-06-07', 'StarWarsFan7', 1, 7),
('Yes, the details on the new X-Wing are amazing. They’ve really outdone themselves.', '2024-06-08', 'StarWarsFan8', 1, 8),
('I’m curious about the price. Does anyone have any information on that?', '2024-06-09', 'StarWarsFan9', 1, 9),
('I think it’s going to be around $150, but it looks like it will be worth it!', '2024-06-10', 'StarWarsFan10', 1, 10),
('Using Technic pieces is a great idea! I also use them for my large builds.', '2024-06-02', 'BrickMaster', 2, 2),
('I display my collection on custom-built shelves. They look amazing!', '2024-06-03', 'LegoCollector', 3, 3),
('I have tried customizing minifigures. Paint and decals work great!', '2024-06-04', 'CustomLegoFan', 4, 4),
('For lighting, I use LED panels. They provide even lighting without heating up.', '2024-06-05', 'FilmMaker101', 5, 5),
('Lego is perfect for teaching geometry and spatial awareness.', '2024-06-06', 'TeacherLego', 6, 6),
('I own a Mr. Gold minifigure! Its my rarest piece.', '2024-06-07', 'RareCollector', 7, 7),
('There s a competition in July. Check out the details on the official Lego site.', '2024-06-08', 'CompLego', 8, 8),
('The latest Lego movie was fantastic! The animation was top-notch.', '2024-06-09', 'MovieBuff', 9, 9),
('I found a 20% off deal on Amazon for the new Lego sets.', '2024-06-10', 'DealFinder', 10, 10);

CREATE TABLE tag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255)
    );
