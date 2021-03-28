<?php
//fonction  permet a une entrepise de se connecter 
function connexion(){
    require_once ('modele/utilBD.php');
    $login=isset($_POST['login'])?($_POST['login']):'';
    $mdp=isset($_POST['mdp'])?($_POST['mdp']):'';
    $msg='';

    if(count($_POST)==0){
        $msg = "";
        require ("vue/default/connexion.tpl") ;
    }
    else {
        $profil = array();
        if  (!verif_ident($login,$mdp,$profil)) {
            $msg ="Login ou mot de passe incorrect";
            require ("vue/default/connexion.tpl");
        }
        else { 
            $_SESSION['login']= $profil['login'];
            $nexturl = "index.php?controle=util&action=accueil";
            header("Location:" . $nexturl); // On retourne à la page index !!!
        }
    }	
}

//fonction qui permet de créer une nouvelle entreprisese grace au tpl inscription.tpl
function inscription(){
    require_once('modele/utilBD.php');
    $login = isset($_POST['login'])?($_POST['login']):'';
    $mdp = isset($_POST['mdp'])?($_POST['mdp']):'';
    $msg='';
    if  (count($_POST)==0)
        require ('vue/default/inscription.tpl');
    else {
        $profil = array();
            if(!verif_ident_Inscription($login,$mdp)){
                if(!empty($login)){
                    if (newInscrit($login,$mdp,$profil)) {
                        $_SESSION['login']= $profil;
                        $nexturl = "index.php?controle=util&action=accueil";
                        header("Location:".$nexturl); // On retourne à la page index !!!
                    }
                }
                else { 
                    $msg ="Erreur de saisie";
                    include ('vue/default/inscription.tpl') ;
                }
            }
            else {
                $msg = 'utilisateur déjà inscrit';
                require ('vue/default/inscription.tpl');	
            }
        }
}

function accueil(){
        require ('vue/maps/map.tpl'); //rediriger vers la maps
    }

//fonction qui permet de nettoyer la variable session et qui ramène a l'acceuil non connecté
function Deconnexion(){
    unset($_SESSION['login']);
    $nexturl = "index.php";
    header("Location:" . $nexturl); // On retourne à la page index !!!
}
?>