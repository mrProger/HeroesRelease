<?php

include __DIR__ . '/../models/News.php';
include __DIR__ . '/../models/Item.php';

class AdminController {
	public static function isAdmin() {
        session_start();
        echo json_encode([
            "response" => isset($_SESSION["user"]) && $_SESSION["user"]->isAdmin
        ]);
    }

    public static function addNews() {
        global $router;
        $data = $router->getPostRouteData();
        if ($data != null) {
            if (!is_dir(__DIR__ . "/../pages/news_images/")) {
                mkdir(__DIR__ . "/../pages/news_images/");
            }
            copy($_FILES["image"]["tmp_name"], __DIR__ . "/../pages/news_images/" . $_FILES["image"]["name"]);
            $news_model = new News($data["title"], $data["body"], "/pages/news_images/" . $_FILES["image"]["name"]);
            $news = QueryController::addNewsQuery(
                $news_model->title,
                $news_model->body,
                $news_model->image
            );
            echo $news;
        } else {
            echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
        }
    }

    public static function addItem() {
        global $router;
        $data = $router->getPostRouteData();
        if ($data != null) {
            if (!is_dir(__DIR__ . "/../pages/items_images/")) {
                mkdir(__DIR__ . "/../pages/items_images/");
            }
            copy($_FILES["image"]["tmp_name"], __DIR__ . "/../pages/items_images/" . $_FILES["image"]["name"]);
            $item_model = new Item($data["name"], $data["price"], $data["money_type"], "/pages/items_images/" . $_FILES["image"]["name"]);
            $item = QueryController::addItemQuery(
                $item_model->name,
                $item_model->price,
                $item_model->money_type,
                $item_model->image
            );
            echo $item;
        } else {
            echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
        }
    }
}