<?php

/**
 * @param Object $db must pass a pdo object conection
 * */
class Contact{
    // db
    private $conn;
    private $table = 'contacts';

    // Contact propeties
    public $id;
    public $nome;
    public $sobrenome;
    public $telefone;
    public $whatsapp;
    public $email;
    public $created_at;

    // Constructor with db conn
    public function __construct(Object $db){
        $this->conn = $db;
    }

    /**
     * Gets contacts from database
     * @param none
     * @return object query result
     * */
    public function list(){
        // Query
        $sql = 'SELECT
            c.id,
            c.nome,
            c.sobrenome,
            c.telefone,
            c.whatsapp,
            c.email,
            c.created_at 
            FROM 
            '.$this->table.' c 
            ORDER BY c.created_at DESC;';

        // Prepare statement
        $stmt = $this->conn->prepare($sql);
        
        // Execute query
        $stmt->execute(); 

        return $stmt;
    }

}