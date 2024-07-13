import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { Node, Socket, Control } from "rete-react-render-plugin";

import { DataGeneratorComponent } from "./DataGeneratorComponent";
import { NumberDisplayComponent } from "./NumberDisplayComponent";
import { SquareComponent } from "./SquareComponent";
import { AddOneComponent } from "./AddOneComponent";

const socket = new ClassicPreset.Socket("number");

function createEditor(container) {
  const editor = new NodeEditor();
  const area = new AreaPlugin(container);
  const connection = new ConnectionPlugin();

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);

  AreaExtensions.simpleNodesOrder(area);

  const dataGenerator = new DataGeneratorComponent("Data Generator", socket);
  const numberDisplay = new NumberDisplayComponent("Number Display", socket);
  const square = new SquareComponent("Square", socket);
  const addOne = new AddOneComponent("Add One", socket);

  editor.addNode(dataGenerator);
  editor.addNode(numberDisplay);
  editor.addNode(square);
  editor.addNode(addOne);

  return {
    destroy: () => area.destroy()
  };
}

function ReteEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = createEditor(editorRef.current);

    return () => {
      editor.destroy();
    };
  }, []);

  return <div ref={editorRef} style={{ width: "100%", height: "100vh" }} />;
}

export default ReteEditor;