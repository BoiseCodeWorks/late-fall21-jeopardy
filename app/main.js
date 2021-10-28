import { PlayersController } from "./Controllers/PlayersController.js";
import { QuestionsController } from "./Controllers/QuestionsController.js";


class App {
  playersController = new PlayersController()

  questionsController = new QuestionsController()
}

window["app"] = new App();
