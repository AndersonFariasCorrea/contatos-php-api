<?php
    
    defined('HOST_PATH') ? null : define('HOST_PATH', $_SERVER['DOCUMENT_ROOT']. '\/contatos/');
    defined('INC_PATH') ? null : define('INC_PATH', HOST_PATH. 'includes/');
    defined('CORE_PATH') ? null : define('CORE_PATH', HOST_PATH. 'core/');

    date_default_timezone_set('America/Sao_Paulo');

    /**
     * Function that logs a error that happened
     * @param String $error the error
     * @return void
     */
    function log_error(String $error) {
        $logFile = HOST_PATH . '../../contactError.log';
        $errorMessage = date('Y-m-d H:i:s') . " - " . $error . PHP_EOL;
        file_put_contents($logFile, $errorMessage, FILE_APPEND);
    }

    // Loads the config file
    require_once INC_PATH . 'config.php';

    // Core classes
    require_once CORE_PATH . 'contact.php';
