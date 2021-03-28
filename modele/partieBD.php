<?php
    function ajouterScore($login,$score){
        require ("connectBD.php");
        $sql="INSERT INTO Score(login, score) VALUES(:login,:score)";
        
        try {
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':login', $login, PDO::PARAM_STR);
            $commande->bindParam(':score', $score, PDO::PARAM_STR);
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