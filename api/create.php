<?php
if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    // Access is not allowed
    header('HTTP/1.0 403 Forbidden');
    exit(json_encode(['status'=>0, 'msg'=>'method not allowed']));
}else{
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Acess-Control-Allow-Headers: Acess-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Request-With');

    // Initializes the api
    include_once '../core/initialize.php';

    // Intanciates post
    $contact = new Contact($DB);

    $data = json_decode(file_get_contents("php://input"));

    function data_msg_error(string $error){
        $msg = array(
            'status' => 0,
            'msg' => "error: $error não é válido"
        );
        return ($msg);
    }

    $sit = 0;
    $userSit = 0;
    $errorMsg = array();
    $errorMsg['error'] = null;

    if(!isset($data->userid) || intval($data->userid) <= 0){
        array_push($errorMsg['error'], data_msg_error('userid'));
        $userSit++;
    }
    if(!isset($data->nome) || strlen($data->nome) < 2){
        array_push($errorMsg['error'], data_msg_error('nome'));
        $sit++;
    }
    if(!isset($data->sobrenome)){
        array_push($errorMsg['error'], data_msg_error('sobrenome'));
        $sit++;
    }
    if(!isset($data->telefone) || strlen($data->telefone) < 7){
        array_push($errorMsg['error'], data_msg_error('telefone'));
        $sit++;
    }
    if(!isset($data->whatsapp)){
        array_push($errorMsg['error'], data_msg_error('whatsapp'));
        $sit++;
    }
    if(!isset($data->email)){
        array_push($errorMsg['error'], data_msg_error('email'));
        $sit++;
    }
    
    if($sit > 0){
        exit(http_response_code(400));
    }else if($userSit > 0){
        exit(http_response_code(401));
    }else{
        $contact->nome = $data->nome;
        $contact->sobrenome = $data->sobrenome;
        $contact->telefone = $data->telefone;
        $contact->whatsapp = $data->whatsapp;
        $contact->email = $data->email;
        $contact->userid = $data->userid;

        //create contact
        $result = $contact->create();
        if($result['status'] === 1){
            echo json_encode($result);
        }else if($result['status'] === 0){
            echo json_encode($result);
        }else{
            echo json_encode(['status'=> 500, 'msg' => 'ocorreu um erro interno']);
            exit(http_response_code(500));
        }
    }
}