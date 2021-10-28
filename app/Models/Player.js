

export class Player{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.points = data.points
    this.questions = data.questions
    this.correct = data.correct
    this.incorrect = data.incorrect
  }

  get Template(){
    return `
    <h5>${this.name}</h5>
    <h6>${this.points}</h6>
    `
  }
}