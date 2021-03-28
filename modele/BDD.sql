-- Base de données :  `PWEB-C`
-- --------------------------------------------------------

-- Structure de la table Util

CREATE TABLE Util (
  login VARCHAR(15) PRIMARY KEY NOT NULL,
  password VARCHAR(1000) NOT NULL
);

INSERT INTO Util (login, password) VALUES ('root', 'root');

CREATE TABLE Score (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  login VARCHAR(15) NOT NULL,
  score INTEGER NOT NULL
);

ALTER TABLE Score
ADD FOREIGN KEY login REFERENCES Util(login);