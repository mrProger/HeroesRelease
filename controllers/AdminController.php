<?php

class AdminController {
	public static function isAdmin() {
        session_start();
        echo json_encode([
            "response" => isset($_SESSION["user"]) && $_SESSION["user"]->isAdmin
        ]);
    }
}