<?php

class News extends Model {
	public string $title;
    public string $body;
    public string $image;

    public function __construct($title, $body, $image) {
        $this->title;
        $this->body;
        $this->image;
    }

    public function getTitle() : string {
        return $this->title;
    }

    public function getBody() : string {
        return $this->body;
    }

    public function getImage() : string {
        return $this->image;
    }
}