<?php

use PHPTemplater\Template;
use PHPView\View;
use PHPExceptionHandler\ExceptionHandler;

class PageController {
	public static function index() {
        $template = new Template(__DIR__ . "/../pages/index.html");
        echo View::createFromTemplate($template);
    }

    public static function login() {
        $template = new Template(__DIR__ . "/../pages/login.html");
        echo View::createFromTemplate($template);
    }

    public static function registration() {
        $template = new Template(__DIR__ . "/../pages/registration.html");
        echo View::createFromTemplate($template);
    }

    public static function news() {
        $template = new Template(__DIR__ . "/../pages/news.html");
        echo View::createFromTemplate($template);
    }

    public static function feedback() {
        $template = new Template(__DIR__ . "/../pages/feedback.html");
        echo View::createFromTemplate($template);
    }
	
	public static function profile() {
		$template = new Template(__DIR__ . "/../pages/profile.html");
		echo View::createFromTemplate($template);
	}
	
	public static function setFraction() {
		$template = new Template(__DIR__ . "/../pages/set-fraction.html");
		echo View::createFromTemplate($template);
	}

    public static function hero() {
        $template = new Template(__DIR__ . "/../pages/hero.html");
        echo View::createFromTemplate($template);
    }

    public static function shop() {
        $template = new Template(__DIR__ . "/../pages/shop.html");
        echo View::createFromTemplate($template);
    }

    public static function rating() {
        $template = new Template(__DIR__ . "/../pages/rating.html");
        echo View::createFromTemplate($template);
    }

    public static function battle() {
        $template = new Template(__DIR__ . "/../pages/battle.html");
        echo View::createFromTemplate($template);
    }

    public static function debugSessionList() {
        session_start();
        echo json_encode($_SESSION);
    }
}