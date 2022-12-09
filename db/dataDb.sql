CREATE DATABASE IF NOT EXISTS `test_db`;

USE test_db;

CREATE TABLE IF NOT EXISTS `companies`
(
    `CompanyId` INT(10) PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Sector` VARCHAR(255) NOT NULL,
    `City` VARCHAR(255) NOT NULL
);


INSERT INTO `companies` (`CompanyId`, `Name`, `Sector`, `City`) VALUES
(1, 'Huum Consulting', 'IT', 'San Francisco'),
(2, 'LaGrange', 'Food&Beverages', 'Denver'),
(3, 'SoundWort', 'Music Distribution', 'New York'),
(4, 'Macho Trucks', 'Transports', 'San Francisco')


