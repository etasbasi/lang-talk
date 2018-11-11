import React, { Component } from "react";
import M from "materialize-css";

export default class Feed extends Component {
  state = {
    questions: [
      {
        user: "Enes",
        text: "What is an effective way of studying another language?",
        tags: ["learning", "language"]
      },
      {
        user: "John",
        text: "How long did it take you guys to learn a second language?",
        tags: ["second-language", "language"]
      },
      {
        user: "Sarah",
        text: "What language do you speak in Azerbaijan?",
        tags: ["azerbaijan", "language"]
      }
    ]
  };

  render() {
    const cards = this.state.questions.map((card, index) => (
      <div key={index} className="card horizontal">
        <div className="card-image">
          <img src="/imgs/profile.png" alt="" />
          <p className="name">{card.user}</p>
          <p className="date">{card.date}</p>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>{card.text}</p>
            {card.tags.map((tag, index) => (
              <span className="tag">{tag}</span>
            ))}
          </div>
          <div class="card-action">
            <a href="#">View</a>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <h3>Feed</h3>
        <div className="card-container">{cards}</div>
      </div>
    );
  }
}
