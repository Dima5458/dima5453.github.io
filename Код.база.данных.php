в-- phpMyAdmin SQL Dump
-- version 5.1.0-dev
-- https://www.phpmyadmin.net/
--
-- Хост: 192.168.30.23
-- Время создания: Сен 12 2020 г., 22:36
-- Версия сервера: 8.0.18
-- Версия PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `TlapaleriaMalfoy`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Registro`
--

CREATE TABLE `Registro` (
  `Nombre` varchar(20) NOT NULL,
  `Direccion` varchar(25) NOT NULL,
  `Telefono` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Registro`
--

INSERT INTO `Registro` (`Nombre`, `Direccion`, `Telefono`) VALUES
('Isaac Ramos Lopez', 'Tepotzotlan', 5548590361),
('Isaac Ramos Lopez', 'Tepotzotlan', 5548590361);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
