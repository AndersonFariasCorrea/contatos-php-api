
<?php

    $auth = array(
        "username"=> "Anderson",
        "logged"=> true,
        "userid"=> 5
    );

?>
<!DOCTYPE html>
<html lang="Pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contatos</title>
    <!--Google fonts-->
    <link href="./public/css/roboto.css" rel="stylesheet">
    <!--Bootstrap-->
    <link href="./public/css/bootstrap.css" rel="stylesheet">
    <!--Font Awesome-->
    <script src="./public/js/font-awesome.js"></script>
    <!--Our css-->
    <link rel="stylesheet" href="./public/css/style.css">
</head>
<body>
    <?php if ($auth["logged"]) : echo "<span id=\"userid\" style=\"display:none;\">{$auth['userid']}</span>\n"?>
        <div class="popup-form text-center">
            <div class="popup-form-content">
                
            </div>
        </div>
        <script src="./public/js/bootstrap.js"></script>
        <script src="./public/js/jquery.min.js"></script>
        <script src="./public/js/main.js" Content-Type: application/javascript></script>   
    <?php else : ?>
        <div class="container mt-5">
            <div class="row">
                <p>
                <span class="error">Você não está autorizado a acessar esta página.</span> Por favor faça <a href="/sisfan/entrar/">log-in</a>.
                </p>
            </div>
        </div>
    <?php endif; ?>
</body>
</html>