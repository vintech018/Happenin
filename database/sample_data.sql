-- ============================================
-- Happenin Ticket Booking System
-- Sample Data Insertion
-- ============================================

USE happenin_db;

-- Insert Seat Categories
INSERT INTO seat_categories (category_name, description, price_multiplier) VALUES
('Standard', 'Regular seating', 1.00),
('Premium', 'Better viewing angle and comfort', 1.40),
('VIP', 'Best seats with premium amenities', 2.00),
('General Admission', 'Open seating area', 0.80),
('Reserved Seating', 'Assigned reserved seats', 1.20),
('Standing/Entry', 'Standing area entry', 0.60);

-- Insert Venues
INSERT INTO venues (venue_name, address, city, state, pincode, capacity, venue_type, contact_phone, contact_email) VALUES
('TVA Cinema, New York', '123 Broadway St', 'New York', 'NY', '10001', 200, 'Cinema', '212-555-0100', 'tva@cinema.com'),
('Cinema Hall', '456 Main Street', 'Mumbai', 'Maharashtra', '400001', 300, 'Cinema', '022-2345-6789', 'info@cinemahall.com'),
('Arkham Cinemas', '789 Gotham Ave', 'Delhi', 'Delhi', '110001', 250, 'Cinema', '011-2345-6789', 'arkham@cinemas.com'),
('Comedy Club, Mumbai', '321 Laugh Street', 'Mumbai', 'Maharashtra', '400052', 150, 'Club', '022-9876-5432', 'comedy@club.com'),
('Jawaharlal Nehru Stadium', 'Pragati Vihar', 'New Delhi', 'Delhi', '110003', 60000, 'Stadium', '011-2345-1234', 'jnstadium@delhi.com'),
('M. Chinnaswamy Stadium', 'Cubbon Road', 'Bangalore', 'Karnataka', '560001', 38000, 'Stadium', '080-2225-1234', 'chinnaswamy@karnataka.com'),
('The Comedy Clubhouse', 'Pune Entertainment District', 'Pune', 'Maharashtra', '411001', 200, 'Club', '020-2345-6789', 'comedyclub@pune.com'),
('Music Academy', 'TTK Road', 'Chennai', 'Tamil Nadu', '600014', 1000, 'Theater', '044-2345-6789', 'music@academy.com'),
('Kalagram', 'Sector 1', 'Chandigarh', 'Punjab', '160001', 5000, 'Open Air', '0172-2345-6789', 'kalagram@chd.com');

-- Insert Movies
INSERT INTO movies (title, year, genre, rating, director, stars, studio, description, poster_url, trailer_url, duration_minutes, release_date) VALUES
('Deadpool & Wolverine', 2024, 'Action, Comedy, Sci-Fi', 8.1, 'Shawn Levy', 'Ryan Reynolds, Hugh Jackman', 'Marvel Studios (MCU)', 'The next installment in the MCU featuring Deadpool as he gets sucked into the timeline by the Time Variance Authority (TVA).', 'images/deadpool.jpg', 'https://www.youtube.com/embed/Id_5-sj7w4w', 127, '2024-07-26'),
('Venom: The Last Dance', 2024, 'Action, Sci-Fi', 6.0, 'Kelly Marcel', 'Tom Hardy, Chiwetel Ejiofor, Juno Temple', 'Sony Pictures', 'Tom Hardy returns as Eddie Brock for the final film in the trilogy.', 'images/venom.jpg', 'https://www.youtube.com/embed/rhYz2vuLFrI', 120, '2024-10-01'),
('Joker: Folie à Deux', 2024, 'Drama, Musical', 5.2, 'Todd Phillips', 'Joaquin Phoenix, Lady Gaga', 'Warner Bros', 'The sequel to Joker (2019) finds Arthur Fleck institutionalized at Arkham State Hospital.', 'images/joker.jpg', 'https://www.youtube.com/embed/_OKAwz2MsJs', 138, '2024-10-04'),
('Dune: Part Two', 2024, 'Action, Sci-Fi', 8.4, 'Denis Villeneuve', 'Timothée Chalamet, Zendaya, Austin Butler', 'Warner Bros', 'The saga continues as Paul Atreides unites with Chani and the Fremen.', 'images/dune-part2.jpg', 'https://www.youtube.com/embed/Way9Dexny3w', 166, '2024-03-01'),
('The Batman', 2022, 'Action, Crime, Drama', 7.8, 'Matt Reeves', 'Robert Pattinson, Zoë Kravitz, Jeffrey Wright', 'Warner Bros', 'In his second year fighting crime in Gotham City, the vigilante Batman investigates the Riddler.', 'images/batman.jpg', 'https://www.youtube.com/embed/mqqft2x_Aa4', 176, '2022-03-04'),
('Inside Out 2', 2024, 'Animation, Comedy', 7.8, 'Kelsey Mann', 'Amy Poehler, Maya Hawke, Lewis Black', 'Pixar Animation Studios', 'Inside Out 2 returns to the mind of newly minted teenager Riley.', 'images/inside.jpg', 'https://www.youtube.com/embed/LEjhY15eCx0', 96, '2024-06-14'),
('Oppenheimer', 2023, 'Biography, Drama', 8.3, 'Christopher Nolan', 'Cillian Murphy, Emily Blunt, Robert Downey Jr.', 'Universal Pictures', 'J. Robert Oppenheimer, the American theoretical physicist, is appointed to direct the Manhattan Project.', 'images/oppenheimer.jpg', 'https://www.youtube.com/embed/uYPbbksJxIg', 180, '2023-07-21');

-- Insert Live Events (matching liveEvents.js data)
INSERT INTO live_events (title, category, description, event_date, event_time, venue_id, organizer_name, image_url, base_price) VALUES
('Comedy Non-Stop', 'Comedy', 'Catch Anubhav Singh Bassi live for his acclaimed stand-up special, Comedy Non-Stop. Known for his relatable storytelling and sharp wit, Bassi guarantees an evening of non-stop laughter. This is an intimate club performance.', '2024-09-25', '20:00:00', 4, 'Comedy Club Productions', 'images/bassi.jpg', 299),
('Comedy Non-Stop', 'Comedy', 'Catch Anubhav Singh Bassi live for his acclaimed stand-up special, Comedy Non-Stop. Known for his relatable storytelling and sharp wit, Bassi guarantees an evening of non-stop laughter. This is an intimate club performance.', '2024-09-26', '20:00:00', 4, 'Comedy Club Productions', 'images/bassi.jpg', 299),
('Chandigarh Comedy Carnival', 'Comedy', 'The Chandigarh Comedy Carnival brings together a massive lineup of over 15 national stand-up artists, including Abhishek Upmanyu, Appurv Gupta, and Manish Tyagi. Held at the spacious Kalagram, expect a night of diverse and brilliant humor.', '2024-10-10', '19:30:00', 9, 'Comedy Carnival Events', 'images/Chandigarh.jpg', 499),
('Imagine Dragons Live', 'Concert', 'The Imagine Dragons World Tour comes to India! Experience a night of powerful anthems and electrifying energy at the Bengaluru Stadium. Don\'t miss hits like "Radioactive," "Believer," and "Thunder."', '2024-09-12', '19:30:00', 6, 'AEG Presents', 'images/imagine_dragons.jpg', 2499),
('Imagine Dragons Live', 'Concert', 'The Imagine Dragons World Tour comes to India! Experience a night of powerful anthems and electrifying energy at the Bengaluru Stadium. Don\'t miss hits like "Radioactive," "Believer," and "Thunder."', '2024-09-13', '19:30:00', 6, 'AEG Presents', 'images/imagine_dragons.jpg', 2499),
('Comedy Nights', 'Comedy', 'Komedi Nights presents a laugh riot featuring top comedians from across India. Get ready for an evening of side-splitting humor and unforgettable performances.', '2024-09-18', '20:00:00', 7, 'Komedi Nights', 'images/comedy_nights.jpg', 399),
('Samay Raina Stand-up', 'Stand-up', 'Samay Raina brings his unique brand of comedy to The Comedy Store, Pune. Known for his chess-themed humor and quick wit, this is a show you don\'t want to miss!', '2024-09-30', '20:00:00', 7, 'Comedy Store', 'images/samay_raina.jpg', 599),
('EDM Sunset Fest', 'Festival', 'Experience the ultimate EDM festival at Sunset Beach, Goa. Dance to the beats of top DJs as the sun sets over the Arabian Sea. A night you won\'t forget!', '2024-10-05', '18:00:00', 9, 'EDM Festivals', 'images/sunset.jpg_large', 2499),
('Coldplay Concert', 'Concert', 'Coldplay brings their spectacular world tour to India! Experience their greatest hits live at the Jawaharlal Nehru Stadium in Delhi. A night of music, lights, and unforgettable memories.', '2024-10-15', '19:00:00', 5, 'Live Nation', 'images/coldplay.jpg', 2999),
('Classical Music Festival', 'Concert', 'Experience the finest in classical music at the Music Academy, Chennai. Featuring renowned musicians and orchestras, this festival celebrates the rich heritage of Indian classical music.', '2024-11-02', '19:00:00', 8, 'Music Academy', 'images/classical.jpg', 1200);

-- Insert Showtimes for Movies (matching movies.js data with proper dates)
-- Deadpool & Wolverine - TVA Cinema, New York (Jul 26, 27, 28)
INSERT INTO showtimes (movie_id, venue_id, show_date, show_time, screen_number, format_type, base_price, available_seats, total_seats) VALUES
-- July 26, 2024
(1, 1, '2024-07-26', '11:30:00', 1, '2D', 250, 180, 200),
(1, 1, '2024-07-26', '14:45:00', 1, '2D', 250, 190, 200),
(1, 1, '2024-07-26', '18:00:00', 1, '2D', 250, 200, 200),
(1, 1, '2024-07-26', '21:15:00', 1, '2D', 250, 195, 200),
-- July 27, 2024
(1, 1, '2024-07-27', '11:30:00', 1, '2D', 250, 200, 200),
(1, 1, '2024-07-27', '16:00:00', 2, 'IMAX 3D', 450, 200, 200),
(1, 1, '2024-07-27', '22:30:00', 2, 'IMAX 3D', 450, 180, 200),
-- July 28, 2024
(1, 1, '2024-07-28', '11:30:00', 1, '2D', 250, 200, 200),
(1, 1, '2024-07-28', '14:45:00', 1, '2D', 250, 200, 200),
(1, 1, '2024-07-28', '18:00:00', 1, '2D', 250, 200, 200),
(1, 1, '2024-07-28', '21:15:00', 1, '2D', 250, 200, 200);

-- Venom: The Last Dance - Cinema Hall, Mumbai (Today, Tomorrow, Day After - using current dates)
INSERT INTO showtimes (movie_id, venue_id, show_date, show_time, screen_number, format_type, base_price, available_seats, total_seats) VALUES
-- Multiple days with 5 showtimes each
(2, 2, CURDATE(), '10:30:00', 1, '2D', 320, 280, 300),
(2, 2, CURDATE(), '13:00:00', 1, '2D', 320, 290, 300),
(2, 2, CURDATE(), '16:30:00', 1, '2D', 320, 300, 300),
(2, 2, CURDATE(), '19:30:00', 1, '2D', 320, 295, 300),
(2, 2, CURDATE(), '22:00:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:30:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '13:00:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '16:30:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '19:30:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '22:00:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '10:30:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '13:00:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '16:30:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '19:30:00', 1, '2D', 320, 300, 300),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '22:00:00', 1, '2D', 320, 300, 300);

-- Joker: Folie à Deux - Arkham Cinemas, Delhi (Today, Tomorrow)
INSERT INTO showtimes (movie_id, venue_id, show_date, show_time, screen_number, format_type, base_price, available_seats, total_seats) VALUES
(3, 3, CURDATE(), '11:00:00', 1, '2D', 300, 230, 250),
(3, 3, CURDATE(), '14:00:00', 1, '2D', 300, 240, 250),
(3, 3, CURDATE(), '17:00:00', 1, '2D', 300, 250, 250),
(3, 3, CURDATE(), '20:00:00', 1, '2D', 300, 245, 250),
(3, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '11:00:00', 1, '2D', 300, 250, 250),
(3, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:00:00', 1, '2D', 300, 250, 250),
(3, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '17:00:00', 1, '2D', 300, 250, 250),
(3, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '20:00:00', 1, '2D', 300, 250, 250);

-- Dune: Part Two - Cinema Hall, Mumbai (Today, Tomorrow)
INSERT INTO showtimes (movie_id, venue_id, show_date, show_time, screen_number, format_type, base_price, available_seats, total_seats) VALUES
(4, 2, CURDATE(), '10:00:00', 2, '2D', 350, 280, 300),
(4, 2, CURDATE(), '13:30:00', 2, '2D', 350, 290, 300),
(4, 2, CURDATE(), '16:00:00', 2, '2D', 350, 300, 300),
(4, 2, CURDATE(), '19:00:00', 2, '2D', 350, 295, 300),
(4, 2, CURDATE(), '22:30:00', 2, '2D', 350, 300, 300),
(4, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00:00', 2, '2D', 350, 300, 300),
(4, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '13:30:00', 2, '2D', 350, 300, 300),
(4, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '16:00:00', 2, '2D', 350, 300, 300),
(4, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '19:00:00', 2, '2D', 350, 300, 300),
(4, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '22:30:00', 2, '2D', 350, 300, 300);

-- The Batman - Cinema Hall, Mumbai (Today, Tomorrow)
INSERT INTO showtimes (movie_id, venue_id, show_date, show_time, screen_number, format_type, base_price, available_seats, total_seats) VALUES
(5, 2, CURDATE(), '10:15:00', 1, '2D', 340, 280, 300),
(5, 2, CURDATE(), '13:15:00', 1, '2D', 340, 290, 300),
(5, 2, CURDATE(), '16:15:00', 1, '2D', 340, 300, 300),
(5, 2, CURDATE(), '19:15:00', 1, '2D', 340, 295, 300),
(5, 2, CURDATE(), '22:15:00', 1, '2D', 340, 300, 300),
(5, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:15:00', 1, '2D', 340, 300, 300),
(5, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '13:15:00', 1, '2D', 340, 300, 300),
(5, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '16:15:00', 1, '2D', 340, 300, 300),
(5, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '19:15:00', 1, '2D', 340, 300, 300),
(5, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '22:15:00', 1, '2D', 340, 300, 300);

-- Inside Out 2 - Cinema Hall, Mumbai (Today, Tomorrow)
INSERT INTO showtimes (movie_id, venue_id, show_date, show_time, screen_number, format_type, base_price, available_seats, total_seats) VALUES
(6, 2, CURDATE(), '10:00:00', 3, '2D', 300, 280, 300),
(6, 2, CURDATE(), '13:00:00', 3, '2D', 300, 290, 300),
(6, 2, CURDATE(), '16:00:00', 3, '2D', 300, 300, 300),
(6, 2, CURDATE(), '19:00:00', 3, '2D', 300, 295, 300),
(6, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00:00', 3, '2D', 300, 300, 300),
(6, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '13:00:00', 3, '2D', 300, 300, 300),
(6, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '16:00:00', 3, '2D', 300, 300, 300),
(6, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '19:00:00', 3, '2D', 300, 300, 300);

-- Oppenheimer - Cinema Hall, Mumbai (Today, Tomorrow)
INSERT INTO showtimes (movie_id, venue_id, show_date, show_time, screen_number, format_type, base_price, available_seats, total_seats) VALUES
(7, 2, CURDATE(), '11:30:00', 1, '2D', 350, 230, 250),
(7, 2, CURDATE(), '14:30:00', 1, '2D', 350, 240, 250),
(7, 2, CURDATE(), '17:30:00', 1, '2D', 350, 250, 250),
(7, 2, CURDATE(), '20:30:00', 1, '2D', 350, 245, 250),
(7, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '11:30:00', 1, '2D', 350, 250, 250),
(7, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:30:00', 1, '2D', 350, 250, 250),
(7, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '17:30:00', 1, '2D', 350, 250, 250),
(7, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '20:30:00', 1, '2D', 350, 250, 250);

-- Insert Seats for all Cinema Venues
-- Helper function to generate seats for a venue
-- Venue 1: TVA Cinema, New York (200 seats - 8 rows x 10 seats)
INSERT INTO seats (venue_id, row_label, seat_number, category_id) 
SELECT 1, row_label, seat_num, 
       CASE 
           WHEN row_label IN ('A', 'B') THEN 3  -- VIP
           WHEN row_label IN ('C', 'D') THEN 2  -- Premium
           ELSE 1  -- Standard
       END
FROM (
    SELECT row_label, seat_num
    FROM (
        SELECT 'A' as row_label, n as seat_num FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'B', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'C', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'D', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'E', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'F', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'G', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'H', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
    ) seats
) seat_combinations;

-- Venue 2: Cinema Hall, Mumbai (300 seats - 10 rows x 10 seats)
INSERT INTO seats (venue_id, row_label, seat_number, category_id) 
SELECT 2, row_label, seat_num, 
       CASE 
           WHEN row_label IN ('A', 'B') THEN 3  -- VIP
           WHEN row_label IN ('C', 'D', 'E') THEN 2  -- Premium
           ELSE 1  -- Standard
       END
FROM (
    SELECT row_label, seat_num
    FROM (
        SELECT 'A' as row_label, n as seat_num FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'B', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'C', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'D', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'E', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'F', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'G', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'H', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'I', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'J', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
    ) seats
) seat_combinations;

-- Venue 3: Arkham Cinemas, Delhi (250 seats - 10 rows x 10 seats, but only 5 rows used)
INSERT INTO seats (venue_id, row_label, seat_number, category_id) 
SELECT 3, row_label, seat_num, 
       CASE 
           WHEN row_label IN ('A', 'B') THEN 3  -- VIP
           WHEN row_label IN ('C', 'D') THEN 2  -- Premium
           ELSE 1  -- Standard
       END
FROM (
    SELECT row_label, seat_num
    FROM (
        SELECT 'A' as row_label, n as seat_num FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'B', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'C', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'D', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
        UNION ALL SELECT 'E', n FROM (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t
    ) seats
) seat_combinations;

-- Insert Users
INSERT INTO users (username, email, password_hash, full_name, phone, date_of_birth, gender, address, city, state, pincode) VALUES
('john_doe', 'john.doe@email.com', '$2b$10$example_hash_1', 'John Doe', '9876543210', '1990-05-15', 'Male', '123 Main St', 'Mumbai', 'Maharashtra', '400001'),
('jane_smith', 'jane.smith@email.com', '$2b$10$example_hash_2', 'Jane Smith', '9876543211', '1992-08-20', 'Female', '456 Park Ave', 'Delhi', 'Delhi', '110001'),
('bob_wilson', 'bob.wilson@email.com', '$2b$10$example_hash_3', 'Bob Wilson', '9876543212', '1988-12-10', 'Male', '789 Oak Road', 'Bangalore', 'Karnataka', '560001'),
('alice_brown', 'alice.brown@email.com', '$2b$10$example_hash_4', 'Alice Brown', '9876543213', '1995-03-25', 'Female', '321 Elm Street', 'Pune', 'Maharashtra', '411001'),
('charlie_davis', 'charlie.davis@email.com', '$2b$10$example_hash_5', 'Charlie Davis', '9876543214', '1991-07-30', 'Male', '654 Pine Lane', 'Chennai', 'Tamil Nadu', '600014'),
('diana_miller', 'diana.miller@email.com', '$2b$10$example_hash_6', 'Diana Miller', '9876543215', '1993-11-05', 'Female', '987 Maple Drive', 'Chandigarh', 'Punjab', '160001');

-- Insert Coupons
INSERT INTO coupons (coupon_code, discount_type, discount_value, min_purchase_amount, max_discount_amount, valid_from, valid_until, usage_limit, is_active, description) VALUES
('HAPPENIN20', 'Percentage', 20.00, 500, 1000, '2024-01-01', '2024-12-31', 1000, TRUE, '20% off on purchases above ₹500'),
('FREESTUFF', 'Fixed', 500.00, 1000, 500, '2024-01-01', '2024-12-31', 500, TRUE, 'Flat ₹500 off on purchases above ₹1000'),
('NEWUSER', 'Fixed', 150.00, 300, 150, '2024-01-01', '2024-12-31', 2000, TRUE, '₹150 off for new users'),
('WEEKEND50', 'Fixed', 200.00, 500, 200, '2024-01-01', '2024-12-31', 1000, TRUE, '₹200 off on weekend bookings'),
('SUMMER25', 'Percentage', 25.00, 800, 2000, '2024-06-01', '2024-08-31', 500, TRUE, '25% off during summer season');

-- Insert Sample Bookings
-- Note: Using showtime_id from first showtime for movies, event_id for live events
INSERT INTO bookings (user_id, booking_type, movie_id, event_id, showtime_id, booking_status, total_tickets, subtotal, convenience_fees, discount_amount, coupon_id, total_amount, customer_name, customer_email, customer_phone) VALUES
(1, 'Movie', 1, NULL, 1, 'Confirmed', 2, 500.00, 90.00, 100.00, 1, 490.00, 'John Doe', 'john.doe@email.com', '9876543210'),
(2, 'Movie', 2, NULL, 12, 'Confirmed', 3, 960.00, 172.80, 0.00, NULL, 1132.80, 'Jane Smith', 'jane.smith@email.com', '9876543211'),
(3, 'Live Event', NULL, 3, NULL, 'Confirmed', 2, 4998.00, 899.64, 500.00, 2, 5397.64, 'Bob Wilson', 'bob.wilson@email.com', '9876543212'),
(4, 'Movie', 4, NULL, 28, 'Pending', 1, 350.00, 63.00, 150.00, 3, 263.00, 'Alice Brown', 'alice.brown@email.com', '9876543213'),
(5, 'Live Event', NULL, 9, NULL, 'Confirmed', 1, 1200.00, 216.00, 0.00, NULL, 1416.00, 'Charlie Davis', 'charlie.davis@email.com', '9876543214');

-- Insert Booking Seats (for movie bookings)
-- Booking 1: Deadpool & Wolverine at TVA Cinema (venue 1) - 2 seats in row A
INSERT INTO booking_seats (booking_id, seat_id, seat_price) VALUES
(1, 1, 250.00),  -- A1
(1, 2, 250.00);  -- A2

-- Booking 2: Venom at Cinema Hall (venue 2) - 3 seats in row A
INSERT INTO booking_seats (booking_id, seat_id, seat_price) VALUES
(2, 201, 320.00), -- A1 (venue 2 starts at seat_id 201)
(2, 202, 320.00), -- A2
(2, 203, 320.00); -- A3

-- Booking 4: Dune Part Two at Cinema Hall (venue 2) - 1 seat
INSERT INTO booking_seats (booking_id, seat_id, seat_price) VALUES
(4, 211, 350.00); -- B1

-- Insert Payments
INSERT INTO payments (booking_id, payment_method, payment_status, transaction_id, amount, payment_gateway) VALUES
(1, 'UPI', 'Success', 'TXN20241001001', 490.00, 'Razorpay'),
(2, 'Credit Card', 'Success', 'TXN20241001002', 1132.80, 'Stripe'),
(3, 'UPI', 'Success', 'TXN20241001003', 6577.64, 'Razorpay'),
(4, 'UPI', 'Pending', NULL, 263.00, 'Razorpay'),
(5, 'Debit Card', 'Success', 'TXN20241001005', 1416.00, 'Stripe');

-- Insert Reviews
INSERT INTO reviews (user_id, movie_id, event_id, rating, review_text, is_verified_purchase, is_approved) VALUES
(1, 1, NULL, 5, 'Amazing movie! Deadpool and Wolverine together was epic!', TRUE, TRUE),
(2, 2, NULL, 4, 'Good action sequences, Tom Hardy was great as always.', TRUE, TRUE),
(1, 4, NULL, 5, 'Dune Part Two exceeded all expectations. Masterpiece!', FALSE, TRUE),
(3, NULL, 9, 5, 'Coldplay concert was absolutely fantastic! Best night ever!', TRUE, TRUE),
(2, NULL, 1, 5, 'Comedy Non-Stop was hilarious! Anubhav Singh Bassi is amazing!', TRUE, TRUE),
(4, 5, NULL, 4, 'The Batman was dark and gritty, exactly what I expected.', TRUE, TRUE);

-- Insert Notifications
INSERT INTO notifications (user_id, notification_type, title, message, is_read) VALUES
(1, 'Booking Confirmation', 'Booking Confirmed', 'Your booking for Deadpool & Wolverine has been confirmed. Booking ID: 1', FALSE),
(2, 'Payment Success', 'Payment Successful', 'Your payment of ₹1132.80 has been processed successfully.', FALSE),
(3, 'Event Reminder', 'Event Reminder', 'Your Coldplay concert is tomorrow! Don\'t forget to bring your tickets.', FALSE),
(4, 'Booking Confirmation', 'Booking Pending', 'Your booking for Dune: Part Two is pending payment. Please complete payment to confirm.', FALSE);

-- Insert Admin Users
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@happenin.com', '$2b$10$admin_hash', 'System Administrator', 'Super Admin'),
('manager1', 'manager@happenin.com', '$2b$10$manager_hash', 'Event Manager', 'Manager'),
('support1', 'support@happenin.com', '$2b$10$support_hash', 'Support Staff', 'Support');

