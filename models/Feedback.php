<?php

class Feedback extends Model {
	public string $login;
    public string $email;
    public string $theme;
    public string $message;

    public function __construct(string $login, string $email, string $theme, string $message) {
        $this->login = $login;
        $this->email = $email;
        $this->theme = $theme;
        $this->message = $message;
    } 

    public function getLogin() : string {
        return $this->login;
    }

    public function getEmail() : string {
        return $this->email;
    }

    public function getTheme() : string {
        return $this->theme;
    }

    public function getMessage() : string {
        return $this->message;
    }
}