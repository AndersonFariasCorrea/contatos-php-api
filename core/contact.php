<?php

/**
 * @param Object $db must pass a pdo object conection
 */
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
    public $username;
    public $created_at;
    public $userid;

    // Constructor with db conn
    public function __construct(Object $db){
        $this->conn = $db;
    }
    /**
     * Gets contacts from database by string starting
     * @return object query result
     */
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
                WHERE user.id = :userid AND c.nome LIKE :cnome
            ORDER BY c.nome DESC;';

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // Bind param
        $seach = $this->nome . '%';
        $stmt->bindParam(':cnome', $seach);
        $stmt->bindParam(':userid', $this->userid);
        
        // Execute query
        $stmt->execute();

        return $stmt;
    }

    /**
     * Gets contacts from database
     * @return object query result
     */
    public function list_one(){
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
                WHERE user.id = :userid AND c.id = :cid
            ORDER BY c.nome DESC;';

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // clean data
        $this->id =  htmlspecialchars(strip_tags($this->id));
        $this->userid =  htmlspecialchars(strip_tags($this->userid));

        // Bind param
        $stmt->bindParam(':cid', $this->id);
        $stmt->bindParam(':userid', $this->userid);

        // Execute query
        $stmt->execute();

        // Fecth row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($stmt->rowCount() > 0){
            // Add the value to the public class propeties
            $this->username     = $row['username'];
            $this->id           = $row['id'];
            $this->nome         = $row['nome'];
            $this->sobrenome    = $row['sobrenome'];
            $this->telefone     = $row['telefone'];
            $this->whatsapp     = $row['whatsapp'];
            $this->email        = $row['email'];
            $this->created_at   = $row['created_at'];
            return ['status'=>1];
        }
        return ['status'=>0,'msg'=>'contato não encontrado'];    
    }

    /**
     * Validates if the email follows a allowed pattern
     * @param string $email
     * @return true the email is valid
     * @return false the email is not valid
     */
    private function validateEmail(string $email){
        $email_pattern = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
        if(preg_match($email_pattern, $email)){
            return true;
        }
        return false;
    }
    /**
     * Validates if the phone number follows a allowed pattern
     * @param string $telefone
     * @return true the phone numbeer is valid
     * @return false the phone number is not valid
     */
    private function validateTel(string $phonenumber){
        $tel_pattern = "/(^(\+\d{1,3})(\(\d{1,3}\))(\d{8,9})$|^(\d{1,3})(\(\d{1,3}\))(\d{8,9})$|^(\+\d{1,3})(\d{1,3})(\d{8,9})$|^(\d{1,3})(\d{1,3})(\d{8,9})$|^(\(\d{1,3}\))(\d{1,9})$|^(\d{1,3})(\d{1,9})$)/";
        if(preg_match($tel_pattern, $phonenumber)){
            return true;
        }
        return false;
    }

    /**
     * Create a new contact
     * @param none
     * @return true a new contact was created
     * @return false the contact was not created
     */
    public function create(){
        // Query
        $sql = 'INSERT INTO ' .$this->table. ' SET nome = :nome, sobrenome = :sobrenome, telefone = :telefone, whatsapp = :whatsapp, email = :email, userid = :userid';
        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // clean and validate data
        $this->nome =  htmlspecialchars(strip_tags($this->nome));
        $this->sobrenome =  htmlspecialchars(strip_tags($this->sobrenome));

        if($this->validateTel($this->telefone)){
            $this->telefone =  htmlspecialchars(strip_tags($this->telefone));
        }else if(! empty($this->telefone)){
            return ["status"=> 0, "msg"=> "número não é válido"];
        }
        
        if($this->validateTel($this->whatsapp)){
            $this->whatsapp =  htmlspecialchars(strip_tags($this->whatsapp));
        }else if(! empty($this->whatsapp)){
            return ["status"=> 0, "msg"=> "whatsapp não é válido"];
        }

        if($this->validateEmail($this->email)){
            $this->email =  htmlspecialchars(strip_tags($this->email));
        }else if(! empty($this->email)){
            return ["status"=> 0, "msg"=> "email não é válido"];
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
            return ['status'=> 1, 'msg' => 'contato criado com sucesso'];
        }

        // Error Handle
        log_error("Error %s. \n", $stmt->error);
        return false;
    }

    /**
     * Updates contacts from database
     * @return bool true if query executes correctly
     * @return bool false if query runs an error
     */
    public function update(){
        // Query
        $sql = 'UPDATE ' .$this->table. ' 
            SET nome = :nome, sobrenome = :sobrenome, telefone = :telefone, whatsapp = :whatsapp, email = :email
            WHERE userid = :userid AND id = :cid';
        // Prepare statement
        $stmt = $this->conn->prepare($sql);
        // clean data
        $this->nome        =  htmlspecialchars(strip_tags($this->nome));
        $this->sobrenome   =  htmlspecialchars(strip_tags($this->sobrenome));
        $this->userid      =  htmlspecialchars(strip_tags($this->userid));
        $this->id          =  htmlspecialchars(strip_tags($this->id));

        if($this->validateEmail($this->email)){
            $this->email =  htmlspecialchars(strip_tags($this->email));
        }else{
            return false;
        }
        if($this->validateTel($this->telefone)){
            $this->telefone =  htmlspecialchars(strip_tags($this->telefone));
        }else{
            return false;
        }
        if($this->validateTel($this->whatsapp)){
            $this->whatsapp =  htmlspecialchars(strip_tags($this->whatsapp));
        }else{
            return false;  
        }

        // Bind param
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':sobrenome', $this->sobrenome);
        $stmt->bindParam(':telefone', $this->telefone);
        $stmt->bindParam(':whatsapp', $this->whatsapp);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':userid', $this->userid);
        $stmt->bindParam(':cid', $this->id);

        // Execute query
        $stmt->execute();

        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }

        // Error Handle
        printf("Error %s. \n", $stmt->error);
        return false;
    }
    /**
     * Delete a specified contact
     * @return bool true if is was successfully deleted
     * @return bool false if is was not deleted
     */
    public function delete(){
        // Query
        $sql = 'DELETE FROM ' . $this->table . ' WHERE userid = :userid AND id = :cid';

        // Prepare statment
        $stmt = $this->conn->prepare($sql);

        // Parse data
        $this->userid =  htmlspecialchars(strip_tags($this->userid));
        $this->id     =  htmlspecialchars(strip_tags($this->id));

        // Bind param
        $stmt->bindParam(':userid', $this->userid);
        $stmt->bindParam(':cid', $this->id);

        // Execute query
        $stmt->execute();

        // Verify is it was well succeed
        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }

        // Error Handle
        printf("Error %s. \n", $stmt->error);
        return false;
    }
}