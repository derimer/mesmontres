-- Table principale des montres
CREATE TABLE IF NOT EXISTS montres (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  reference VARCHAR(255),
  brand VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  type_de_mouvement VARCHAR(100),
  origine_mouvement VARCHAR(100),
  price INT NOT NULL,
  mouvement VARCHAR(100) DEFAULT 'Automatique',
  materiau_boitier VARCHAR(100) DEFAULT 'Acier inoxydable',
  couleur_cadran VARCHAR(50) DEFAULT 'Noir',
  bracelet VARCHAR(100) DEFAULT 'Bracelet acier',
  resistance_eau VARCHAR(50) DEFAULT '3 ATM',
  description TEXT,
  referenceURL VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table des images liées à une montre
CREATE TABLE IF NOT EXISTS images (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  montre_id INT UNSIGNED NOT NULL,
  filename VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (montre_id) REFERENCES montres(id) ON DELETE CASCADE
);

-- Table des messages du formulaire de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject ENUM('information', 'achat', 'support', 'partenariat', 'autre') NOT NULL DEFAULT 'information',
  message TEXT NOT NULL,
  status ENUM('nouveau', 'lu', 'répondu', 'fermé') NOT NULL DEFAULT 'nouveau',
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des utilisateurs (si un jour tu veux ajouter d'autres admins)
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
