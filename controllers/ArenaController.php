<?php

class ArenaController {
	public static function generateEnemy() {
        $enemy = QueryController::generateEnemyQuery();
        echo $enemy;
    }

    public static function endBattle() {
        global $router;
        $data = $router->getPostRouteData();
        if ($data != null) {
            QueryController::endBattleQuery($data["target"], $data["moneyRewards"], $data["expRewards"]);
            echo null;
        } else {
            echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
        }
    }
}