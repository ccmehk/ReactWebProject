-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: juven
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `org_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_ibfk_1` (`org_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organization` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Harvard Standford Princeton Happy Hour',1487354400,'FLY, G/F, 24-30 Ice House Street, Central',50,'images/event1.jpg',1),(2,'Guided Tour at Tze Shan Monastery for Cornell, Harvard & Princeton',1487237400,'Tsz Shan Monastery, 88 Universal Gate Road, Tai Po',100,'images/event2.jpg',1),(3,'Ivy Ball 2017',1493094695,'Hong Kong Convention and Exhibition Centre',1400,'images/event3.jpg',1),(4,'event4',NULL,'org2event1 loc',22,'event1 img',2),(5,'event5',NULL,'org2event2 loc',64,'event2 img',2),(6,'event6',NULL,'org2event3 loc',9,'event3 img',2);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evt_usr_instance`
--

DROP TABLE IF EXISTS `evt_usr_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evt_usr_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `evt_id` int(11) DEFAULT NULL,
  `usr_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evt_id` (`evt_id`),
  KEY `usr_id` (`usr_id`),
  CONSTRAINT `evt_usr_instance_ibfk_1` FOREIGN KEY (`evt_id`) REFERENCES `event` (`id`),
  CONSTRAINT `evt_usr_instance_ibfk_2` FOREIGN KEY (`usr_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evt_usr_instance`
--

LOCK TABLES `evt_usr_instance` WRITE;
/*!40000 ALTER TABLE `evt_usr_instance` DISABLE KEYS */;
INSERT INTO `evt_usr_instance` VALUES (3,3,1),(6,3,2),(7,1,3),(8,2,3),(9,3,3),(11,1,1),(15,2,2);
/*!40000 ALTER TABLE `evt_usr_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `org_usr_instance`
--

DROP TABLE IF EXISTS `org_usr_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `org_usr_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) DEFAULT NULL,
  `usr_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `org_id` (`org_id`),
  KEY `usr_id` (`usr_id`),
  CONSTRAINT `org_usr_instance_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organization` (`id`),
  CONSTRAINT `org_usr_instance_ibfk_2` FOREIGN KEY (`usr_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `org_usr_instance`
--

LOCK TABLES `org_usr_instance` WRITE;
/*!40000 ALTER TABLE `org_usr_instance` DISABLE KEYS */;
INSERT INTO `org_usr_instance` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,2,2),(6,2,3);
/*!40000 ALTER TABLE `org_usr_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(255) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `cover_image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (1,'The Harvard Club of Hong Kong','@harvardclubhk','2017-04-21 04:17:36','Hong Kong','images/people.jpg','images/cover_bg.jpg'),(2,'company2','company2 desc','2017-04-21 04:17:36','company2 location','company2 pro url','company2 cover url');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Bart Gremmen','usr_email1','images/people1.jpg'),(2,'	Christine Korsgaard','usr_email2','images/people2.jpg'),(3,'Christopher Gyngell','usr_email3','/images/people3.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-25 23:59:41
