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
('Admin', 'admintest@gmail.com', 'adminmdp', 'photo11.jpg', 'Je suis ladmin de ce site', 'active', 1),
('BrickMaster', 'brickmaster@example.com', 'buildmaster', 'photo12.jpg', 'Master of building epic Lego sets.', 'active', 2),
('LegoArtist', 'legoartist@example.com', 'artlover', 'photo13.jpg', 'Creating beautiful art with Lego.', 'active', 2),
('BuildAndPlay', 'buildandplay@example.com', 'playtime', 'photo14.jpg', 'Lego enthusiast who loves to build and play.', 'inactive', 2),
('MiniFigureKing', 'minifigureking@example.com', 'kingofminifigs', 'photo15.jpg', 'King of custom Lego minifigures.', 'active', 2),
('SetCollector', 'setcollector@example.com', 'collectorpass', 'photo16.jpg', 'Collecting every Lego set I can find.', 'inactive', 2),
('LegoEngineer', 'legoengineer@example.com', 'engineeringfun', 'photo17.jpg', 'Engineering marvels with Lego.', 'active', 2),
('LegoStopMotion', 'legostopmotion@example.com', 'moviemagic', 'photo18.jpg', 'Creating Lego stop motion movies.', 'active', 2),
('LegoTeacher', 'legoteacher@example.com', 'educatekids', 'photo19.jpg', 'Teaching with Lego in the classroom.', 'inactive', 2),
('RareLegoCollector', 'rarelegocollector@example.com', 'rarefinds', 'photo20.jpg', 'Collecting rare and valuable Lego pieces.', 'active', 2),
('SpeedBuilder', 'speedbuilder@example.com', 'fastbuilds', 'photo21.jpg', 'Building Lego sets as fast as possible.', 'active', 2),
('BrickArchitect', 'brickarchitect@example.com', 'designbuild', 'photo22.jpg', 'Designing and building Lego structures.', 'inactive', 2),
('LegoAdventurer', 'legoadventurer@example.com', 'explorelego', 'photo23.jpg', 'Exploring the world of Lego.', 'active', 2),
('MinifigCustomizer', 'minifigcustomizer@example.com', 'customize', 'photo24.jpg', 'Customizing Lego minifigures.', 'active', 2),
('LegoStoryTeller', 'legostoryteller@example.com', 'storytime', 'photo25.jpg', 'Telling stories with Lego sets.', 'inactive', 2),
('LegoBuilderPro', 'legobuilderpro@example.com', 'professional', 'photo26.jpg', 'Professional Lego builder.', 'active', 2),
('BrickWarrior', 'brickwarrior@example.com', 'warriorpass', 'photo27.jpg', 'Building Lego battle scenes.', 'inactive', 2),
('LegoBlogger', 'legoblogger@example.com', 'blogginglego', 'photo28.jpg', 'Blogging about Lego news and sets.', 'active', 2),
('CreativeBrick', 'creativebrick@example.com', 'creativepass', 'photo29.jpg', 'Creating unique Lego designs.', 'active', 2),
('LegoDesigner', 'legodesigner@example.com', 'designing', 'photo30.jpg', 'Designing custom Lego sets.', 'active', 2);

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
    state VARCHAR (50),
   	users_id INT,
    tags_id INT,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (tags_id) REFERENCES tag(id)
);



INSERT INTO topics (title, body, publish_date, state, users_id, tags_id) VALUES
('New Lego Set Announcement', 'The new Star Wars Lego set is coming out next month! Excited to see all the new pieces.', '2024-06-01', 'published', FLOOR(1 + RAND() * 20), 1),
('Millennium Falcon Release', 'The iconic Millennium Falcon set is back with more details and a new mini-figure lineup.', '2024-06-10', 'published', FLOOR(1 + RAND() * 20), 1),
('Star Wars Battle Pack', 'Build your army with the latest Star Wars battle pack, featuring new troopers and equipment.', '2024-06-15', 'published', FLOOR(1 + RAND() * 20), 1),
('Death Star Set', 'The Death Star set has been upgraded! It includes new rooms and characters from the latest movie.', '2024-06-20', 'published', FLOOR(1 + RAND() * 20), 1),
('TIE Fighter Collection', 'Collect all the new TIE Fighters, now with improved designs and special edition pieces.', '2024-06-25', 'published', FLOOR(1 + RAND() * 20), 1),
('X-Wing Starfighter', 'Fly into battle with the new X-Wing Starfighter set, featuring a unique pilot mini-figure.', '2024-06-30', 'published', FLOOR(1 + RAND() * 20), 1),
('Star Wars Cantina', 'Recreate the famous cantina scene with this detailed set, including various characters and accessories.', '2024-07-05', 'published', FLOOR(1 + RAND() * 20), 1),
('Jedi Temple Set', 'Build the Jedi Temple with this new set, complete with Jedi mini-figures and training rooms.', '2024-07-10', 'published', FLOOR(1 + RAND() * 20), 1),
('Star Wars Droid Pack', 'Expand your collection with this pack of droids from various Star Wars films.', '2024-07-15', 'published', FLOOR(1 + RAND() * 20), 1),
('Imperial Shuttle', 'The Imperial Shuttle set is here, featuring a detailed interior and new mini-figures.', '2024-07-20', 'published', FLOOR(1 + RAND() * 20), 1),
('Lego Technic Monster Truck', 'The new Lego Technic Monster Truck is a beast! It features rugged tires and a powerful suspension.', '2024-06-01', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Crane', 'Check out the latest Lego Technic Crane. It comes with realistic movements and is perfect for construction enthusiasts.', '2024-06-05', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Sports Car', 'Introducing the new Lego Technic Sports Car. With its sleek design and advanced features, it''s a must-have for car lovers.', '2024-06-10', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Bulldozer', 'The Lego Technic Bulldozer is here. Built for tough jobs, it includes detailed parts for a realistic experience.', '2024-06-15', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Helicopter', 'Fly high with the new Lego Technic Helicopter. It comes with spinning rotors and a detailed cockpit.', '2024-06-20', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Excavator', 'Dig deep with the Lego Technic Excavator. Its realistic arm and bucket movements make it a great build.', '2024-06-25', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Motorcycle', 'Rev up with the Lego Technic Motorcycle. It features a powerful engine and intricate details.', '2024-06-30', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Formula 1 Car', 'Race to victory with the Lego Technic Formula 1 Car. It''s designed for speed and precision.', '2024-07-05', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Space Shuttle', 'Explore space with the Lego Technic Space Shuttle. It includes authentic details and moving parts.', '2024-07-10', 'published', FLOOR(1 + RAND() * 20), 2),
('Lego Technic Rescue Boat', 'Be ready for any emergency with the Lego Technic Rescue Boat. It comes with a detailed deck and lifeboats.', '2024-07-15', 'published', FLOOR(1 + RAND() * 20), 2),
('Spider-Man: New Web Shooter Set', 'Check out the new Spider-Man web shooter set! It comes with realistic web-slinging action.', '2024-06-01', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Daily Bugle', 'The Daily Bugle set is here! Recreate iconic scenes from Spider-Man comics with this detailed build.', '2024-06-05', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Venom Battle', 'Prepare for an epic battle between Spider-Man and Venom. This set includes minifigures and accessories.', '2024-06-10', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Green Goblin Attack', 'The Green Goblin is back! Help Spider-Man save the day with this exciting set.', '2024-06-15', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Stark Tower', 'Build Stark Tower and team up with Spider-Man and Iron Man to defeat the villains.', '2024-06-20', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Bank Heist', 'Stop the bank heist with Spider-Man. This set includes robbers, a bank, and Spider-Man.', '2024-06-25', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Into the Spider-Verse', 'Join Miles Morales and other Spider-People from different dimensions in this Spider-Man: Into the Spider-Verse set.', '2024-06-30', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Doc Ock''s Lab', 'Enter Doc Ock''s lab with Spider-Man. This set features cool gadgets and traps.', '2024-07-05', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Street Chase', 'Join Spider-Man in a thrilling street chase to capture the villains.', '2024-07-10', 'published', FLOOR(1 + RAND() * 20), 3),
('Spider-Man: Bridge Showdown', 'A dramatic showdown on the bridge between Spider-Man and his foes. This set is full of action-packed features.', '2024-07-15', 'published', FLOOR(1 + RAND() * 20), 3),
('Lego City: Police Station', 'The new Lego City Police Station set is here! Help the officers maintain order in the city.', '2024-07-20', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Fire Station', 'Build the Fire Station and help the firefighters save the day in Lego City.', '2024-07-25', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Hospital', 'Take care of the city''s residents with the new Lego City Hospital set.', '2024-07-30', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Airport', 'Fly high with the Lego City Airport set. Includes planes, terminals, and more!', '2024-08-04', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Construction Site', 'Build and manage your own construction site with this detailed Lego City set.', '2024-08-09', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Train Station', 'All aboard! The Lego City Train Station set is ready to transport passengers.', '2024-08-14', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Town Square', 'Create the heart of Lego City with the Town Square set, featuring shops, restaurants, and more.', '2024-08-19', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Marine Rescue', 'Join the marine rescue team and save lives at sea with this exciting set.', '2024-08-24', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Space Center', 'Explore the final frontier with the Lego City Space Center set. Includes rockets and astronauts.', '2024-08-29', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego City: Safari Adventure', 'Embark on a wild adventure with the Safari set, featuring animals and explorers.', '2024-09-03', 'published', FLOOR(1 + RAND() * 20), 4),
('Lego Marvel: Avengers Tower', 'Recreate the iconic Avengers Tower and bring the superheroes to life.', '2024-06-05', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Spider-Man Web Warriors', 'Join Spider-Man and his allies in this action-packed Web Warriors set.', '2024-06-10', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Guardians of the Galaxy', 'Fly across the galaxy with the Guardians and their starship.', '2024-06-15', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Iron Man Hall of Armor', 'Build and showcase the various Iron Man suits in this detailed Hall of Armor.', '2024-06-20', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Black Panther Pursuit', 'Join Black Panther in an epic chase to save Wakanda.', '2024-06-25', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Captain America Bike Chase', 'Speed through the streets with Captain America on his powerful bike.', '2024-06-30', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Hulkbuster Smash-Up', 'Take on enemies with the massive Hulkbuster suit.', '2024-07-05', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Thor''s Weapon Quest', 'Help Thor find a powerful new weapon to defeat his foes.', '2024-07-10', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Doctor Strange Sanctum Sanctorum', 'Explore the mystical world of Doctor Strange with the Sanctum Sanctorum set.', '2024-07-15', 'published', FLOOR(1 + RAND() * 20), 5),
('Lego Marvel: Ant-Man and The Wasp', 'Shrink down to miniature size for big adventures with Ant-Man and The Wasp.', '2024-07-20', 'published', FLOOR(1 + RAND() * 20), 5);





CREATE TABLE post(
    id INT PRIMARY KEY AUTO_INCREMENT,
    body text,
 	publish_date date,
    topics_id VARCHAR (255),
   	users_id INT,
    FOREIGN KEY (topics_id) REFERENCES topics(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
);

INSERT INTO post (body, publish_date, topics_id, users_id)
VALUES 
('The new Star Wars Lego set is coming out next month! Excited to see all the new pieces.', '2024-06-01', 1,  FLOOR(1 + RAND() * 20)),
('I heard it includes a new type of lightsaber piece. Can’t wait to see it in person!', '2024-06-02',  1,  FLOOR(1 + RAND() * 20)),
('I hope they include more minifigures in this set. The more, the better!', '2024-06-03', 1, FLOOR(1 + RAND() * 20)),
('Does anyone know if this set will have any exclusive minifigures?', '2024-06-04', 1,  FLOOR(1 + RAND() * 20)),
('I read somewhere that it will have a new version of Luke Skywalker!', '2024-06-05', 1,  FLOOR(1 + RAND() * 20)),
('That’s awesome! I’m definitely going to pre-order it as soon as possible.', '2024-06-06', 1,  FLOOR(1 + RAND() * 20)),
('Has anyone seen the leaked images? The set looks incredible!', '2024-06-07', 1,  FLOOR(1 + RAND() * 20)),
('Yes, the details on the new X-Wing are amazing. They’ve really outdone themselves.', '2024-06-08', 1,  FLOOR(1 + RAND() * 20)),
('I’m curious about the price. Does anyone have any information on that?', '2024-06-09',  1, FLOOR(1 + RAND() * 20)),
('I think it’s going to be around $150, but it looks like it will be worth it!', '2024-06-10', 1,  FLOOR(1 + RAND() * 20)),
('The iconic Millennium Falcon set is back with more details and a new mini-figure lineup.', '2024-06-10', 2, FLOOR(1 + RAND() * 20)),
('Build Stark Tower and team up with Spider-Man and Iron Man to defeat the villains.', '2024-06-20', 2, FLOOR(1 + RAND() * 20)),
('The new Lego City Police Station set is here! Help the officers maintain order in the city.', '2024-07-20', 2, FLOOR(1 + RAND() * 20)),
('Using Technic pieces is a great idea! I also use them for my large builds.', '2024-06-02', 2,  FLOOR(1 + RAND() * 20)),
('I display my collection on custom-built shelves. They look amazing!', '2024-06-03', 3,  FLOOR(1 + RAND() * 20)),
('I have tried customizing minifigures. Paint and decals work great!', '2024-06-04', 4,  FLOOR(1 + RAND() * 20)),
('For lighting, I use LED panels. They provide even lighting without heating up.', '2024-06-05', 5,  FLOOR(1 + RAND() * 20));


CREATE TABLE tag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255)
    );

INSERT INTO tag (label)
VALUES 
('Star Wars'), ('Technic'), ('Spider-Man'), ('City'), ('Marvel');
