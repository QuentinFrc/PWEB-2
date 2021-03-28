<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">

<head>
    <meta charset="utf-8" />
    <title>GuessWhere ?</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./vue/styleCSS/map.css"/>
    <link rel="stylesheet" href="./vue/styleCSS/animate.css"/>
    <link rel="stylesheet" href="./vue/styleCSS/global.css"/>
</head>

<body>
    <div class="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        </div>
    
<div id="jeu">
    <h1 id="title"> GuessWhere ? </h1>
    <form id="form">
        <div id='enoncé'> 
            <h2 id="tour"></h2>
            <p id='textEnoncé'></p>
            <p id='tirage'> </p>
        </div>
        <div class="mode">
            <label for="playRegion">Easy mode</label>
            <button class="input" type="button" id="playRegion">Regions Editiion</button>
            <label for="playRegion">Normal mode</label>
            <button class="input" type="button" id="playDepartement">Départements Edition</button>
            <label for="playRegion">Hard mode</label>
            <button class="input" type="button" id="playCommune">Communes d'Iles de France Edition</button>
        </div>
    </form>
        <div class="option">
        <button type="button" id="reset">Quitter la partie</button>

        <button type="button" id="valid">Valider</button>

        <button type="button" id="suivant">Suivant</button></div>
    </div>
        <div id="map"></div>
        <div id="score" style="display:none">
            <p>La partie est terminé !</p> 
            <p>Votre score est de :</p>
            <p id="nb_score"></p>
            <p>Voulez-vous l'enregistrer ou rejouer ?</p>
            <div class="option">
                <form action="index.php?controle=partie&action=score" id="f-e" method="post"></form>
                    <input type="text" name="nb" id="nb" style="display:none" value="">
                    <input class="button" formaction="index.php?controle=partie&action=score" type ="submit" id="b-enregistrer" value="enregistrer">
                </form>
                <form action="index.php?controle=partie&action=rejouer" id="f-r" method="post">
                    <input class="button" type ="submit" id="b-inscription" value="rejouer">
                </form> 
            </div>
        </form>
    </div>
</body>
<script type="text/javascript" src="vue/script.js"></script>
</html>