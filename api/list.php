<?php

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    // Access is not allowed
    header('HTTP/1.0 403 Forbidden');
    exit;
}else{
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Initializes the api
    include_once '../core/initialize.php';

    // Intanciates contact
    $contact = new Contact($DB);

    // Add uset auth here
    $contact->userid = isset($_GET['userid']) && preg_match("/\d/", $_GET['userid']) ? $_GET['userid'] : exit(http_response_code(401));

    // Blog contact query
    $result = $contact->list();

    // Get row count    
    $num = $result->rowCount();

    if($num > 0){
        $contact_arr = array();
        $contact_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $contact_item = array(
                'username' => $username,
                'id' => $id,
                'nome' => $nome,
                'sobrenome' => $sobrenome,
                'telefone' => $telefone,
                'whatsapp' => $whatsapp,
                'email' => $email,
                'created_at' => $created_at
            );
            array_push($contact_arr['data'], $contact_item);          
        }
        $contact_arr['query'] = ['rows_count'=> $num];
        // Convert to Json  and output
        echo json_encode($contact_arr);
    }else{
       echo json_encode(['msg' => 'Nenhum contato encontrado', 'rows_count'=> $num]);
    }
    exit(http_response_code());
}