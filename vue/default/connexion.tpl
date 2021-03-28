<!doctype html>
<html lang="fr">

<head>
  <meta charset="utf-8">
  <title>Connexion</title>
  <link rel="stylesheet" href="./vue/styleCSS/global.css"/>
  <link rel="stylesheet" href="./vue/styleCSS/animate.css"/>
  <link rel="stylesheet" href="./vue/styleCSS/connexion.css"/>
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
<form action="index.php?controle=util&action=connexion" method="post">
<div class="form">
  <h2 class="titre"> Connexion</h2> 
  <div class ="input">
      <input  class="input-text" name="login" placeholder="Login" type="text" 
      value= "<?php echo($login); ?>" id = "login"/>
      <input  class="input-text" name="mdp" placeholder="Mot de passe" type="password" minlength="4" value= "<?php echo($mdp); ?>" id = "mdp" />
    </div>	 
    <div class = "button-end">
        <input class="button" type="button" id="Bretour" value="Retour" onclick="history.back()">	 
        <input class="button" type= "submit"  id="Bvalider" value="Connexion">
      </div>
    </div>
    <?php echo($msg); ?>
  </div>
</div>
</form>
</body></html>
