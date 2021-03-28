
<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Inscription</title>
    <link rel="stylesheet" href="./vue/styleCSS/animate.css"/>
    <link rel="stylesheet" href="./vue/styleCSS/global.css"/>
    <link rel="stylesheet" href="./vue/styleCSS/inscription.css"/>
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
<form action="index.php?controle=util&action=inscription" method="post">
<div class="form">
    <h2 class="titre"> Inscription </h2>
    <p id="msg"><?php echo($msg); ?></p>
    <div class ="contenu">
        <div class="input">
            <input class="input-text" name="login" type="text" minlength="4" placeholder="login"  required>
            <input class="input-text" name="mdp" placeholder="mot de passe" type="password" minlength="4" id = "mdp" required>
        </div>
        <div class="button-end">	 
            <input class="button" type="button" id="Bretour" value="Retour" onclick="history.go(-1)">	 
            <input class="button" type= "submit"  id="Bvalider" value="Inscription">
        </div>
    </div>
</div>
</form>
</body>
</html>