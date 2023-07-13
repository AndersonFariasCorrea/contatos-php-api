<?php

    /* *
     * The database login details
     */
    define("HOST", "127.0.0.1");
    define("USER", "root");
    define("PASSWORD", "password");
    define("DATABASE", "contatos");

    /**
     * Tries connection to the database
     * */
    try { 
        $DB = new PDO('mysql:host='.HOST.';dbname='.DATABASE.';charset=utf8',USER,PASSWORD);

        $DB->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $DB->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
        $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException  $e) {
        log_error("An error occurred: " . $e->getMessage());
        exit(http_response_code(500));
    }

    define('APP_NAME', 'CONTATOS API');
