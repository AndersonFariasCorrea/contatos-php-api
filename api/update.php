<?php

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

    if(!isset($data->nome)){
        echo data_msg_error('nome');
        exit(http_response_code(400));
    }
    if(!isset($data->sobrenome)){
        echo data_msg_error('sobrenome');
        exit(http_response_code(400));
    }
    if(!isset($data->telefone)){
        echo data_msg_error('telefone');
        exit(http_response_code(400));
    }
    if(!isset($data->whatsapp)){
        echo data_msg_error('whatsapp');
        exit(http_response_code(400));
    }
    if(!isset($data->email)){
        echo data_msg_error('email');
        exit(http_response_code(400));
    }

    $contact->nome = $data->nome;
    $contact->sobrenome = $data->sobrenome;
    $contact->telefone = $data->telefone;
    $contact->whatsapp = $data->whatsapp;
    $contact->email = $data->email;
    $contact->userid = $data->userid;
    $contact->id = $data->cid;

    //  Update a contact
    if($contact->update()){
        echo json_encode(['status'=> 1, 'msg' => 'contact updated successfully']);
    }else{
        echo json_encode(['status'=> 0, 'msg' => 'contact was not updated']);
    }
