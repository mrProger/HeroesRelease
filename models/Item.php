<?php

class Item extends Model {
	public string $name;
    public int $price;
    public string $money_type;
    public string $image;

    public function __construct($name, $price, $money_type, $image) {
        $this->name;
        $this->price;
        $this->money_type;
        $this->image;
    }

    public function getName() : string {
        return $this->name;
    }

    public function getPrice() : int {
        return $this->price;
    }

    public function getMoneyType() : string {
        return $this->money_type;
    }

    public function getImage() : string {
        return $this->image;
    }
}