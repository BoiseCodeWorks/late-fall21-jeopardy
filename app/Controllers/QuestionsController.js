import { ProxyState } from "../AppState.js";
import { playersService } from "../Services/PlayersService.js";
import { questionsService } from "../Services/QuestionsService.js";
import { toast } from "../Utils/Notifier.js";


function _draw(){
  console.log('drawing the question');
const question = ProxyState.activeQuestion
const questionElm = document.getElementById('question')
questionElm.innerHTML = question.Template
}


async function _startGame(){
  try {
    if(ProxyState.playingGame){
    
      console.log('the game has started');
      // @ts-ignore
      let result = await Swal.fire({
      title: "how many questions would you like",
      input: 'number'
    })
    const questions = result.value
    if(result.isConfirmed && questions> 0){
      questionsService.getQuestions(questions)
    } else {
      _startGame()
    }

  } else {
    debugger
    await _endGame()
  }

  } catch (error) {
    console.error(error)
    toast(error.message, 'error', 3000)
  }

}
async function _endGame(){
  // @ts-ignore
  let result = await Swal.fire({
    title: 'Game Over Play Again?',
    icon: 'question',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Heck no',
    showCancelButton: true,
  })
  debugger
  if(result.isConfirmed){
    // FIXME DONT directly modify ProxyState in controller
    ProxyState.playingGame = true
    _startGame()
  } else {
    window.close()
  }
}

export class QuestionsController{
  constructor(){
    console.log('q contorller loaded', questionsService);
    ProxyState.on('playingGame', _startGame)
    ProxyState.on('activeQuestion', _draw)
  }


  async updatePoints(isCorrect){
    try {
      playersService.updatePoints(isCorrect)
      
    } catch (error) {
      console.error(error)
      toast(error.message, 'error', 3000)
    }
  }


}