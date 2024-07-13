import { ClassicPreset as Rete } from "rete";
import { NodeProps } from "rete-react-plugin";

class AddOneComponent extends Rete.Node {
  constructor(name, socket) {
    super(name);
    this.socket = socket;
  }

  builder(node) {
    const input = new Rete.Input("number", "Number", this.socket);
    const output = new Rete.Output("result", "Result", this.socket);
    return node.addInput(input).addOutput(output);
  }

  worker(node, inputs, outputs) {
    const number = inputs["number"][0];
    outputs["result"] = number + 1;
  }

  render({ node, bindSocket, bindControl }) {
    return (
      <div className="node">
        <div className="title">Add One</div>
        <div className="input">
          <div className="input-title">Number</div>
          {bindSocket("input", "number", this.socket)}
        </div>
        <div className="output">
          <div className="output-title">Result</div>
          {bindSocket("output", "result", this.socket)}
        </div>
      </div>
    );
  }
}

export { AddOneComponent };