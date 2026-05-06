INSERT INTO event (id, title, club, date, venue, capacity, description)
VALUES
('EVT-101', 'AI Workshop', 'Computer Science Club', '2026-05-10', 'Room 101', 50, 'An introductory workshop about artificial intelligence.'),
('EVT-102', 'Cybersecurity Seminar', 'Cyber Club', '2026-05-15', 'Main Auditorium', 80, 'A seminar about cybersecurity awareness and safe online behavior.'),
('EVT-103', 'Robotics Demo', 'Engineering Club', '2026-05-20', 'Innovation Lab', 40, 'A live demonstration of robotics projects and student prototypes.');

INSERT INTO club (id, name, category, president, email, members_count)
VALUES
('CLB-101', 'IEEE Club', 'Technology', 'Ali Hassan', 'ieee@university.edu', 85),
('CLB-102', 'Debate Club', 'Academic', 'Sara Ahmed', 'debate@university.edu', 40),
('CLB-103', 'Art Club', 'Creative', 'Lina Omar', 'art@university.edu', 55);

INSERT INTO attendance_record (id, name, student_id, event, rsvp_status, attendance_status)
VALUES
('ATD-101', 'Ali Ahmed', '2023001', 'AI Workshop', 'Going', 'Present'),
('ATD-102', 'Sara Khalid', '2023002', 'Cybersecurity Seminar', 'Maybe', 'Absent'),
('ATD-103', 'Omar Saleh', '2023003', 'Robotics Demo', 'Going', 'Present');