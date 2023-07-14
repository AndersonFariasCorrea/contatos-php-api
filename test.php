<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .fullscreen-container {
        display: none;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(90, 90, 90, 0.5);
        z-index: 9999;
    }
    #popdiv {
        height: 300px;
        width: 420px;
        background-color: #97ceaa;
        position: fixed;
        top: 50px;
        left: 50px;
    }
    body {
        padding-top: 65px;
    }
</style>
<body>
    <button id="but1">Open dialog</button>
    <div class="fullscreen-container">
        <div id="popdiv">
            <h1>
            Dialog content!
            </h1>
            <button id="but2">Close dialog</button>
        </div>
    </div>
    <script src="./public/js/bootstrap.js"></script>
    <script src="./public/js/jquery.min.js"></script>
    <script src="./public/js/main.js" Content-Type: application/javascript></script>   
    <script>
        $(function() {
            $("#but1").click(function() {
                $(".fullscreen-container").fadeTo(200, 1);
            });
            $("#but2").click(function() {
                $(".fullscreen-container").fadeOut(200);
            });
        });
    </script>
</body>
</html>