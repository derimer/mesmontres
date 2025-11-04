-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: mesmontres
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('nouveau','lu','répondu','fermé') NOT NULL DEFAULT 'nouveau',
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `montre_id` int unsigned NOT NULL,
  `filename` varchar(255) NOT NULL,
  `position` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `montre_id` (`montre_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`montre_id`) REFERENCES `montres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=283 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (40,8,'1761845111134-278805756-1.jpg',0,'2025-10-30 17:25:11'),(41,8,'1761845111136-71701433-2.jpg',0,'2025-10-30 17:25:11'),(42,8,'1761845111136-786708189-3.jpg',0,'2025-10-30 17:25:11'),(43,8,'1761845111139-762810122-4.jpg',0,'2025-10-30 17:25:11'),(44,8,'1761845111140-989995833-5.jpg',0,'2025-10-30 17:25:11'),(45,8,'1761845111142-278385338-6.jpg',0,'2025-10-30 17:25:11'),(46,8,'1761845111147-558889533-7.jpg',0,'2025-10-30 17:25:11'),(47,8,'1761845111148-521830237-8.jpg',0,'2025-10-30 17:25:11'),(48,8,'1761845111154-441190003-12.jpg',0,'2025-10-30 17:25:11'),(49,8,'1761845111155-575829453-14.jpg',0,'2025-10-30 17:25:11'),(50,8,'1761845111155-428686667-13.jpg',0,'2025-10-30 17:25:11'),(51,8,'1761845111152-458821724-11.jpg',0,'2025-10-30 17:25:11'),(52,8,'1761845111151-969314503-10.jpg',0,'2025-10-30 17:25:11'),(53,8,'1761845111149-96156248-9.jpg',0,'2025-10-30 17:25:11'),(54,9,'1761935235074-823624884-01.jpg',0,'2025-10-31 18:27:15'),(55,9,'1761935235074-331890926-02.jpg',0,'2025-10-31 18:27:15'),(56,9,'1761935235077-503345970-03.jpg',0,'2025-10-31 18:27:15'),(57,9,'1761935235077-549971026-04.jpg',0,'2025-10-31 18:27:15'),(58,9,'1761935235081-364201226-05.jpg',0,'2025-10-31 18:27:15'),(59,9,'1761935235084-298173501-06.jpg',0,'2025-10-31 18:27:15'),(60,9,'1761935235085-193989292-07.jpg',0,'2025-10-31 18:27:15'),(61,10,'1761980736350-981272119-01.jpg',0,'2025-11-01 07:05:36'),(62,10,'1761980736351-830304306-02.jpg',0,'2025-11-01 07:05:36'),(63,10,'1761980736354-722730826-03.jpg',0,'2025-11-01 07:05:36'),(64,10,'1761980736358-353774931-04.jpg',0,'2025-11-01 07:05:36'),(65,10,'1761980736362-132300229-05.jpg',0,'2025-11-01 07:05:36'),(66,10,'1761980736364-188492452-06.jpg',0,'2025-11-01 07:05:36'),(67,10,'1761980736365-568796098-07.jpg',0,'2025-11-01 07:05:36'),(68,10,'1761980736367-427453375-08.jpg',0,'2025-11-01 07:05:36'),(102,15,'1762090399043-683398174-01.jpg',0,'2025-11-02 13:33:19'),(103,15,'1762090399045-517641952-02.jpg',0,'2025-11-02 13:33:19'),(104,15,'1762090399046-232721933-03.jpg',0,'2025-11-02 13:33:19'),(105,15,'1762090399052-577068946-04.jpg',0,'2025-11-02 13:33:19'),(106,15,'1762090399055-453663928-05.jpg',0,'2025-11-02 13:33:19'),(107,15,'1762090399061-596423804-06.jpg',0,'2025-11-02 13:33:19'),(108,15,'1762090399064-622292460-08.jpg',0,'2025-11-02 13:33:19'),(109,15,'1762090399063-522777845-07.jpg',0,'2025-11-02 13:33:19'),(110,16,'1762092776050-69642907-01.jpg',0,'2025-11-02 14:12:56'),(111,16,'1762092776052-688688546-02.jpg',0,'2025-11-02 14:12:56'),(112,16,'1762092776055-606882003-03.jpg',0,'2025-11-02 14:12:56'),(113,16,'1762092776057-734021374-04.jpg',0,'2025-11-02 14:12:56'),(114,16,'1762092776058-670647090-05.jpg',0,'2025-11-02 14:12:56'),(115,16,'1762092776058-964172709-06.jpg',0,'2025-11-02 14:12:56'),(116,16,'1762092776059-628104805-07.jpg',0,'2025-11-02 14:12:56'),(117,16,'1762092776059-325526240-08.jpg',0,'2025-11-02 14:12:56'),(118,17,'1762096875593-955154303-01.jpg',0,'2025-11-02 15:21:15'),(119,17,'1762096875596-69925274-02.jpg',0,'2025-11-02 15:21:15'),(120,17,'1762096875602-319789494-03.jpg',0,'2025-11-02 15:21:15'),(121,17,'1762096875611-303762085-04.jpg',0,'2025-11-02 15:21:15'),(122,17,'1762096875613-560373971-05.jpg',0,'2025-11-02 15:21:15'),(123,17,'1762096875613-858414543-06.jpg',0,'2025-11-02 15:21:15'),(124,17,'1762096875615-84307224-07.jpg',0,'2025-11-02 15:21:15'),(125,18,'1762097101130-697082220-01.jpg',0,'2025-11-02 15:25:01'),(126,18,'1762097101131-180618946-02.jpg',0,'2025-11-02 15:25:01'),(127,18,'1762097101133-762086793-03.jpg',0,'2025-11-02 15:25:01'),(128,18,'1762097101136-543758917-04.jpg',0,'2025-11-02 15:25:01'),(129,18,'1762097101137-54348978-05.jpg',0,'2025-11-02 15:25:01'),(130,18,'1762097101138-640558379-06.jpg',0,'2025-11-02 15:25:01'),(131,18,'1762097101138-660407189-07.jpg',0,'2025-11-02 15:25:01'),(132,18,'1762097101142-609618376-08.jpg',0,'2025-11-02 15:25:01'),(133,19,'1762097519555-305152354-01.jpg',0,'2025-11-02 15:31:59'),(134,19,'1762097519556-437284081-02.jpg',0,'2025-11-02 15:31:59'),(135,19,'1762097519560-349865254-03.jpg',0,'2025-11-02 15:31:59'),(136,19,'1762097519560-506091800-04.jpg',0,'2025-11-02 15:31:59'),(137,19,'1762097519563-555555265-05.jpg',0,'2025-11-02 15:31:59'),(138,19,'1762097519563-915485847-06.jpg',0,'2025-11-02 15:31:59'),(139,19,'1762097519572-134490046-07.jpg',0,'2025-11-02 15:31:59'),(140,20,'1762097866899-517448818-01.jpg',0,'2025-11-02 15:37:46'),(141,20,'1762097866900-342992180-02.jpg',0,'2025-11-02 15:37:47'),(142,20,'1762097866902-124385452-03.jpg',0,'2025-11-02 15:37:47'),(143,20,'1762097866903-117035906-04.jpg',0,'2025-11-02 15:37:47'),(144,20,'1762097866905-465735967-05.jpg',0,'2025-11-02 15:37:47'),(145,20,'1762097866907-199139875-06.jpg',0,'2025-11-02 15:37:47'),(146,20,'1762097866910-138673830-07.jpg',0,'2025-11-02 15:37:47'),(147,20,'1762097866911-685244410-08.jpg',0,'2025-11-02 15:37:47'),(148,21,'1762102314522-876846960-01.jpg',0,'2025-11-02 16:51:54'),(149,21,'1762102314523-355311642-02.jpg',0,'2025-11-02 16:51:54'),(150,21,'1762102314526-913479367-03.jpg',0,'2025-11-02 16:51:54'),(151,21,'1762102314528-79350192-04.jpg',0,'2025-11-02 16:51:54'),(152,21,'1762102314530-371200280-05.jpg',0,'2025-11-02 16:51:54'),(153,21,'1762102314532-783928813-06.jpg',0,'2025-11-02 16:51:54'),(154,21,'1762102314533-316039774-07.jpg',0,'2025-11-02 16:51:54'),(155,21,'1762102314535-95370710-08.jpg',0,'2025-11-02 16:51:54'),(163,23,'1762102760637-960067332-01.jpg',0,'2025-11-02 16:59:20'),(164,23,'1762102760638-55586607-02.jpg',0,'2025-11-02 16:59:20'),(165,23,'1762102760640-533466274-03.jpg',0,'2025-11-02 16:59:20'),(166,23,'1762102760645-177634774-04.jpg',0,'2025-11-02 16:59:20'),(167,23,'1762102760653-77186009-06.jpg',0,'2025-11-02 16:59:20'),(168,23,'1762102760654-166673800-07.jpg',0,'2025-11-02 16:59:20'),(169,23,'1762102760655-532738053-08.jpg',0,'2025-11-02 16:59:20'),(170,23,'1762102760651-84084297-05.jpg',0,'2025-11-02 16:59:20'),(171,23,'1762102760656-92827762-09.jpg',0,'2025-11-02 16:59:20'),(172,24,'1762103008064-11925032-02.jpg',0,'2025-11-02 17:03:28'),(173,24,'1762103008065-972955408-03.jpg',0,'2025-11-02 17:03:28'),(174,24,'1762103008066-666766443-04.jpg',0,'2025-11-02 17:03:28'),(175,24,'1762103008070-63287698-06.jpg',0,'2025-11-02 17:03:28'),(176,24,'1762103008070-116071942-07.jpg',0,'2025-11-02 17:03:28'),(177,24,'1762103008071-86864842-08.jpg',0,'2025-11-02 17:03:28'),(178,24,'1762103008069-46756070-05.jpg',0,'2025-11-02 17:03:28'),(179,24,'1762103008063-499106869-01.jpg',0,'2025-11-02 17:03:28'),(188,27,'1762103982059-477575658-01.jpg',0,'2025-11-02 17:19:42'),(189,27,'1762103982060-508980632-02.jpg',0,'2025-11-02 17:19:42'),(190,27,'1762103982061-325721940-03.jpg',0,'2025-11-02 17:19:42'),(191,27,'1762103982062-670707044-04.jpg',0,'2025-11-02 17:19:42'),(192,27,'1762103982063-664880314-05.jpg',0,'2025-11-02 17:19:42'),(193,27,'1762103982064-771350118-06.jpg',0,'2025-11-02 17:19:42'),(194,27,'1762103982065-705888374-07.jpg',0,'2025-11-02 17:19:42'),(195,27,'1762103982065-793565241-08.jpg',0,'2025-11-02 17:19:42'),(204,29,'1762104889000-441271333-01.jpg',0,'2025-11-02 17:34:49'),(205,29,'1762104889001-507676657-02.jpg',1,'2025-11-02 17:34:49'),(206,29,'1762104889006-220081495-05.jpg',2,'2025-11-02 17:34:49'),(207,29,'1762104889007-76891150-06.jpg',3,'2025-11-02 17:34:49'),(208,29,'1762104889007-294183061-07.jpg',4,'2025-11-02 17:34:49'),(209,29,'1762104889007-163618617-08.jpg',5,'2025-11-02 17:34:49'),(210,29,'1762104889005-577520472-04.jpg',6,'2025-11-02 17:34:49'),(211,29,'1762104889003-784298685-03.jpg',7,'2025-11-02 17:34:49'),(248,15,'1762196135689-272698258-09.jpg',8,'2025-11-03 18:55:35'),(279,29,'1762234816147-243234474-chronographe2.jpg',8,'2025-11-04 05:40:16'),(280,29,'1762234816151-168908965-luxe.webp',9,'2025-11-04 05:40:16'),(281,29,'test-trigger-1.jpg',10,'2025-11-04 07:05:34'),(282,29,'test-trigger-2.jpg',11,'2025-11-04 07:05:34');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `safe_image_position` BEFORE INSERT ON `images` FOR EACH ROW BEGIN
  
  IF NEW.position IS NULL OR NEW.position = 0 THEN
    SELECT COALESCE(MAX(position), -1) + 1 INTO @next_pos 
    FROM images WHERE montre_id = NEW.montre_id;
    SET NEW.position = @next_pos;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `montres`
--

DROP TABLE IF EXISTS `montres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `montres` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `brand` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `mouvement` varchar(100) DEFAULT 'Automatique',
  `materiau_boitier` varchar(100) DEFAULT 'Acier inoxydable',
  `couleur_cadran` varchar(50) DEFAULT 'Noir',
  `bracelet` varchar(100) DEFAULT 'Bracelet acier',
  `resistance_eau` varchar(50) DEFAULT '3 ATM',
  `description` text,
  `referenceURL` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(100) DEFAULT 'Quartz',
  `type_de_mouvement` varchar(100) DEFAULT 'Automatique',
  `origine_mouvement` varchar(100) DEFAULT 'Suisse',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `montres`
--

LOCK TABLES `montres` WRITE;
/*!40000 ALTER TABLE `montres` DISABLE KEYS */;
INSERT INTO `montres` VALUES (8,'206062981','Maserati',159,'Automatique','Acier inoxydable','Noir','Acier','10 ATM','Ref : 206062981\r\nMagnifique montre Maserati Potenza état neuf \r\nVendue car poignet trop petit pour ce type de boîtier \r\nBoîtier en acier inoxydable teinte or rose avec gravure orné d’un contour de cadran noir\r\nSuperbe cadran noir guilloché avec logo \r\nAiguilles or rose, trotteuse avec le trident \r\nMagnifique bracelet en maille milanaise noir\r\nDateur rapide a 6 heures\r\nMouvement Japonais VJ42B\r\nRésistance à l’eau : 10 ATM\r\nDimensions : \r\nVerre : 32 mm\r\nBoîtier hors couronne : 52*42 mm\r\nTotal avec couronne : 52*45 mm\r\nÉpaisseur du cadran : 11 mm\r\nLivrée dans son coffret d’origine avec ses protections \r\nPas de facture disponible \r\nEnvoi soigné','https://www.leboncoin.fr/ad/montres_bijoux/3057365561','2025-10-30 17:25:11','Analogique','Quartz','Japon'),(9,'206063002','Citizen',59,'Automatique','Acier inoxydable','Noir','Cuir','3 ATM','Ref : 206063002\r\nSuperbe montre à quartz Citizen Crystron, en excellent état \r\nEntretien et vérifications effectués sur cette montre : \r\n- Démontage complet et nettoyage du boîtier aux ultrasons \r\n- Remplacement du verre\r\n- Remplacement de la pile \r\n- Remplacement du bracelet\r\n-Graissage du joint de boîtier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral neuf collé sans défaut \r\nCadran bleu nuit\r\nDateur rapide à 3 heures jour et date\r\nMouvement japonais Citizen 8551A\r\nRésistance à l’eau 3 ATM - non étanche \r\nBracelet en cuir neuf \r\nDimensions :\r\nVerre : 30 mm\r\nBoîtier hors couronne : 35 mm\r\nTotal avec couronne : 36 mm\r\nÉpaisseur du cadran : 9 mm\r\nEnvoi soigné dans une boîte de présentation neutre','https://www.leboncoin.fr/ad/montres_bijoux/3084624679','2025-10-31 18:27:15','Analogique','Quartz','Japon'),(10,'206063031','Hugo Boss',59,'Automatique','Acier inoxydable','Noir','Acier','5 ATM','Ref : 206063031\r\nSuperbe montre chronographe Boss en très bon état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement du verre\r\n- Remplacement de la pile\r\n- Réglage de l’alignement des aiguilles du chrono\r\n- Graissage du joint de boîtier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral bombé neuf sans défaut \r\nCadran noir avec gros chiffres\r\nSous cadrans minutes, secondes et dixièmes de secondes\r\nAiguilles phosphorescentes \r\nDateur rapide entre 4 et 5 heures\r\nMouvement japonais VD57B\r\nRésistance à l’eau 5 ATM\r\nBracelet original en acier inoxydable \r\nDimensions :\r\nVerre : 39 mm\r\nBoîtier hors couronne : 44 mm\r\nTotal avec couronne : 47 mm\r\nÉpaisseur du cadran au centre du verre : 13 mm\r\nBracelet: tour de poignet 19 cm - pas de maillons supplémentaires \r\nEnvoi soigné dans une boîte de présentation neutre','https://www.leboncoin.fr/ad/montres_bijoux/3084034001','2025-11-01 07:05:36','Quartz','Automatique','Suisse'),(15,'206063020','Fossil',59,'Automatique','Acier inoxydable','Noir','Acier','3 ATM','Ref : 206063020\r\nSuperbe montre Fossil calendrier perpétuel grand cadran en parfait état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement du mouvement à l’identique \r\n- Remplacement du verre\r\n- Remplacement de la pile (sera fait je jour de la vente)\r\n- Remplacement du bracelet \r\n- Graissage du joint de boîtier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral neuf bombé sans défaut \r\nCadran noir avec gros chiffres\r\nSous cadrans jour, date et heures sur 24 heures\r\nAiguilles et indexes chromés \r\nMouvement japonais Epson VX7JE neuf\r\nRésistance à l’eau 5 ATM\r\nBracelet neuf maille milanaise \r\nDimensions :\r\nVerre : 38 mm\r\nBoîtier hors couronne : 34 mm\r\nTotal avec couronne : 38 mm\r\nÉpaisseur du cadran au centre du verre : 12 mm\r\nEnvoi soigné dans sa boîte de présentation','https://www.leboncoin.fr/ad/montres_bijoux/3085501091','2025-11-02 13:33:19','Calendrier perpétuel','Quartz','Japon'),(16,'206063016','Festina',59,'Automatique','Acier inoxydable','Noir','Acier','10 ATM','Ref : 206063016\r\nSuperbe montre chronographe Festina en excellent état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier aux ultrasons \r\n- Remplacement du verre\r\n- Remplacement de la pile (sera fait le jour de la vente)\r\n- Remplacement du bracelet \r\n- Réglage de l’alignement des aiguilles du chrono \r\n- Graissage du joint de boîtier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral neuf\r\nCadran gris acier\r\nDateur rapide à 3 heures\r\nMouvement japonais Miyota OS60\r\nRésistance à l’eau 10 ATM\r\nBracelet neuf en acier inoxydable avec boucle déployante \r\nDimensions :\r\nVerre : 29 mm\r\nBoîtier hors couronne : 40 mm\r\nTotal avec couronne : 43 mm\r\nÉpaisseur du cadran : 12 mm\r\nEnvoi soigné dans son coffret, avec outil de retrait de maillons','https://www.leboncoin.fr/ad/montres_bijoux/3083521580','2025-11-02 14:12:56','Chronographe','Quartz','Japon'),(17,'206063022','Casio Edifice',59,'Automatique','Acier inoxydable','Noir','Acier','10 ATM','Ref : 206063022\r\nSuperbe montre chronographe Casio Édifice, excellent état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement de la pile (sera fait au moment de la vente)\r\n- Remplacement du verre\r\n- Réglage de l’alignement des aiguilles du chrono\r\n- Graissage du joint de boîtier \r\n- Tests \r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral bombé neuf sans défaut\r\nCadran noir\r\nAiguilles phosphorescentes \r\nSous cadrans minutes, secondes et heures sur 24 heures\r\nTrotteuse permanente à 6 heures\r\nLa grande trotteuse fonctionne avec le chrono\r\nDateur rapide entre 4 et 5 heures \r\nMouvement japonais Miyota OS20\r\nRésistance à l\'eau 10ATM\r\nBracelet en acier inoxydable \r\nDimensions :\r\nVerre : 35 mm\r\nBoîtier hors couronne : 39 mm\r\nTotal avec couronne : 42 mm\r\nÉpaisseur du cadran au centre du verre : 13 mm\r\nBracelet : tour de poignet 19 cm - pas de maillon supplémentaire \r\nEnvoi soigné dans une boîte de présentation neutre','https://www.leboncoin.fr/ad/montres_bijoux/3073064438','2025-11-02 15:21:15','Chronographe','Quartz','Japon'),(18,'206063006','Pulsar',69,'Automatique','Acier inoxydable','Noir','Acier','5 ATM','Ref : 206063006\r\nSuperbe montre chronographe Pulsar phase de lune en très bon état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement du verre\r\n- Remplacement de la pile (sera fait le jour de la vente)\r\n- Graissage du joint de boîtier \r\n- Réglage de l’alignement des aiguilles du chrono \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral neuf sans défaut \r\nCadran noir avec indexes et aiguilles chromés \r\nSous cadrans minutes, secondes et dixièmes de secondes\r\nSous cadran phase de lune (soleil en journée et lune de nuit)\r\nMouvement japonais VD59B\r\nRésistance à l,eau 5 ATM\r\nDimensions : \r\nVerre. : 36 mm\r\nBoîtier hors couronne : 43 mm\r\nTotal avec couronne : 45 mm\r\nÉpaisseur du cadran : 11 mm\r\nBracelet: tour de poignet 19 cm - pas de maillons supplémentaires \r\nEnvoi soigné dans une boîte de présentation neutre','https://www.leboncoin.fr/ad/montres_bijoux/3084932969','2025-11-02 15:25:01','Chronographe','Quartz','Japon'),(19,'206063023','Casio Edifice',59,'Automatique','Acier inoxydable','Noir','Acier','10 ATM','Ref : 206063023\r\nSuperbe montre Casio Édifice EF525 en très bon état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement de la pile (sera fait au moment de la vente)\r\n- Graissage du joint de boîtier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier et bracelet en acier Inoxydable\r\nVerre minéral bombé en bon état \r\nCadran noir \r\nSous cadrans jour, minutes et secondes (chronographe)\r\nMouvement japonais Miyota FS80\r\nRésistance à l’eau 10 ATM\r\nDateur rapide à 4 heures \r\nDimensions :\r\nVerre : 33 mm\r\nBoîtier hors couronne : 42 mm\r\nTotal avec couronne : 44 mm\r\nÉpaisseur du cadran au centre du verre : 12 mm\r\nEnvoi soigné dans une boîte de présentation neutre','https://www.leboncoin.fr/ad/montres_bijoux/3077247209','2025-11-02 15:31:59','Rétrograde','Quartz','Japon'),(20,'206063017','Festina',59,'Automatique','Acier inoxydable','Noir','Cuir','5 ATM','Ref : 206063017\r\nSuperbe montre Festina rétrograde, calendrier perpétuel en excellent état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier aux ultrasons \r\n- Remplacement de la pile (sera fait au moment de la vente)\r\n- Graissage du joint de boîtier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral sans défaut \r\nCadran noir avec chiffres romains\r\nSous cadrans date et heures sur 24 heures\r\nSous cadrâmes rétrograde jours de la semaine \r\nMouvement japonais Miyota JR10\r\nRésistance à l’eau 5 ATM\r\nBracelet cuir noir avec boucle gravée \r\nDimensions :\r\nVerre : 38 mm\r\nBoîtier sans couronne : 42 mm\r\nTotal avec couronne : 45 mm\r\nÉpaisseur du cadran : 10 mm\r\nEnvoi soigné dans son coffret original','https://www.leboncoin.fr/ad/montres_bijoux/3071456963','2025-11-02 15:37:46','Rétrograde','Quartz','Japon'),(21,'206063014','Lotus',69,'Automatique','Acier inoxydable','Noir','Acier','5 ATM','Ref : 206063014\r\nSuperbe montre Lotus Rétrograde calendrier perpétuel en excellent état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement de la pile\r\n- Remplacement du verre\r\n- Graissage du joint de boitier \r\n- Réglage du calendrier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral bombé neuf sans défaut \r\nCadran noir avec lunette intérieure graduée \r\nIndexes et tours de cadrans vieux rose\r\nLéger défaut sur la lunette intérieure\r\nSous cadrans jour, date et heures sur 24 heures \r\nMouvement japonais Epson VX3SE\r\nRésistance à l’eau 5 ATM\r\nCouronne gravée avec logo\r\nBracelet acier inoxydable \r\nDimensions : \r\nVerre : 38 mm\r\nBoîtier hors couronne : 42 mm\r\nTotal avec couronne : 44 mm\r\nÉpaisseur du cadran au centre du verre : 12 mm\r\nBracelet original avec boucle gravée, en bon état \r\nTour de poignet 18 cm - pas de maillon supplémentaire \r\nEnvoi soigné dans une boîte de présentation neutre','https://www.leboncoin.fr/ad/montres_bijoux/3069300159','2025-11-02 16:51:54','Rétrograde','Quartz','Japon'),(23,'206063004','Pulsar',59,'Automatique','Acier inoxydable','Noir','Cuir','10 ATM','Ref : 206063004\r\nSuperbe montre chronographe Pulsar, en excellent état \r\nEntretien et vérifications effectuées sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement de la pile (sera fait le jour de la vente)\r\n- Remplacement du bracelet\r\n- Réglage de l’alignement des aiguilles du chrono\r\n- Graissage du joint de boîtier \r\n- Test\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral sans défaut \r\nCadran noir et gris\r\nSous cadrans minutes, secondes et heures sur 24 heures\r\nIndexes et aiguilles chromés \r\nAiguilles phosphorescentes \r\nDateur rapide entre 4 et 5 heures\r\nMouvement japonais VD53C\r\nRésistance à l’eau 10 ATM\r\nBracelet cuir avec surpiqûre et doublure rouge, assorti,à la trotteuse\r\nDimensions :\r\nVerre : 36 mm\r\nBoîtier hors couronne : 43 mm\r\nTotal avec couronne : 45 mm\r\nÉpaisseur du cadran : 11 mm\r\nEnvoi soigné dans son coffret d’origine','https://www.leboncoin.fr/ad/montres_bijoux/3062367669','2025-11-02 16:59:20','Chronographe','Quartz','Japon'),(24,'206063003','Fossil',49,'Automatique','Acier inoxydable','Noir','Acier','5 ATM','Ref : 206063003\r\nSuperbe montre chronographe Fossil en très bon état \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons \r\n- Remplacement du verre\r\n- Remplacement de la pile\r\n- Graissage du joint de boîtier \r\n- Réglage de l’alignement des aiguilles de chrono\r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier et bracelet en acier inoxydable \r\nVerre minéral neuf sans défaut \r\nCadran noir avec gros chiffres\r\nSous cadrans minutes secondes et dixièmes de secondes\r\nDateur rapide à 4 heures\r\nMouvement japonais VD57B\r\nRésistance à l’eau 5 ATM (non étanche)\r\nBracelet original avec boucle déployante gravée \r\nDimensions : \r\nVerre : 42 mm\r\nBoîtier hors couronne : 45 mm\r\nTotal avec couronne : 48 mm\r\nÉpaisseur du cadran : 11 mm\r\nBracelet: tour de poignet 20 cm, pas de maillons supplémentaires \r\nEnvoi soigné dans une boîte de la marque','https://www.leboncoin.fr/ad/montres_bijoux/3078823429','2025-11-02 17:03:28','Chronographe','Quartz','Japon'),(27,'206062996','Fossil',59,'Automatique','Acier inoxydable','Noir','Acier','3 ATM','Ref : 206062996\r\nSuperbe montre quartz Fossil, parfait état\r\nEntretien et vérifications effectué sur cette montre :\r\n- Démontage complet et nettoyage sur boîtier et du bracelet aux ultrasons\r\n- Remplacement du verre\r\n- Remplacement de la pile\r\n- Graissage du joint de boîtier \r\n- Tests \r\nLa montre est comme neuve, aucun défaut et fonctionne parfaitement \r\n\r\nBoîtier et bracelet assorti bleu nuit, en acier inoxydable \r\nVerre minéral neuf sans défaut \r\nCadran bleu nuit avec chiffres romains \r\nIndexes et aiguilles teinte or rose\r\nDateur rapide à 6 heures\r\nMouvement japonais VJ12B\r\nRésistance à l’eau 3 ATM\r\nDimensions :\r\nVerre : 31 mm\r\nBoîtier hors couronne : 35 mm\r\nTotal avec couronne : 38 mm\r\nÉpaisseur du cadran : 7 mm\r\nEnvoi soigné dans son coffret','https://www.leboncoin.fr/ad/montres_bijoux/3080513341','2025-11-02 17:19:42','Analogique','Quartz','Japon'),(29,'206062994','Pulsar',69,'Automatique','Acier inoxydable','Noir','Acier','10 ATM','Ref : 206062994\r\nSuperbe montre Chronographe / Alarm Pulsar restaurée \r\nEntretien et vérifications effectués sur cette montre :\r\n- Démontage complet et nettoyage du boîtier et du bracelet aux ultrasons\r\n- Remplacement du mouvement 7T62 par un mouvement neuf YM62A (versions identiques)\r\n- Remplacement du verre\r\n- Remplacement de la pile\r\n- Réglage de l’alignement des aiguilles \r\n- Graissage du joint de boîtier \r\n- Tests\r\nLa montre fonctionne parfaitement \r\n\r\nBoîtier en acier inoxydable \r\nVerre minéral bombé neuf sans défaut \r\nCadran noir\r\nSous cadrans trotteuse permanente à 9 heures, minutes (chrono à 12 heures, et horloge d’alarme à 6 heures \r\nGrande trotteuse centrale fonctionne avec le chronomètre \r\nMouvement japonais YM62A neuf\r\nDateur rapide à 3 heures\r\nRésistance à l’eau 10 ATM\r\nBracelet acier inoxydable d’origine avec   4 maillons supplémentaires \r\nDimensions :\r\nVerre : 32 mm\r\nBoîtier hors couronne : 39 mm\r\nTotal avec couronne : 41 mm\r\nÉpaisseur du cadran au centre du verre : 12 mm\r\nEnvoi soigné dans son coffret d’origine avec Manuel d’utilisation','https://www.leboncoin.fr/ad/montres_bijoux/3079375684','2025-11-02 17:34:49','Chronographe','Quartz','Japon');
/*!40000 ALTER TABLE `montres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 11:41:57
