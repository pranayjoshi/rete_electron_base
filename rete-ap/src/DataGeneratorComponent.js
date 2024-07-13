import { ClassicPreset as Rete } from "rete";
import { NodeProps } from "rete-react-plugin";

class DataGeneratorComponent extends Rete.Node {
  constructor(name, socket) {
    super(name);
    this.socket = socket;
  }

  builder(node) {
    const out = new Rete.Output("number", "Number", this.socket);
    return node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    const number = Math.floor(Math.random() * 100);
    outputs["number"] = number;
    console.log("Generated:", number);
  }

  render({ node, bindSocket, bindControl }) {
    return (
      <div className="node">
        <div className="title">Data Generator</div>
        <div className="output">
          <div className="output-title">Number</div>
          {bindSocket("output", "number", this.socket)}
        </div>
      </div>
    );
  }
}

export { DataGeneratorComponent };