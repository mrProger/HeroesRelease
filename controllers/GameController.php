<?php

use PHPExceptionHandler\ExceptionHandler;

class GameController {
  public static function loadProfile() {
    session_start();
		if (isset($_SESSION["user"])) {
			echo json_encode(
				array(
					"login" => $_SESSION["user"]->login,
					"email" => $_SESSION["user"]->email,
					"money" => $_SESSION["user"]->money,
					"donateMoney" => $_SESSION["user"]->donateMoney
				)
			);
		} else {
			header("location: /login");
		}
  }

  public static function loadHero() {
    session_start();
		if (isset($_SESSION["user"])) {
			echo json_encode(
				array(
					"login" => $_SESSION["user"]->login,
					"level" => $_SESSION["user"]->level,
					"health" => $_SESSION["user"]->props["health"],
					"defense" => $_SESSION["user"]->props["defense"],
					"power" => $_SESSION["user"]->props["power"],
					"exp" => $_SESSION["user"]->exp
				)
			);
		} else {
			header("location: /login");
		}
	}

  public static function fractionSetted() {
    session_start();
		if (isset($_SESSION["user"])) {
			$fractionSetted = QueryController::fractionSettedQuery($_SESSION["user"]->login);
			if ($fractionSetted["fraction"]) {
				$_SESSION["user"]->fraction = $fractionSetted["fraction"];
			}
			echo json_encode(array("response" => $fractionSetted["response"]));
			if ($fractionSetted["response"] == "Account not found") {
				header("location: /");
			}
		} else {
			echo json_encode(array("response" => "You not in account"));
			header("location: /");
		}
  }

  public static function setFraction() {
    session_start();
		if (isset($_SESSION["user"])) {
			global $router;
			$data = $router->getPostRouteData();
			if ($data != null) {
				$fraction = QueryController::setFractionQuery(
					$_SESSION["user"]->login,
					$data["fraction"]
				);
				if ($fraction["response"] == "Fraction success setted") {
					$_SESSION["user"]->fraction = $fraction["fraction"];
				}
				echo json_encode($fraction);
				if ($fraction["response"] == "Account not found") {
					header("location: /");
				}
			} else {
				echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
			}
		} else {
			echo json_encode(array("response" => "You not in account"));
			header("location: /");
		}
  }

  public static function getInventory() {
	session_start();
	$inventory = QueryController::getInventoryQuery($_SESSION["user"]->login);
	echo $inventory;
  }

  public static function getLevelTop() {
	$levelTop = QueryController::getLevelTopQuery();
	echo $levelTop;
  }

  public static function getGoldTop() {
	$goldTop = QueryController::getGoldTopQuery();
	echo $goldTop;
  }

  public static function getWinCountTop() {
	$winCountTop = QueryController::getWinCountTopQuery();
	echo $winCountTop;
  }
}