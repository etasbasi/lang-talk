import React, { Component } from "react";

export default class Question extends Component {
  state = {
    answers: [
      {
        user: "John",
        text: "I learn the best by reading books."
      },
      {
        user: "Sarah",
        text: "I like learning new languages by watching videos."
      }
    ]
  };

  render() {
    const answers = this.state.answers.map((answer, index) => (
      <div className="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <p>{answer.text}</p>
          </div>
        </div>
        <div className="card-image">
          <img src="/imgs/profile.png" alt="" />
          <p className="name">{answer.user}</p>
          <p className="date" />
        </div>
      </div>
    ));

    return (
      <div className="container">
        <h3>Question</h3>
        <div className="card horizontal">
          <div className="card-image">
            <img src="/imgs/profile.png" alt="" />
            <p className="name">Enes</p>
            <p className="date" />
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p>What is an effective way of studying another language?</p>
              <span className="tag">learning</span>
              <span className="tag">language</span>
            </div>
          </div>
        </div>
        <h4>Answers ({this.state.answers.length})</h4>
        {answers}
      </div>
    );
  }
}
