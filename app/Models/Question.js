

export class Question{
constructor(data){
  this.question = data.question
  this.answer = data.answer
  this.points = data.value
  this.category = data.category.title
}
  get Template(){
    return `
    <div class="reveal">
    <h6>${this.question}</h6>
          <p>${this.category}</p>
          <b>${this.points}</b>
          <p class="hide ">${this.answer}</p>
          <button class="btn btn-success" onclick="app.questionsController.updatePoints(true)">Correct</button>
          <button class="btn btn-danger" onclick="app.questionsController.updatePoints(false)">Incorrect</button>
    </div>
    `
  }
}