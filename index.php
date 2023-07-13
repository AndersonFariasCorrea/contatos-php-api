
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
                <h1 class="pt-2 fw-bold action-name">Action</h1>
                <div class="app-area"></div>
                <form class="presentationForm mt-2">
                    <label for="first-name"></label>
                    <input class="form-control" type="text" id="first-name" name="firstname" pattern="/^[0-9a-zA-Zá-ú\s]+$/" title="Nome" placeholder="Nome *" required>

                    <label for="last-name"></label>
                    <input class="form-control" type="text" id="last-name" name="lastname" pattern="/^[0-9a-zA-Zá-ú\s]+$/" title="Sobrenome" placeholder="Sobrenome">
                    

                    <label for="phone"></label>
                    <input class="form-control" type="tel" id="phone" name="phone" pattern="\+\d{1,14}" placeholder="Celular: +55 (99) 9 9999-9999 / (99) 9 9999-9999 *" required>

                    <label for="whatsapp"></label>
                    <input class="form-control" type="tel" id="whatsapp" name="phone" pattern="\+\d{1,14}" placeholder="WhatsApp: +55 (99) 9 9999-9999 / (99) 9 9999-9999">

                    <label for="email"></label>
                    <input class="form-control" type="email" id="email" name="email" placeholder="Email">

                    <div class="row mt-5">
                        <div class="col">
                            <button type="submit" class="submit-contact-action btn btn-primary w-100">Salvar</button>
                        </div>
                        <div class="col">
                            <button type="button" class="cancel-contact-action btn btn-danger w-100">Cancelar</button>
                        </div>
                    </div>
                </form>
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