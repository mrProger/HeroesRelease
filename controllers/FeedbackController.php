<?php

include __DIR__ . '/../models/Feedback.php';

use PHPExceptionHandler\ExceptionHandler;

class FeedbackController {
	public static function addFeedback() {
        global $router;
        $data = $router->getPostRouteData();
        if ($data != null) {
            $feedback_model = new Feedback(
                $data["login"],
                $data["email"],
                $data["theme"],
                $data["message"]
            );
            $feedback = QueryController::addFeedbackQuery(
                $feedback_model->login,
                $feedback_model->email,
                $feedback_model->theme,
                $feedback_model->message
            );
            echo $feedback;
        } else {
            echo json_encode(array("response" => "Данные не пришли или пришли некорректно"));
        }
    }
}