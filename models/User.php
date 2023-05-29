<?php

class User extends Model {
    public string $login;
    public string $password;
    public string $email;
    public string $fraction;
    public int $level;
    public int $money;
    public int $donateMoney;
    public int $winCount;
    public int $exp;
    public array $props;
    public array $staffBuyed;
    public array $crystalBuyed;
    public array $staffUsed;
    public array $crystalUsed;

    public function __construct(
        string $login, 
        string $password, 
        string $email = "null",
        string $fraction = "null",
        int $level = 1,
        int $money = 100,
        int $donateMoney = 0,
        int $winCount = 0,
        int $exp = 0,
        array $props = array(
            "health" => 1000, 
            "defense" => 25, 
            "power" => 328
        ),
        array $staffBuyed = array(
            "1" => false,
            "2" => false,
            "3" => false
        ),
        array $crystalBuyed = array(
            "1" => false,
            "2" => false,
            "3" => false,
            "4" => false,
            "5" => false,
            "6" => false
        ),
        array $staffUsed = array(
            "1" => "null",
            "2" => "null"
        ),
        array $crystalUsed = array(
            "1" => "null",
            "2" => "null"
        )
    ) {
        $this->login = $login;
        $this->password = $password;
        $this->email = $email;
        $this->fraction = $fraction;
        $this->level = $level;
        $this->money = $money;
        $this->donateMoney = $donateMoney;
        $this->winCount = $winCount;
        $this->exp = $exp;
        $this->props = $props;
        $this->staffBuyed = $staffBuyed;
        $this->crystalBuyed = $crystalBuyed;
        $this->staffUsed = $staffUsed;
        $this->crystalUsed = $crystalUsed;
    }

    public function getLogin() : string {
        return $this->login;
    }

    public function getPassword() : string {
        return $this->password;
    }

    public function getEmail() : string {
        return $this->email;
    }

    public function getFraction() : string {
        return $this->fraction;
    }

    public function getLevel() : int {
        return $this->level;
    }

    public function getMoney() : int {
        return $this->money;
    }

    public function getDonateMoney() : int {
        return $this->donateMoney;
    }

    public function getWinCount() : int {
        return $this->winCount;
    }

    public function getExp() : int {
        return $this->exp;
    }

    public function getProps() : array {
        return $this->props;
    }

    public function getStaffBuyed() : array {
        return $this->staffBuyed;
    }

    public function getCrystalBuyed() : array {
        return $this->crystalBuyed;
    }

    public function getStaffUsed() : array {
        return $this->staffUsed;
    }

    public function getCrystalUsed() : array {
        return $this->crystalUsed;
    }
}