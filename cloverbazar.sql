-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2020 a las 23:14:31
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
(28, 9, NULL, '2020-12-14', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_producto`
--

CREATE TABLE `carrito_producto` (
  `id` int(10) UNSIGNED NOT NULL,
  `carrito_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `precio_congelado` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carrito_producto`
--

INSERT INTO `carrito_producto` (`id`, `carrito_id`, `producto_id`, `cantidad`, `precio_congelado`) VALUES
(23, 1, 5, 0, 0),
(24, 1, 18, 0, 0),
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
(133, 28, 3, 1, 0),
(134, 28, 4, 1, 0);

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
(24, 'imagen-1606769310433.jpg', 25);

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
(1, 'Vaso térmico tipo Starbucks', 220, 0, 0, 'Lila', '300ml', 'Vaso térmico plástico. Tapa y faja de silicona. Mantiene contenido caliente', 2, 1),
(2, 'Vaso térmico tipo Starbucks', 220, 0, 0, 'Verde agua', '300ml', 'Vaso térmico plástico. Tapa y faja de silicona. Mantiene contenido caliente', 2, 1),
(3, 'Vaso térmico liso', 260, 15, 12, 'Rosa', '350ml', 'Vaso térmico plástico. Cierre hermético con tapa a rosca. Doble vaso con cámara de aire que mantiene la temperatura del contenido caliente y frío', 2, 1),
(4, 'Vaso térmico liso', 260, 15, 15, 'Celeste', '350ml', 'Vaso térmico plástico. Cierre hermético con tapa a rosca. Doble vaso con cámara de aire que mantiene la temperatura del contenido caliente y frío', 2, 1),
(5, 'Mate clásico con bombilla', 180, 0, 0, 'Lila', 'Diámetro 6cm. Altura 8cm', 'Mate plástico. Bombilla metálica con disco para fácil limpieza. Puede variar el color de la bombilla.', 1, 1),
(6, 'Mate clásico con bombilla', 180, 0, 0, 'Rosa', 'Diámetro 6cm. Altura 8cm', 'Mate plástico. Bombilla metálica con disco para fácil limpieza. Puede variar el color de la bombilla.', 1, 1),
(7, 'Set matero clásico', 485, 0, 15, 'Celeste', 'Yerbera 600ml. Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarros con tapa flexible y flip-flap.', 1, 1),
(8, 'Set matero frase', 730, 15, 5, 'Salmon', 'Yerbera 1000ml Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarro con tapa con pico vertedor. Todo estampado con distintas frases.', 1, 1),
(9, 'Bowl geométrico grande', 215, 5, 0, 'Verde agua', 'Diámetro 19cm. Altura 11cm', 'Bowl ensaladera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(10, 'Combo bowls', 600, 0, 0, 'Celeste', 'Grande: 19cm. Chico: 12cm', '1 bowl grande + 4 bowls chicos. Diámetro grande: 19cm. Diámetro chico: 12cm. Plástico rígido de alta calidad.', 3, 1),
(11, 'Combo bowls', 600, 0, 0, 'Rosa', 'Grande: 19cm. Chico: 12cm', '1 bowl grande + 4 bowls chicos. Diámetro grande: 19cm. Diámetro chico: 12cm. Plástico rígido de alta calidad.', 3, 1),
(12, 'Botella deportiva', 300, 10, 5, 'Negro', '750ml', 'Botella plástica deportiva. Tapa con pico rebatible y manija para llevar o colgar.', 4, 1),
(13, 'Botella deportiva', 300, 10, 4, 'Verde', '750ml', 'Botella plástica deportiva. Tapa con pico rebatible y manija para llevar o colgar.', 4, 1),
(14, 'Secaplatos pasto', 750, 10, 5, 'Verde', '35cmX24cm', 'Secaplatos pasto con bandeja plástica escurridora.', 4, 1),
(15, 'Vaso acrílico', 160, 0, 8, 'Rojo', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(16, 'Vaso acrílico', 160, 0, 6, 'Azul', '400ml', 'Vasos de acrílico. Translúcidos de colores.', 2, 1),
(17, 'Set herméticos', 650, 10, 2, 'Rosa', 'Alto: 1200ml. Bajo: 400ml', 'Set de herméticos 1 alto + 1 bajo de acrílico con tapa con sello de silicona.', 4, 1),
(18, 'Mate autocebante', 430, 10, 4, 'Rosa', '350ml', 'Mate + bombilla metálica + termo todo en uno.', 1, 1),
(19, 'Bowl geométrico chico', 120, 0, 15, 'Lila', 'Diámetro 12cm. Altura: 5cm', 'Bowl compotera. Plástico rígido de alta calidad. Apto para calentar en microondas (no para cocinar)', 3, 1),
(20, 'Set matero frase', 730, 10, 3, 'Amarillo', 'Yerbera 1000ml Azucarera 400ml', 'Mate con bombilla metálica + Tarro yerbera + Tarro azucarera. Tarro con tapa con pico vertedor. Todo estampado con distintas frases.', 1, 1),
(21, 'Vaso Prueba', 100, 1, 8, 'Rosa', '120', 'aaaaaa', 1, 0),
(22, 'hola', 148, 8, 12, 'AAA', '152', '256565sadasffx', 1, 0),
(23, 'aguan', 95, 5, 10, 'Verde', '20', 'xFksfhdjfndsjljksfjdsklfjdkslfjsk', 2, 0),
(24, 'prueba1', 123, 5, 0, 'verde', '1235', 'dsdsdsjdnzsjcbszkj', 1, 0),
(25, 'prueba2', 123, 26, 5, 'verdd', '1568', 'sasasasasaS', 1, 0);

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
  `telefono` varchar(30) DEFAULT NULL,
  `estado` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `contrasena`, `direccion`, `telefono`, `estado`) VALUES
(1, 'Pipo', 'Pipo', 'pipo@pipo.com', '$2a$10$3nppumMtUGQGygzMu5nt6e8', 'Pipo', 'Pipo', 1),
(2, 'Pipo', 'Pipo', 'pipo@dh.com', '$2a$10$w6/eUFS.I6WveZMp0.zCn.lTpAG40cqPLOsLBdxW92Q2/Zsq76sjK', 'Pipo', 'Pipo', 1),
(3, 'Ventas', 'Clover Bazar', 'ventascloverbazar@gmail.com', '$2a$10$c5OemlIcQKNIPwGG.JbBbe1THVrgv3T/0oJTp9OFNVUFb1zb0U/02', '', '', 1),
(4, 'Pipo1', 'Pipo1', '', '$2a$10$OC2CRzCMNIrVCbcYFMlZw.pfPwnVO3ZndRzJ9k0MykiQJyzHtBiU.', '', '', 1),
(5, 'Pipo1', 'Pipo1', 'pipo1@pipo.com', '$2a$10$4l5d7IUWQ7GhNnsd6GB5V.i74jyl8jXVUWfmfz4XG6DmiVHdKZT6e', 'sss', 'aaa', 1),
(6, 'pipo2', 'pipo2', 'pipo2@pipo.com', '$2a$10$WrtMtH70koezEeex7Lvda.gy96GbnNGYpSFAQx9iOteXzFVmDOAO.', 'Calle', '123', 1),
(7, 'pipo3', 'pipo3', 'pipo3@pipo.com', '$2a$10$WyFvk53ogZaORafPlLnBEu2U9.IUoGuKQTX8dl4AHNrFxaz9RukMu', 'pp', 'pp', 1),
(8, 'Pipo4', 'Pipo4', 'pipo4@pipo.com', '$2a$10$p7J5Rjr3k.fokeSE7Rp3yuG1OfU7jzwjL9RzdWsrB8UvdD.MsJfJW', '', '', 1),
(9, 'Prueba1', 'Prueba1', 'prueba1@prueba.com', '$2a$10$JOzpBMOuu7d9og/J6bWOrO343Km.0o.sZ2d6ZhjmcEJzqi3tTJs2u', '', '', 1),
(12, 'prueba3', 'prueba3', 'prueba3@prueba.com', '$2a$10$r.ax5HeBeZEYHWf8CaEbWuDz8WK90lkvxrW0x341VDyh39l2DICAy', '', '', 1),
(13, 'prueba4', 'prueba4', 'prueba4@prueba.com', '$2a$10$jYXiMeC2aZ9TBlZmtQ22qepxcOk8XNP4usCCqm7Lo/nH9mgivbl4C', '', '', 1),
(14, 'prueba5', 'prueba5', 'prueba5@prueba.com', '$2a$10$6ge00DYSCkBDIMPIfNFpFuvyohibTuBH.q9WkDZgVsW2H50emyjHC', '', '', 1),
(15, 'prueba6', 'prueba6', 'prueba6@prueba.com', '$2a$10$7LgpipZq4fWp7MU9bDiLYedXGt6ipNtKbcPgSwUlicE7eX81D0wsa', '', '', 1);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `carrito_producto`
--
ALTER TABLE `carrito_producto`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
