<?php

class ShopController {
	public static function buyItem() {
        global $router;
        $data = $router->getPostRouteData();
        if ($data != null) {
            $status = QueryController::buyItemQuery(
                $data["type"],
                $data["itemId"],
                $data["money"],
                $data["donateMoney"]
            );
            echo $status;
        } else {
            echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
        }
    }

    public static function getItems() {
        $items = QueryController::getItemsQuery();
        echo $items;
    }
}