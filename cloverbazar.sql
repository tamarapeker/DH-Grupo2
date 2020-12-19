-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2020 a las 13:53:38
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cloverbazar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `fecha_compra` date DEFAULT NULL,
  `fecha_creacion` date NOT NULL,
  `estado` int(10) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carritos`
--

INSERT INTO `carritos` (`id`, `usuario_id`, `fecha_compra`, `fecha_creacion`, `estado`) VALUES
(1, 5, NULL, '2020-11-19', 1),
(3, 6, NULL, '2020-11-20', 0),
(4, 7, NULL, '2020-11-20', 1),
(5, 6, NULL, '2020-11-28', 0),
(6, 6, NULL, '2020-11-28', 0),
(7, 6, '2020-11-28', '2020-11-28', 0),
(8, 6, NULL, '2020-11-28', 1),
(10, 8, NULL, '2020-12-11', 1),
(11, 9, '2020-12-11', '2020-12-11', 0),
(12, 9, '2020-12-11', '2020-12-11', 0),
(13, 9, '2020-12-11', '2020-12-11', 0),
(14, 9, '2020-12-11', '2020-12-11', 0),
(15, 9, '2020-12-11', '2020-12-11', 0),
(16, 9, '2020-12-11', '2020-12-11', 0),
(17, 9, '2020-12-11', '2020-12-11', 0),
(18, 9, '2020-12-11', '2020-12-11', 0),
(19, 9, '2020-12-11', '2020-12-11', 0),
(20, 9, '2020-12-11', '2020-12-11', 0),
(21, 9, '2020-12-11', '2020-12-11', 0),
(22, 9, '2020-12-11', '2020-12-11', 0),
(23, 14, NULL, '2020-12-11', 1),
(24, 12, NULL, '2020-12-12', 1),
(25, 9, '2020-12-14', '2020-12-13', 0),
(26, 9, '2020-12-14', '2020-12-14', 0),
(27, 9, '2020-12-14', '2020-12-14', 0),
(28, 9, '2020-12-15', '2020-12-14', 0),
(29, 9, '2020-12-16', '2020-12-16', 0),
(30, 9, '2020-12-18', '2020-12-16', 0),
(31, 3, NULL, '2020-12-16', 1),
(32, 9, '2020-12-18', '2020-12-18', 0),
(33, 9, NULL, '2020-12-18', 1),
(34, 16, '2020-12-19', '2020-12-19', 0),
(35, 16, NULL, '2020-12-19', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_producto`
--

CREATE TABLE `carrito_producto` (
  `id` int(10) UNSIGNED NOT NULL,
  `carrito_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `precio_congelado` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carrito_producto`
--

INSERT INTO `carrito_producto` (`id`, `carrito_id`, `producto_id`, `cantidad`, `precio_congelado`) VALUES
(23, 1, 5, 0, 0),
(37, 3, 2, 1, 0),
(38, 5, 3, 1, 0),
(39, 5, 16, 3, 0),
(40, 6, 10, 1, 0),
(41, 6, 19, 1, 0),
(42, 7, 3, 1, 221),
(43, 7, 2, 4, 220),
(44, 7, 7, 1, 485),
(68, 8, 11, 2, 0),
(69, 11, 11, 1, 600),
(70, 11, 6, 1, 180),
(71, 11, 3, 4, 221),
(72, 12, 11, 1, 600),
(73, 12, 12, 3, 270),
(74, 13, 2, 4, 220),
(75, 13, 11, 1, 600),
(76, 13, 12, 3, 270),
(77, 14, 11, 1, 600),
(78, 14, 12, 5, 270),
(79, 15, 11, 1, 600),
(80, 15, 12, 2, 270),
(81, 16, 1, 2, 220),
(82, 16, 2, 2, 220),
(83, 17, 1, 3, 220),
(84, 17, 2, 3, 220),
(85, 18, 11, 1, 600),
(86, 18, 12, 3, 270),
(87, 19, 1, 3, 220),
(88, 19, 2, 2, 220),
(89, 20, 1, 4, 220),
(90, 20, 2, 2, 220),
(91, 21, 1, 3, 220),
(92, 21, 2, 2, 220),
(93, 22, 11, 1, 600),
(94, 22, 12, 3, 270),
(97, 25, 6, 4, 0),
(128, 26, 5, 6, 180),
(129, 26, 11, 1, 600),
(130, 26, 6, 4, 180),
(131, 27, 10, 1, 600),
(132, 27, 9, 1, 204.25),
(137, 28, 7, 2, 485),
(138, 28, 8, 2, 620.5),
(142, 29, 2, 2, 220),
(143, 29, 4, 7, 221),
(147, 30, 2, 3, 0),
(148, 32, 6, 2, 180),
(154, 34, 1, 5, 220),
(155, 35, 30, 6, 0),
(156, 35, 2, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `imagen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `imagen`) VALUES
(1, 'Mates', 'rubro-mates.png'),
(2, 'Vasos', 'rubro-vasos.png'),
(3, 'Bowls', 'rubro-bowls.png'),
(4, 'Varios', 'rubro-varios.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(10) UNSIGNED NOT NULL,
  `ruta` varchar(50) NOT NULL,
  `producto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `ruta`, `producto_id`) VALUES
(1, 'vaso-starbucks-lila.png', 1),
(2, 'vaso-starbucks-verde.png', 2),
(3, 'vaso-liso-rosa.png', 3),
(4, 'vaso-liso-celeste.png', 4),
(5, 'mate-clasico-lila.png', 5),
(6, 'mate-clasico-rosa.png', 6),
(7, 'setmatero-clasico-celeste.png', 7),
(8, 'setmatero-frase-salmon.png', 8),
(9, 'bowlgrande-geom-verde.png', 9),
(10, 'combobowl-geom-celeste.png', 10),
(11, 'combobowl-geom-rosa.png', 11),
(12, 'botella-deportiva-negro.png', 12),
(13, 'botella-deportiva-verde.png', 13),
(14, 'secaplatos-pasto-verde.png', 14),
(15, 'vaso-acrilico-rojo.png', 15),
(16, 'vaso-acrilico-azul.png', 16),
(17, 'sethermeticos-acrilico-rosa.png', 17),
(18, 'mate-autocebante-rosa.png', 18),
(19, 'bowlchico-geom-lila.png', 19),
(20, 'setmatero-frase-amarillo.png', 20),
(21, 'imagen-1606505420946.jpg', 21),
(22, 'imagen-1606505700939.jpg', 22),
(23, 'imagen-1606592948549.jpg', 23),
(24, 'imagen-1606769310433.jpg', 25),
(25, 'imagen-1608234833446.png', 26),
(26, 'imagen-1608234873342.png', 27),
(27, 'imagen-1608234900074.png', 28),
(28, 'imagen-1608234964805.png', 29),
(29, 'imagen-1608234995196.png', 30),
(30, 'imagen-1608235135634.png', 31),
(31, 'imagen-1608235164835.png', 32),
(32, 'imagen-1608235187257.png', 33),
(33, 'imagen-1608235262254.png', 34),
(34, 'imagen-1608235288272.png', 35),
(35, 'imagen-1608235310463.png', 36),
(36, 'imagen-1608236420487.png', 37),
(37, 'imagen-1608236444155.png', 38),
(38, 'imagen-1608236467611.png', 39),
(39, 'imagen-1608236491395.png', 40),
(40, 'imagen-1608236521470.png', 41),
(41, 'imagen-1608236586551.png', 42),
(42, 'imagen-1608236607641.png', 43),
(43, 'imagen-1608236673910.png', 44),
(44, 'imagen-1608236702871.png', 45),
(45, 'imagen-1608236733807.png', 46),
(46, 'imagen-1608236801983.png', 47),
(47, 'imagen-1608236824651.png', 48),
(48, 'imagen-1608236844981.png', 49),
(49, 'imagen-1608236985499.png', 50),
(50, 'imagen-1608237006559.png', 51),
(51, 'imagen-1608237061493.png', 52),
(52, 'imagen-1608237095493.png', 53),
(53, 'imagen-1608237166494.png', 54),
(54, 'imagen-1608237191823.png', 55),
(55, 'imagen-1608237211963.png', 56),
(56, 'imagen-1608336623502.png', 63);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` float UNSIGNED NOT NULL,
  `descuento` float UNSIGNED NOT NULL,
  `stock` smallint(5) UNSIGNED NOT NULL,
  `color` varchar(30) NOT NULL,
  `medidas` varchar(30) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `categoria_id` int(10) NOT NULL,
  `estado` int(10) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `descuento`, `stock`, `color`, `medidas`, `descripcion`, `categoria_id`, `estado`) VALUES
(1, 'Vaso térmico tipo Starbucks', 220, 0, 10, 'Lila', '300ml', 'Vaso térmico plástico. Tapa y faja de silicona. Mantiene contenido caliente', 2, 1),
(2, 'Vaso térmico tipo Starbucks', 220, 0, 3, 'Verde agua', '300ml', 'Vaso térmico plástico. Tapa y faja de silicona. Mantiene contenido caliente', 2, 1),
(3, 'Vaso térmico liso', 260, 15, 12, 'Rosa', '350ml', 'Vaso térmico plástico. Cierre hermético con tapa a rosca. Doble vaso con cámara de aire que mantiene la temperatura del contenido caliente y frío', 2, 1),
(4, 'Vaso térmico liso', 260, 15, 8, 'Celeste', '350ml', 'Vaso térmico plástico. Cierre hermético con tapa a rosca. Doble vaso con cámara de aire que mantiene la temperatura del contenido caliente y frío', 2, 1),
(5, 'Mate clásico con bombilla', 180, 0, 5, 'Lila', 'Diámetro 6cm. Altura 8cm', 'Mate plástico. Bombilla metálica con disco para fácil limpieza. Puede variar el color de la bombilla.', 1, 1),
(6, 'Mate clásico con bombilla', 180, 0, 1, 'Rosa', 'Diámetro 6cm. Altura 8cm', 'Mate plástico. Bombilla metálica con disco para fácil limpieza. Puede variar el color de la bombilla.', 1, 1),
(7, 'Set matero clásico', 485, 0, 13, 'Celeste', 'Yerbera 600ml. Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarros con tapa flexible y flip-flap.', 1, 1),
(8, 'Set matero frase', 730, 15, 3, 'Salmon', 'Yerbera 1000ml Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarro con tapa con pico vertedor. Todo estampado con distintas frases.', 1, 1),
(9, 'Bowl geométrico grande', 215, 5, 5, 'Verde agua', 'Diámetro 19cm. Altura 11cm', 'Bowl ensaladera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(10, 'Combo bowls', 600, 0, 12, 'Celeste', 'Grande: 19cm. Chico: 12cm', '1 bowl grande + 4 bowls chicos. Diámetro grande: 19cm. Diámetro chico: 12cm. Plástico rígido de alta calidad.', 3, 1),
(11, 'Combo bowls', 600, 0, 2, 'Rosa', 'Grande: 19cm. Chico: 12cm', '1 bowl grande + 4 bowls chicos. Diámetro grande: 19cm. Diámetro chico: 12cm. Plástico rígido de alta calidad.', 3, 1),
(12, 'Botella deportiva', 300, 10, 5, 'Negro', '750ml', 'Botella plástica deportiva. Tapa con pico rebatible y manija para llevar o colgar.', 4, 1),
(13, 'Botella deportiva', 300, 10, 4, 'Verde', '750ml', 'Botella plástica deportiva. Tapa con pico rebatible y manija para llevar o colgar.', 4, 1),
(14, 'Secaplatos pasto', 750, 10, 5, 'Verde', '35cmX24cm', 'Secaplatos pasto con bandeja plástica escurridora.', 4, 1),
(15, 'Vaso acrílico', 160, 0, 8, 'Rojo', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(16, 'Vaso acrílico', 160, 0, 6, 'Azul', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(17, 'Set herméticos', 650, 10, 2, 'Rosa', 'Alto: 1200ml. Bajo: 400ml', 'Set de herméticos 1 alto + 1 bajo de acrílico con tapa con sello de silicona.', 4, 1),
(18, 'Mate autocebante', 430, 10, 4, 'Rosa', '350ml', 'Mate + bombilla metálica + termo todo en uno.', 1, 1),
(19, 'Bowl geométrico chico', 120, 0, 15, 'Lila', 'Diámetro 12cm. Altura: 5cm', 'Bowl compotera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(20, 'Set matero frase', 730, 10, 3, 'Amarillo', 'Yerbera 1000ml Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarro con tapa con pico vertedor. Todo estampado con distintas frases.', 1, 1),
(26, 'Vaso térmico tipo Starbucks', 220, 0, 8, 'Rosa', '300ml', 'Vaso térmico plástico. Tapa y faja de silicona. Mantiene contenido caliente.', 2, 1),
(27, 'Vaso térmico tipo Starbucks', 220, 0, 2, 'Celeste', '300ml', 'Vaso térmico plástico. Tapa y faja de silicona. Mantiene contenido caliente', 2, 1),
(28, 'Vaso térmico tipo Starbucks', 220, 0, 12, 'Amarillo', '300ml', 'Vaso térmico plástico. Tapa y faja de silicona. Mantiene contenido caliente', 2, 1),
(29, 'Vaso térmico liso', 260, 15, 20, 'Verde', '350ml', 'Vaso térmico plástico. Cierre hermético con tapa a rosca. Doble vaso con cámara de aire que mantiene la temperatura del contenido caliente y frío', 2, 1),
(30, 'Vaso térmico liso', 260, 15, 5, 'Lila', '350ml', 'Vaso térmico plástico. Cierre hermético con tapa a rosca. Doble vaso con cámara de aire que mantiene la temperatura del contenido caliente y frío', 2, 1),
(31, 'Mate clásico con bombilla', 180, 0, 4, 'Amarillo', 'Diámetro 6cm. Altura 8cm', 'Mate plástico. Bombilla metálica con disco para fácil limpieza. Puede variar el color de la bombilla.', 1, 1),
(32, 'Mate clásico con bombilla', 180, 0, 6, 'Verde', 'Diámetro 6cm. Altura 8cm', 'Mate plástico. Bombilla metálica con disco para fácil limpieza. Puede variar el color de la bombilla.', 1, 1),
(33, 'Mate clásico con bombilla', 180, 0, 4, 'Celeste', 'Diámetro 6cm. Altura 8cm', 'Mate plástico. Bombilla metálica con disco para fácil limpieza. Puede variar el color de la bombilla.', 1, 1),
(34, 'Set matero clásico', 485, 0, 5, 'Verde', 'Yerbera 600ml. Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarros con tapa flexible y flip-flap.', 1, 1),
(35, 'Set matero clásico', 485, 0, 8, 'Rosa', 'Yerbera 600ml. Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarros con tapa flexible y flip-flap.', 1, 1),
(36, 'Set matero clásico', 485, 0, 2, 'Lila', 'Yerbera 600ml. Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarros con tapa flexible y flip-flap.', 1, 1),
(37, 'Vaso acrílico', 160, 0, 4, 'Celeste', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(38, 'Vaso acrílico', 160, 0, 3, 'Verde', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(39, 'Vaso acrílico', 160, 0, 7, 'Naranja', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(40, 'Vaso acrílico', 160, 0, 0, 'Amarillo', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(41, 'Vaso acrílico', 160, 0, 2, 'Magenta', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(42, 'Botella deportiva', 300, 10, 2, 'Rosa', '750ml', 'Botella plástica deportiva. Tapa con pico rebatible y manija para llevar o colgar.', 4, 1),
(43, 'Botella deportiva', 300, 10, 3, 'Violeta', '750ml', 'Botella plástica deportiva. Tapa con pico rebatible y manija para llevar o colgar.', 4, 1),
(44, 'Bowl geométrico grande', 215, 5, 6, 'Celeste', 'Diámetro 19cm. Altura 11cm', 'Bowl ensaladera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(45, 'Bowl geométrico grande', 215, 5, 4, 'Rosa', 'Diámetro 19cm. Altura 11cm', 'Bowl ensaladera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(46, 'Bowl geométrico grande', 215, 5, 5, 'Lila', 'Diámetro 19cm. Altura 11cm', 'Bowl ensaladera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(47, 'Bowl geométrico chico', 120, 0, 3, 'Verde agua', 'Diámetro 12cm. Altura: 5cm', 'Bowl compotera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(48, 'Bowl geométrico chico', 120, 0, 3, 'Rosa', 'Diámetro 12cm. Altura: 5cm', 'Bowl compotera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(49, 'Bowl geométrico chico', 120, 0, 10, 'Celeste', 'Diámetro 12cm. Altura: 5cm', 'Bowl compotera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(50, 'Combo bowls', 600, 0, 0, 'Verde agua', 'Grande: 19cm. Chico: 12cm', '1 bowl grande + 4 bowls chicos. Diámetro grande: 19cm. Diámetro chico: 12cm. Plástico rígido de alta calidad.', 3, 1),
(51, 'Combo bowls', 600, 0, 2, 'Lila', 'Grande: 19cm. Chico: 12cm', '1 bowl grande + 4 bowls chicos. Diámetro grande: 19cm. Diámetro chico: 12cm. Plástico rígido de alta calidad.', 3, 1),
(52, 'Mate autocebante', 430, 10, 2, 'Celeste', '350ml', 'Mate + bombilla metálica + termo todo en uno.', 1, 1),
(53, 'Mate autocebante', 430, 10, 1, 'Lila', '350ml', 'Mate + bombilla metálica + termo todo en uno.', 1, 1),
(54, 'Set matero frase', 730, 10, 2, 'Rosa', 'Yerbera 1000ml Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarro con tapa con pico vertedor. Todo estampado con distintas frases.', 1, 1),
(55, 'Set matero frase', 730, 10, 4, 'Verde', 'Yerbera 1000ml Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarro con tapa con pico vertedor. Todo estampado con distintas frases.', 1, 1),
(56, 'Set matero frase', 730, 10, 2, 'Lila', 'Yerbera 1000ml Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarro con tapa con pico vertedor. Todo estampado con distintas frases.', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellido` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `provincia` varchar(20) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `rol` varchar(15) NOT NULL DEFAULT 'usuario',
  `estado` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `contrasena`, `direccion`, `provincia`, `telefono`, `rol`, `estado`) VALUES
(1, 'Pipo', 'Pipo', 'pipo@pipo.com', '$2a$10$3nppumMtUGQGygzMu5nt6e8', 'Pipo', NULL, 'Pipo', 'usuario', 1),
(2, 'Pipo', 'Pipo', 'pipo@dh.com', '$2a$10$w6/eUFS.I6WveZMp0.zCn.lTpAG40cqPLOsLBdxW92Q2/Zsq76sjK', 'Pipo', NULL, 'Pipo', 'usuario', 1),
(3, 'Ventas', 'Clover Bazar', 'ventascloverbazar@gmail.com', '$2a$10$c5OemlIcQKNIPwGG.JbBbe1THVrgv3T/0oJTp9OFNVUFb1zb0U/02', '', NULL, '', 'admin', 1),
(4, 'Pipo1', 'Pipo1', '', '$2a$10$OC2CRzCMNIrVCbcYFMlZw.pfPwnVO3ZndRzJ9k0MykiQJyzHtBiU.', '', NULL, '', 'usuario', 1),
(5, 'Pipo1', 'Pipo1', 'pipo1@pipo.com', '$2a$10$4l5d7IUWQ7GhNnsd6GB5V.i74jyl8jXVUWfmfz4XG6DmiVHdKZT6e', 'sss', NULL, 'aaa', 'usuario', 1),
(6, 'pipo2', 'pipo2', 'pipo2@pipo.com', '$2a$10$WrtMtH70koezEeex7Lvda.gy96GbnNGYpSFAQx9iOteXzFVmDOAO.', 'Calle', NULL, '123', 'usuario', 1),
(7, 'pipo3', 'pipo3', 'pipo3@pipo.com', '$2a$10$WyFvk53ogZaORafPlLnBEu2U9.IUoGuKQTX8dl4AHNrFxaz9RukMu', 'pp', NULL, 'pp', 'usuario', 1),
(8, 'Pipo4', 'Pipo4', 'pipo4@pipo.com', '$2a$10$p7J5Rjr3k.fokeSE7Rp3yuG1OfU7jzwjL9RzdWsrB8UvdD.MsJfJW', '', NULL, '', 'usuario', 1),
(9, 'Prueba1', 'Prueba1', 'prueba1@prueba.com', '$2a$10$JOzpBMOuu7d9og/J6bWOrO343Km.0o.sZ2d6ZhjmcEJzqi3tTJs2u', '', NULL, '', 'usuario', 1),
(12, 'prueba3', 'prueba3', 'prueba3@prueba.com', '$2a$10$r.ax5HeBeZEYHWf8CaEbWuDz8WK90lkvxrW0x341VDyh39l2DICAy', '', NULL, '', 'usuario', 1),
(13, 'prueba4', 'prueba4', 'prueba4@prueba.com', '$2a$10$jYXiMeC2aZ9TBlZmtQ22qepxcOk8XNP4usCCqm7Lo/nH9mgivbl4C', '', NULL, '', 'usuario', 1),
(14, 'prueba5', 'prueba5', 'prueba5@prueba.com', '$2a$10$6ge00DYSCkBDIMPIfNFpFuvyohibTuBH.q9WkDZgVsW2H50emyjHC', '', NULL, '', 'usuario', 1),
(15, 'prueba6', 'prueba6', 'prueba6@prueba.com', '$2a$10$7LgpipZq4fWp7MU9bDiLYedXGt6ipNtKbcPgSwUlicE7eX81D0wsa', '', NULL, '', 'usuario', 1),
(16, 'prueba2', 'prueba2', 'prueba2@prueba.com', '$2a$10$UA8KbJH0VuSmlsnXfi1gfu/JFU/88sNnjJzYR9tZWXO6r81oIIjFC', '123456', 'Ciudad Autónoma de B', '987654', 'usuario', 1),
(28, 'admin2', 'admin2', 'admin2@gmail.com', '$2a$10$NBem6tZeVMCM20mW3AITgeCtAlkWBp9WF1seV8SiBhUTyEnXyRZku', 'hjkkjh', 'Buenos Aires', '456987', 'admin', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carrito_producto`
--
ALTER TABLE `carrito_producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `carrito_producto`
--
ALTER TABLE `carrito_producto`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
