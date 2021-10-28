import { ProxyState } from '../AppState.js';
import { Player } from '../Models/Player.js';
import { sandboxApi } from './AxiosService.js';
import { questionsService } from './QuestionsService.js';



class PlayersService{
  async updatePoints(isCorrect) {
    let player = ProxyState.player
    let question = ProxyState.activeQuestion
    // update the player information
    player.questions++
    if(isCorrect){
      player.points += question.points
      player.correct++
    } else{
      player.points -= question.points
      player.incorrect++
    }
    // Update player in sandbox api
    const res = await sandboxApi.put('players/'+ player.id, player)
    console.log('updated player',res.data);
    // these next two work identically, but when using res.data it needs to be cast back into a player
    ProxyState.player = player
    // ProxyState.player = new Player(res.data)
    questionsService.setNextQuestion()
  }
  constructor(){
    console.log("players service loaded");
  }
  async setPlayer(playerName) {
    // Get the player from sandbox api and set it if it exists, otherwise create one
    const res = await sandboxApi.get('players?name=' + playerName)
    console.log(res.data);
    let player = res.data[0]
    if(!player){
      // Create player if one doesn't exist
      player = await this.createPlayer(playerName)
    } 
    // set either the gotten player from the get or create to the state
      ProxyState.player = new Player(player)
      ProxyState.playingGame = true
  }

  async createPlayer(playerName){
    // Create player in sandbox api
    const res = await sandboxApi.post('players', {name: playerName})
    console.log(res.data);
    return res.data
  }

}

export const playersService = new PlayersService()