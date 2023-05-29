<?php

class ShopController {
	public static function buyItem() {
        global $router;
        $data = $router->getPostRouteData();
        if ($data != null) {
            $status = QueryController::buyItemQuery(
                $data["type"],
                $data["itemId"]
            );
            echo $status;
        } else {
            echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
        }
    }
}