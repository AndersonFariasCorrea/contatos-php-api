<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Initializes the api
    include_once '../core/initialize.php';

    // Intanciates post
    $contact = new Contact($DB);

    // Validade and set searched contact id
    $contact->id = isset($_GET['cid']) && preg_match("/\d/", $_GET['cid']) ? $_GET['cid'] : exit(http_response_code(400));

    // Add uset auth here
    $contact->userid = isset($_GET['userid']) && preg_match("/\d/", $_GET['userid']) ? $_GET['userid'] : exit(http_response_code(401));

    // Calls list one row method
    $result = $contact->list_one();

    // Verify if anything was found 
    if(isset($result['status']) && $result['status'] === 0){
        http_response_code(200);
        exit(json_encode($result));
    }

    $contact_item = array(
        'username' => $contact->username,
        'id' => $contact->id,
        'nome' => $contact->nome,
        'sobrenome' => $contact->sobrenome,
        'telefone' => $contact->telefone,
        'whatsapp' => $contact->whatsapp,
        'email' => $contact->email,
        'created_at' => $contact->created_at
    );

    echo json_encode($contact_item);
    exit(http_response_code(200));
