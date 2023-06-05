<?php

include __DIR__ . '/../models/User.php';
use PHPHash\Hash;

use PHPExceptionHandler\ExceptionHandler;

class AuthController {
	public static function login() {
		session_start();
		if (isset($_SESSION["user"])) {
			echo json_encode(array("response" => "You already in account"));
			return;
		}

		global $router;
		$data = $router->getPostRouteData();
		if ($data != null) {
			$user_model = new User($data["login"], Hash::sha256($data["password"], "", 1));
			$user = QueryController::loginQuery(
				$user_model->login,
				$user_model->password
			);
			if (isset($user->login)) {
				$_SESSION["user"] = new User(
					$user->login,
					$user->password,
					$user->email,
					$user->fraction,
					$user->level,
					$user->money,
					$user->donate_money,
					$user->win_count,
					$user->exp,
					array(
						"health" => $user->health,
						"defense" => $user->defense,
						"power" => $user->power
					),
					array(
						"1" => $user->staff1_buyed,
						"2" => $user->staff2_buyed,
						"3" => $user->staff3_buyed
					),
					array(
						"1" => $user->crystal1_buyed,
						"2" => $user->crystal2_buyed,
						"3" => $user->crystal3_buyed,
						"4" => $user->crystal4_buyed,
						"5" => $user->crystal5_buyed,
						"6" => $user->crystal6_buyed
					),
					array(
						"1" => $user->staff1_used,
						"2" => $user->staff2_used
					),
					array(
						"1" => $user->crystal1_used,
						"2" => $user->crystal2_used
					)
				);
			}
			echo $user;
		} else {
			echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
		}
	}

	public static function registration() {
		session_start();
		if (isset($_SESSION["user"])) {
			echo json_encode(array("response" => "You already in account"));
			return;
		}

		global $router;
		$data = $router->getPostRouteData();
		if ($data != null) {
			$user_model = new User(
				$login=$data["login"], 
				$password=Hash::sha256($data["password"], "", 1),
				$email=$data["email"]
			);
			$user = QueryController::registrationQuery(
				$user_model->login,
				$user_model->password,
				$user_model->email,
				$user_model->fraction,
				$user_model->level,
				$user_model->money,
				$user_model->donateMoney,
				$user_model->winCount,
				$user_model->exp,
				$user_model->props,
				$user_model->staffBuyed,
				$user_model->crystalBuyed,
				$user_model->staffUsed,
				$user_model->crystalUsed
			);
			if ($user->response == "Account success registered") {
				$_SESSION["user"] = $user_model;
			}
			echo json_encode($user_model);
		} else {
			echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
		}
	}

	public static function logout() {
		session_start();
		session_unset();
	}

	public static function isAuthorized() {
		session_start();
		echo json_encode(array("response" => isset($_SESSION["user"])));
	}
}
