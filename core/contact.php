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
    public $userid;
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
            user.id as userid,
            user.nome as username,
            c.id,
            c.nome,
            c.sobrenome,
            c.telefone,
            c.whatsapp,
            c.email,
            c.created_at 
            FROM 
            '.$this->table.' c 
            LEFT JOIN 
                user ON user.id = c.userid
                WHERE user.id = ?
            ORDER BY c.nome DESC;';

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // Bind param
        $stmt->bindParam(1, $this->userid);
        
        // Execute query
        $stmt->execute(); 

        return $stmt;
    }

    private function validade_email(string $email){
        $email_pattern = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
        if(preg_match($email_pattern, $email)){
            return true;
        }
        return false;
    }
    private function validate_tel(string $telefone){
        $tel_pattern = "/(^(\+\d{1,3})(\(\d{1,3}\))(\d{8,9})$|^(\d{1,3})(\(\d{1,3}\))(\d{8,9})$|^(\+\d{1,3})(\d{1,3})(\d{8,9})$|^(\d{1,3})(\d{1,3})(\d{8,9})$|^(\(\d{1,3}\))(\d{1,9})$|^(\d{1,3})(\d{1,9})$)/";
        if(preg_match($tel_pattern, $telefone)){
            return true;
        }
        return false;
    }

    public function create(){
        // Query
        $sql = 'INSERT INTO ' .$this->table. ' SET nome = :nome, sobrenome = :sobrenome, telefone = :telefone, whatsapp = :whatsapp, email = :email, userid = :userid';
        // Prepare statement
        $stmt = $this->conn->prepare($sql);
        // clean data
        $this->nome =  htmlspecialchars(strip_tags($this->nome));
        $this->sobrenome =  htmlspecialchars(strip_tags($this->sobrenome));

        if($this->validate_tel($this->telefone)){
            $this->telefone =  htmlspecialchars(strip_tags($this->telefone));
        }else{
            return ["error"=> "número", "msg"=> "número não é válido"];
        }
        
        if($this->validate_tel($this->whatsapp)){
            $this->whatsapp =  htmlspecialchars(strip_tags($this->whatsapp));
        }else{
            return ["error"=> "WhatsApp", "msg"=> "número WhatsApp não é válido"];  
        }

        if($this->validade_email($this->email)){
            $this->email =  htmlspecialchars(strip_tags($this->email));
        }else{
            return ["error"=> "email", "msg"=> "email não é válido"];
        }

        // Bind param
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':sobrenome', $this->sobrenome);
        $stmt->bindParam(':telefone', $this->telefone);
        $stmt->bindParam(':whatsapp', $this->whatsapp);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':userid', $this->userid);

        // Execute query
        if($stmt->execute()){
            return true;
        }

        // Error Handle
        printf("Error %s. \n", $stmt->error);
        return false;
    }

}