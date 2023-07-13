
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
        <div class="popup-form">
            
            <div class="popup-form-content">
                <h1 class="pt-2 fw-bold action-name text-center">Contatos</h1>
                <div class="row">
                    <div class="col-11">
                        <div class="input-icons">
                            <i class="fa-solid fa-magnifying-glass icon"></i>
                            <input type="email" class="form-control input-fild pesquisa" id="InputEmail" name="fullname"  attern="^[0-9a-zA-Zá-ú\s]+$" aria-describedby="fullnameHelp" placeholder="Pesquisar...">
                        </div>
                    </div>
                    <div class="col dropdown-button">
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Novo contato</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="w-75">Nome</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fulano</td>
                            <td><i class="fa-regular fa-eye"></i></td>
                        </tr>
                    </tbody>
                </table>
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