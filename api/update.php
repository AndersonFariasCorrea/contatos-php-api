<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    // Access is not allowed
    header('HTTP/1.0 403 Forbidden');
    exit;
}else{
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Acess-Control-Allow-Headers: Acess-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Request-With');

    // Initializes the api
    include_once '../core/initialize.php';

    // Intanciates post
    $contact = new Contact($DB);

    $data = json_decode(file_get_contents("php://input"));

    // Validate and set searched contact id
    $contact->id = isset($data->cid) && preg_match("/\d/", $data->cid) ? $data->cid : exit(http_response_code(400));

    // Add uset auth here
    $contact->userid = isset($data->userid) && preg_match("/\d/", $data->userid) ? $data->userid : exit(http_response_code(401));

    function data_msg_error(string $error){
        $msg = array(
            'status' => 0,
            'msg' => "error: $error não é válido"
        );
        return json_encode($msg);
    }

    $sit = 0;
    $userSit = 0;

    if(!isset($data->nome)){
        echo data_msg_error('nome');
        $sit++;
    }
    if(!isset($data->sobrenome)){
        echo data_msg_error('sobrenome');
        $sit++;
    }
    if(!isset($data->telefone)){
        echo data_msg_error('telefone');
        $sit++;
    }
    if(!isset($data->whatsapp)){
        echo data_msg_error('whatsapp');
        $sit++;
    }
    if(!isset($data->email)){
        echo data_msg_error('email');
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
        $contact->id = $data->cid;

        //  Update a contact
        $result = $contact->update();
        if($result['status'] === 1){
            echo json_encode($result);
        }else{
            echo json_encode($result);
        }
    }
}