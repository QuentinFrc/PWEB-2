<?php
    function verif_ident($login,$mdp, &$profil) {
        //connexion au serveur de BD -> voir fichier connect.php
        //requete select en BD  -> voir fin cours PDO -> requete paramétrée
        require ("connectBD.php");
        $sql="SELECT * FROM util where login=:login and password=:mdp"; 
        try {
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':login', $login, PDO::PARAM_STR);
            $commande->bindParam(':mdp', $mdp, PDO::PARAM_INT);
            $commande->execute();
            
            if ($commande->rowCount() > 0) {  //compte le nb d'enregistrement
                $profil = $commande->fetch(PDO::FETCH_ASSOC); //svg du profil
                return true;
            }
            else {
                return false;
            }
        }
        catch (PDOException $e) {
            echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
            die();
        }
    }

    function verif_ident_Inscription($login,&$profil) {
        //connexion au serveur de BD -> voir fichier connect.php
        //requete select en BD  -> voir fin cours PDO -> requete paramétrée
        require ("connectBD.php");
        $sql="SELECT * FROM util  where login=:login";  
        try {
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':login', $login, PDO::PARAM_STR);
            $commande->execute();
            
            if ($commande->rowCount() > 0) {  //compte le nb d'enregistrement
                $profil = $commande->fetch(PDO::FETCH_ASSOC); //svg du profil
                return true;
            }
            else {
                return false;
            }
        }
        catch (PDOException $e) {
            echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
            die();
        }
    }

    function newInscrit($login,$mdp,&$profil) {
        //connexion au serveur de BD -> voir fichier connect.php
        //requete select en BD  -> voir fin cours PDO -> requete paramétrée
        require ("connectBD.php");
        $sql="INSERT INTO util(login, password) VALUES(:login, :mdp)";
        
        try {
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':login', $login, PDO::PARAM_STR);
            $commande->bindParam(':mdp', $mdp, PDO::PARAM_STR);
            $commande->execute();
            
            /*$commande->debugDumpParams(); //affiche la requete préparée
            die ('RowCount ' . $commande->rowCount() . '<br/>');
            */
            
            if ($commande->rowCount() > 0) {  //compte le nb d'enregistrement
                $profil = $login;
                return true;
            }
            else {
                return false;
            }	
        }
        catch (PDOException $e) {
            echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
            die(); // On arrête tout.
        }
    }
?>