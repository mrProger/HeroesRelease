<?php

class QueryController {
	public static function loginQuery(string $login, string $password) {
		global $orm;
		$orm->connect();
		$user = R::find("users", "login = ? AND password = ?", [$login, $password]);
		if (count($user) == 0) {
			return json_encode(array("response" => "Account for login not found"));
		}
		return $user[array_key_first($user)];
	}

	public static function registrationQuery(
		string $login, 
		string $password, 
		string $email, 
		string $fraction, 
		int $level, 
		int $money, 
		int $donateMoney, 
		int $winCount,
		int $exp,
		array $props,
		array $staffBuyed,
		array $crystalBuyed,
		array $staffUsed,
		array $crystalUsed,
		bool $isAdmin
	) {
		global $orm;
		$orm->connect();
		$user = R::find("users", "login = ?", [$login]);
		if (count($user) > 0) {
			return json_encode(array("response" => "Account already exists"));
		}
		$user = R::dispense("users");
		$user->login = $login;
		$user->password = $password;
		$user->email = $email;
		$user->fraction = $fraction;
		$user->level = $level;
		$user->money = $money;
		$user->donate_money = $donateMoney;
		$user->win_count = $winCount;
		$user->exp = $exp;
		$user->health = $props["health"];
		$user->defense = $props["defense"];
		$user->power = $props["power"];
		$user->staff1_buyed = $staffBuyed["1"];
		$user->staff2_buyed = $staffBuyed["2"];
		$user->staff3_buyed = $staffBuyed["3"];
		$user->crystall1_buyed = $crystalBuyed["1"];
		$user->crystall2_buyed = $crystalBuyed["2"];
		$user->crystall3_buyed = $crystalBuyed["3"];
		$user->crystall4_buyed = $crystalBuyed["4"];
		$user->crystall5_buyed = $crystalBuyed["5"];
		$user->crystall6_buyed = $crystalBuyed["6"];
		$user->staff1_used = $staffUsed["1"];
		$user->staff2_used = $staffUsed["2"];
		$user->crystal1_used = $crystalUsed["1"];
		$user->crystal2_used = $crystalUsed["2"];
		$user->is_admin = $isAdmin;
		R::store($user);
		return array(
			"response" => "Account success registered"
		);
	}

	public static function fractionSettedQuery(string $login) {
		global $orm;
		$orm->connect();
		$user = R::find("users", "login = ?", [$login]);
		if (count($user) == 0) {
			return array("response" => "Account not found");
		}
		$user = $user[array_key_first($user)];
		return array(
			"response" => $user->fraction != "null",
			"fraction" => $user->fraction
		);
	}

	public static function setFractionQuery(string $login, string $fraction) {
		global $orm;
		$orm->connect();
		$user = R::find("users", "login = ?", [$login]);
		if (count($user) == 0) {
			return array("response" => "Account not found");
		}
		$id = array_key_first($user);
		$user = $user[array_key_first($user)];
		if ($user->fraction != "null") {
			return array("response" => "Fraction already setted");
		}
		$user = R::load("users", $id);
		$user->fraction = $fraction;
		R::store($user);
		return array(
			"response" => "Fraction success setted",
			"fraction" => $user->fraction
		);
	}

	public static function addFeedbackQuery(string $login, string $email, string $theme, string $message) {
		global $orm;
		$orm->connect();
		$feedback = R::dispense("feedbacks");
		$feedback->login = $login;
		$feedback->email = $email;
		$feedback->theme = $theme;
		$feedback->message = $message;
		R::store($feedback);
		return json_encode($feedback);
	}

	public static function buyItemQuery(string $type, int $itemId) {
		session_start();
		global $orm;
		$orm->connect();
		$user = R::find("users", "login = ? AND password = ?", [
			$_SESSION["user"]->login,
			$_SESSION["user"]->password
		]);
		$user = $user[array_key_first($user)];
		if ($user == null) {
			return json_encode(array("response" => "Account not found"));
		}
		if ($type == "staff") {
			switch ($itemId) {
				case "1":
					if ($user->staff1_buyed) {
						if ($user->staff1_used != "1" && $user->staff2_used != "1") {
							if ($user->staff1_used == "null") {
								$user->staff1_used = "1";
							} else if ($user->staff2_used == "null") {
								$user->staff2_used = "1";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->staff1_used = "1";
										break;
									case 2:
										$user->staff2_used = "1";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->staffUsed["1"] = $user->staff1_used;
							$_SESSION["user"]->staffUsed["2"] = $user->staff2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->staff1_buyed = true;
					$user->money -= 4;
					$_SESSION["user"]->staffBuyed["1"] = true;
					$_SESSION["user"]->money -= 4;
					if ($user->staff1_used != "1" && $user->staff2_used != "1") {
						if ($user->staff1_used == "null") {
							$user->staff1_used = "1";
						} else if ($user->staff2_used == "null") {
							$user->staff2_used = "1";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->staff1_used = "1";
									break;
								case 2:
									$user->staff2_used = "1";
									break;
							}
						}
						$_SESSION["user"]->staffUsed["1"] = $user->staff1_used;
						$_SESSION["user"]->staffUsed["2"] = $user->staff2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
				case "2":
					if ($user->staff2_buyed) {
						if ($user->staff1_used != "2" && $user->staff2_used != "2") {
							if ($user->staff1_used == "null") {
								$user->staff1_used = "2";
							} else if ($user->staff2_used == "null") {
								$user->staff2_used = "2";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->staff1_used = "2";
										break;
									case 2:
										$user->staff2_used = "2";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->staffUsed["1"] = $user->staff1_used;
							$_SESSION["user"]->staffUsed["2"] = $user->staff2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->donate_money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->staff2_buyed = true;
					$user->donate_money -= 4;
					$_SESSION["user"]->staffBuyed["2"] = true;
					$_SESSION["user"]->donateMoney -= 4;
					if ($user->staff1_used != "2" && $user->staff2_used != "2") {
						if ($user->staff1_used == "null") {
							$user->staff1_used = "2";
						} else if ($user->staff2_used == "null") {
							$user->staff2_used = "2";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->staff1_used = "2";
									break;
								case 2:
									$user->staff2_used = "2";
									break;
							}
						}
						$_SESSION["user"]->staffUsed["1"] = $user->staff1_used;
						$_SESSION["user"]->staffUsed["2"] = $user->staff2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
				case "3":
					if ($user->staff3_buyed) {
						if ($user->staff1_used != "3" && $user->staff2_used != "3") {
							if ($user->staff1_used == "null") {
								$user->staff1_used = "3";
							} else if ($user->staff2_used == "null") {
								$user->staff2_used = "3";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->staff1_used = "3";
										break;
									case 2:
										$user->staff2_used = "3";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->staffUsed["1"] = $user->staff1_used;
							$_SESSION["user"]->staffUsed["2"] = $user->staff2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->money < 4) {
						return json_encode(array("response" => "Not enough money", $user->money));
					}
					$user->staff3_buyed = true;
					$user->money -= 4;
					$_SESSION["user"]->staffBuyed["3"] = true;
					$_SESSION["user"]->money -= 4;
					if ($user->staff1_used != "3" && $user->staff2_used != "3") {
						if ($user->staff1_used == "null") {
							$user->staff1_used = "3";
						} else if ($user->staff2_used == "null") {
							$user->staff2_used = "3";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->staff1_used = "3";
									break;
								case 2:
									$user->staff2_used = "3";
									break;
							}
						}
						$_SESSION["user"]->staffUsed["1"] = $user->staff1_used;
						$_SESSION["user"]->staffUsed["2"] = $user->staff2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
			}
		} else if ($type == "crystal") {
			switch ($itemId) {
				case "1":
					if ($user->crystal1_buyed) {
						if ($user->crystal1_used != "1" && $user->crystal2_used != "1") {
							if ($user->crystal1_used == "null") {
								$user->crystal1_used = "1";
							} else if ($user->crystal2_used == "null") {
								$user->crystal2_used = "1";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->crystal1_used = "1";
										break;
									case 2:
										$user->crystal2_used = "1";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
							$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->donate_money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->crystal1_buyed = true;
					$user->donate_money -= 4;
					$_SESSION["user"]->crystalBuyed["1"] = true;
					$_SESSION["user"]->donate_money -= 4;
					if ($user->crystal1_used != "1" && $user->crystal2_used != "1") {
						if ($user->crystal1_used == "null") {
							$user->crystal1_used = "1";
						} else if ($user->crystal2_used == "null") {
							$user->crystal2_used = "1";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->crystal1_used = "1";
									break;
								case 2:
									$user->crystal2_used = "1";
									break;
							}
						}
						$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
						$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
				case "2":
					if ($user->crystal2_buyed) {
						if ($user->crystal1_used != "2" && $user->crystal2_used != "2") {
							if ($user->crystal1_used == "null") {
								$user->crystal1_used = "2";
							} else if ($user->crystal2_used == "null") {
								$user->crystal2_used = "2";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->crystal1_used = "2";
										break;
									case 2:
										$user->crystal2_used = "2";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
							$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->donate_money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->crystal2_buyed = true;
					$user->donate_money -= 4;
					$_SESSION["user"]->crystalBuyed["2"] = true;
					$_SESSION["user"]->donate_money -= 4;
					if ($user->crystal1_used != "2" && $user->crystal2_used != "2") {
						if ($user->crystal1_used == "null") {
							$user->crystal1_used = "2";
						} else if ($user->crystal2_used == "null") {
							$user->crystal2_used = "2";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->crystal1_used = "2";
									break;
								case 2:
									$user->crystal2_used = "2";
									break;
							}
						}
						$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
						$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
				case "3":
					if ($user->crystal3_buyed) {
						if ($user->crystal1_used != "3" && $user->crystal2_used != "3") {
							if ($user->crystal1_used == "null") {
								$user->crystal1_used = "3";
							} else if ($user->crystal2_used == "null") {
								$user->crystal2_used = "3";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->crystal1_used = "3";
										break;
									case 2:
										$user->crystal2_used = "3";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
							$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->donate_money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->crystal3_buyed = true;
					$user->donate_money -= 4;
					$_SESSION["user"]->crystalBuyed["3"] = true;
					$_SESSION["user"]->donate_money -= 4;
					if ($user->crystal1_used != "3" && $user->crystal2_used != "3") {
						if ($user->crystal1_used == "null") {
							$user->crystal1_used = "3";
						} else if ($user->crystal2_used == "null") {
							$user->crystal2_used = "3";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->crystal1_used = "3";
									break;
								case 2:
									$user->crystal2_used = "3";
									break;
							}
						}
						$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
						$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
				case "4":
					if ($user->crystal4_buyed) {
						if ($user->crystal1_used != "4" && $user->crystal2_used != "4") {
							if ($user->crystal1_used == "null") {
								$user->crystal1_used = "4";
							} else if ($user->crystal2_used == "null") {
								$user->crystal2_used = "4";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->crystal1_used = "4";
										break;
									case 2:
										$user->crystal2_used = "4";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
							$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->donate_money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->crystal4_buyed = true;
					$user->donate_money -= 4;
					$_SESSION["user"]->crystalBuyed["4"] = true;
					$_SESSION["user"]->donate_money -= 4;
					if ($user->crystal1_used != "4" && $user->crystal2_used != "4") {
						if ($user->crystal1_used == "null") {
							$user->crystal1_used = "4";
						} else if ($user->crystal2_used == "null") {
							$user->crystal2_used = "4";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->crystal1_used = "4";
									break;
								case 2:
									$user->crystal2_used = "4";
									break;
							}
						}
						$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
						$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
				case "5":
					if ($user->crystal5_buyed) {
						if ($user->crystal1_used != "5" && $user->crystal2_used != "5") {
							if ($user->crystal1_used == "null") {
								$user->crystal1_used = "5";
							} else if ($user->crystal2_used == "null") {
								$user->crystal2_used = "5";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->crystal1_used = "5";
										break;
									case 2:
										$user->crystal2_used = "5";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
							$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->donate_money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->crystal5_buyed = true;
					$user->donate_money -= 4;
					$_SESSION["user"]->crystalBuyed["5"] = true;
					$_SESSION["user"]->donate_money -= 4;
					if ($user->crystal1_used != "5" && $user->crystal2_used != "5") {
						if ($user->crystal1_used == "null") {
							$user->crystal1_used = "5";
						} else if ($user->crystal2_used == "null") {
							$user->crystal2_used = "5";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->crystal1_used = "5";
									break;
								case 2:
									$user->crystal2_used = "5";
									break;
							}
						}
						$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
						$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
				case "6":
					if ($user->crystal6_buyed) {
						if ($user->crystal1_used != "6" && $user->crystal2_used != "6") {
							if ($user->crystal1_used == "null") {
								$user->crystal1_used = "6";
							} else if ($user->crystal2_used == "null") {
								$user->crystal2_used = "6";
							} else {
								$slot = rand(1, 2);
								switch ($slot) {
									case 1:
										$user->crystal1_used = "6";
										break;
									case 2:
										$user->crystal2_used = "6";
										break;
								}
							}
							R::store($user);
							$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
							$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
						}
						return json_encode(array("response" => "Item already buyed"));
					}
					if ($user->donate_money < 4) {
						return json_encode(array("response" => "Not enough money"));
					}
					$user->crystal6_buyed = true;
					$user->donate_money -= 4;
					$_SESSION["user"]->crystalBuyed["6"] = true;
					$_SESSION["user"]->donate_money -= 4;
					if ($user->crystal1_used != "6" && $user->crystal2_used != "6") {
						if ($user->crystal1_used == "null") {
							$user->crystal1_used = "6";
						} else if ($user->crystal2_used == "null") {
							$user->crystal2_used = "6";
						} else {
							$slot = rand(1, 2);
							switch ($slot) {
								case 1:
									$user->crystal1_used = "6";
									break;
								case 2:
									$user->crystal2_used = "6";
									break;
							}
						}
						$_SESSION["user"]->crystalUsed["1"] = $user->crystal1_used;
						$_SESSION["user"]->crystalUsed["2"] = $user->crystal2_used;
					}
					R::store($user);
					return json_encode(array("response" => "Item success buyed"));
			}
		}
	}

	public static function getInventoryQuery(string $login) {
		global $orm;
		$orm->connect();
		$user = R::find("users", "login = ?", [$login]);
		$user = $user[array_key_first($user)];
		return json_encode(array(
			"staff1" => $user->staff1_used,
			"staff2" => $user->staff2_used,
			"crystal1" => $user->crystal1_used,
			"crystal2" => $user->crystal2_used
		));
	}

	public static function getLevelTopQuery() {
		global $orm;
		$orm->connect();
		$levelTop = R::getAll("SELECT login, level FROM users ORDER BY level DESC LIMIT 3");
		return json_encode($levelTop);
	}

	public static function getGoldTopQuery() {
		global $orm;
		$orm->connect();
		$goldTop = R::getAll("SELECT login, donate_money FROM users ORDER BY donate_money DESC LIMIT 3");
		return json_encode($goldTop);
	}

	public static function getWinCountTopQuery() {
		global $orm;
		$orm->connect();
		$winCountTop = R::getAll("SELECT login, win_count FROM users ORDER BY win_count DESC LIMIT 3");
		return json_encode($winCountTop);
	}

	public static function generateEnemyQuery() {
		session_start();
		$healthArr = array(800, 1000, 1500);
		$powerArr = array(200, 300, 400);
		$defenseArr = array(100, 200, 300);
		$expRewards = array(1, 2, 3);
		$moneyRewards = array(1, 2, 3);
		return json_encode(array(
			"name" => "Узник",
			"health" => $healthArr[rand(0, 2)],
			"power" => $powerArr[rand(0, 2)],
			"defense" => $defenseArr[rand(0, 2)],
			"expRewards" => $expRewards[rand(0, 2)],
			"moneyRewards" => $moneyRewards[rand(0, 2)]
		));
	}

	public static function endBattleQuery(string $target, int $moneyRewards, int $expRewards) {
		session_start();
		global $orm;
		$orm->connect();
		$user = R::find("users", "login = ? AND password = ?", [
			$_SESSION["user"]->login,
			$_SESSION["user"]->password
		]);
		$user = $user[array_key_first($user)];
		$user->money += $moneyRewards;
		$user->exp += $expRewards;

		if ($target === "enemy") {
			$user->win_count += 1;
		}

		if ($user->exp >= $user->level * 5) {
			$user->level += 1;
		}

		R::store($user);

		$_SESSION["user"]->money = $user->money;
		$_SESSION["user"]->exp = $user->exp;
		$_SESSION["user"]->level = $user->level;
		$_SESSION["user"]->winCount = $user->win_count;
	}

	public static function getItemsQuery() {
		global $orm;
		$orm->connect();
		$items = R::findAll("items");
		if ($items == null) {
			return json_encode(array("response" => "Предметы не найдены"));
		}
		return json_encode($items);
	}

	public static function getNewsQuery() {
		global $orm;
		$orm->connect();
		$news = R::findAll("news");
		if ($news == null) {
			return json_encode(array("response" => "Новости не найдены"));
		}
		return json_encode($news);
	}

	public static function addNewsQuery(string $title, string $body, string $image) {
		global $orm;
		$orm->connect();
		$news = R::dispense("news");
		$news->title = $title;
		$news->body = $body;
		$news->image = $image;
		R::store($news);
		return json_encode(["response" => "Новость успешно добавлена"]);
	}

	public static function addItemQuery(string $name, int $price, string $money_type, string $image) {
		global $orm;
		$orm->connect();
		$item = R::dispense("items");
		$item->name = $name;
		$item->price = $price;
		$item->money_type = $money_type;
		$item->image = $image;
		R::store($item);
		return json_encode(["response" => "Предмет успешно добавлен"]);
	}
}