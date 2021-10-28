import { ProxyState } from "../AppState.js";
import { Question } from "../Models/Question.js";
import { jeopardyApi } from "./AxiosService.js";



class QuestionsService{


async getQuestions(numberOfQuestions) {
  const res = await jeopardyApi.get('random?count='+ numberOfQuestions)
  console.log(res.data);
  ProxyState.questions = res.data.map(q => new Question(q))
  this.setNextQuestion()
}

  async setNextQuestion(){
  // take first question from questions array and set it as an active question
  let question = ProxyState.questions.shift()
  console.log(question);
  if(!question){
    ProxyState.playingGame = false
  }
  ProxyState.activeQuestion = question
}

}


export const questionsService = new QuestionsService()