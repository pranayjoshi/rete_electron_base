import { ClassicPreset as Rete } from "rete";
import { NodeProps } from "rete-react-plugin";

class NumberDisplayComponent extends Rete.Node {
  constructor(name, socket) {
    super(name);
    this.socket = socket;
  }

  builder(node) {
    const input = new Rete.Input("number", "Number", this.socket);
    return node.addInput(input);
  }

  worker(node, inputs, outputs) {
    const number = inputs["number"][0];
    console.log("Displayed:", number);
  }

  render({ node, bindSocket, bindControl }) {
    return (
      <div className="node">
        <div className="title">Number Display</div>
        <div className="input">
          <div className="input-title">Number</div>
          {bindSocket("input", "number", this.socket)}
        </div>
      </div>
    );
  }
}

export { NumberDisplayComponent };