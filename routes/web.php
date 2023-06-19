<?php

$router->get("/", "PageController::index");
$router->get("login", "PageController::login");
$router->get("registration", "PageController::registration");
$router->get("news", "PageController::news");
$router->get("feedback", "PageController::feedback");
$router->get("profile", "PageController::profile");
$router->get("setFraction", "PageController::setFraction");
$router->get("hero", "PageController::hero");
$router->get("shop", "PageController::shop");
$router->get("rating", "PageController::rating");
$router->get("battle", "PageController::battle");
$router->get("admin", "PageController::admin");

$router->post("api/v1/login", "AuthController::login");
$router->post("api/v1/registration", "AuthController::registration");
$router->post("api/v1/logout", "AuthController::logout");
$router->post("api/v1/isAuthorized", "AuthController::isAuthorized");
$router->post("api/v1/buyItem", "ShopController::buyItem");
$router->get("api/v1/getItems", "ShopController::getItems");
$router->post("api/v1/addFeedback", "FeedbackController::addFeedback");
$router->post("api/v1/fractionSetted", "GameController::fractionSetted");
$router->post("api/v1/setFraction", "GameController::setFraction");
$router->post("api/v1/loadProfile", "GameController::loadProfile");
$router->post("api/v1/loadHero", "GameController::loadHero");
$router->post("api/v1/getInventory", "GameController::getInventory");
$router->post("api/v1/getLevelTop", "GameController::getLevelTop");
$router->post("api/v1/getGoldTop", "GameController::getGoldTop");
$router->post("api/v1/getWinCountTop", "GameController::getWinCountTop");
$router->get("api/v1/getNews", "GameController::getNews");
$router->post("api/v1/generateEnemy", "ArenaController::generateEnemy");
$router->post("api/v1/endBattle", "ArenaController::endBattle");

$router->get("api/v1/admin/isAdmin", "AdminController::isAdmin");
$router->post("api/v1/admin/addNews", "AdminController::addNews");
$router->post("api/v1/admin/addItem", "AdminController::addItem");