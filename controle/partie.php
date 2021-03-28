<?php
    function rejouer(){
        require ('vue/maps/map.tpl'); //rediriger vers la maps
    }

    function score(){
        require_once('modele/partieBD.php');
        $score = isset($_POST['nb'])?($_POST['nb']):'';
        $login = $_SESSION['login'];
        ajouterScore($login,$score);
        var_dump($login);
        var_dump($score);
        require ('vue/maps/map.tpl'); //rediriger vers la maps
    }
?>