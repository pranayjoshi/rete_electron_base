import { Component, Input, Output, Socket } from "rete";

const numSocket = new Socket("Number");

class NumberGenerator extends Component {
  constructor() {
    super("Number Generator");
  }

  async builder(node) {
    const out = new Output("num", "Number", numSocket);
    node.addOutput(out);
  }

  async worker(node, inputs, outputs) {
    const num = Math.floor(Math.random() * 100);
    outputs["num"] = num;
    console.log("Generated number:", num);
  }
}

class SquareComponent extends Component {
  constructor() {
    super("Square");
  }

  async builder(node) {
    const inp = new Input("num", "Number", numSocket);
    const out = new Output("squared", "Squared", numSocket);
    node.addInput(inp).addOutput(out);
  }

  async worker(node, inputs, outputs) {
    const num = inputs["num"][0];
    const squared = num * num;
    outputs["squared"] = squared;
    console.log("Squared number:", squared);
  }
}

class IncrementComponent extends Component {
  constructor() {
    super("Increment");
  }

  async builder(node) {
    const inp = new Input("num", "Number", numSocket);
    const out = new Output("incremented", "Incremented", numSocket);
    node.addInput(inp).addOutput(out);
  }

  async worker(node, inputs, outputs) {
    const num = inputs["num"][0];
    const incremented = num + 1;
    outputs["incremented"] = incremented;
    console.log("Incremented number:", incremented);
  }
}

export { NumberGenerator, SquareComponent, IncrementComponent, numSocket };
