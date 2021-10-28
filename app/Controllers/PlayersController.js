import { ProxyState } from "../AppState.js";
import { playersService } from "../Services/PlayersService.js";


function _draw(){
  const player = ProxyState.player
  let playerElm = document.getElementById('player')
  playerElm.innerHTML = player.Template

  // FIXME this is bad dont do this next line, if i see it in your code Ryan, i will be upsetty.
  // document.getElementById('player').innerHTML = ProxyState.player.Template
}

export class PlayersController{
constructor(){
  console.log('players controller loaded', playersService );
  this.setPlayer()
  ProxyState.on('player', _draw)
}

async setPlayer(){
  try {
    // @ts-ignore
    const result = await Swal.fire({
      title: "Please enter the Player's Name",
      input: 'text'
    })
    console.log(result);
    let playerName = result.value
    if(result.isConfirmed && playerName){
     await playersService.setPlayer(playerName)
    } else {
      this.setPlayer()
    }

  } catch (error) {
    console.error(error)
    // @ts-ignore
    toast(error.message, 'error', 3000)

  }
}


}