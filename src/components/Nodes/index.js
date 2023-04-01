import ReactFlow, {
  addEdge, applyEdgeChanges,
  applyNodeChanges, MiniMap,
  useNodesState,
  useEdgesState,
  Controls, Background, ReactFlowProvider,
  useReactFlow, Handle,
} from 'reactflow';
import { useState, useCallback, useRef, useEffect } from 'react';
import React from 'react';
import $, { data } from 'jquery'


import { nodes as initialNodes } from './nodes';
import initialEdges from './edges.js';
import Sidebar from './Sidebar';
import './index.css';
import 'reactflow/dist/style.css';
import './text-updater-node.css';




let id = 0;
const getId = () => `node_${id++}`;
const nodeTypes = { textUpdater: TextUpdaterNode };

const nodeColor = (node) => {
  switch (node.type) {
    case 'group':
      return '#6ede87';
    case 'output':
      return '#ff0072';
    case 'nervou':
      return '#a4c2f4'
    case 'textUpdater':
      return '#FFF0F5'
    default:
      return '#ffffff';
  }
};


function InputElement(props) {


  const onClickinput = function () {
    let inputValue = document.getElementById("inputValue")
    inputValue.value = null
    props.inputFunShow("none")
  }
  return (
    <>

      <div className="updatenode__controls" style={{ display: props.inputShow, top: props.inputTop, left: props.inputLeft }}>
        <label>label:</label>
        <input id='inputValue' onChange={(evt) => props.inputFunNodeLabel(evt.target.value)} />
        <button onClick={onClickinput} >输入</button>
      </div>
    </>
  )
}


function TextUpdaterNode({ id, data, isConnectable }) {
  return (
    <div className="node_Package_outline">
      <div>
        <img src={require('../manul/p_1.png')} style={{
          width: 50, height: 50, position: "absolute",
          marginLeft: -24, marginTop: -28,
          zindex: 1,
        }} />
        <div id={id} style={{ width: 40, height: 40, position: "absolute", marginLeft: -20, marginTop: -20, }} >{data.label}</div>
      </div>
      <ul>
        <li>
          <Handle id="a" type="target" isConnectable={isConnectable} />
          <div >
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_1' id={data.a1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -20, marginTop: -12, }} >{data.a1_label}</div>
          </div>
        </li>
        <li>
          <Handle id="b" type='source' isConnectable={isConnectable} style={{ background: '#e43816' }} />
          <div>
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_2' id={data.b1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -17, marginTop: -13, }} >{data.b1_label}</div>
          </div>
        </li>
        <li>
          <Handle id="c" type="target" isConnectable={isConnectable} />
          <div>
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_3' id={data.c1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -15, marginTop: -16, }} >{data.c1_label}</div>
          </div>
        </li>
        <li>
          <Handle id="d" type='source' isConnectable={isConnectable} style={{ background: '#e43816' }} />
          <div>
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_4' id={data.d1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -16, marginTop: -19, }} >{data.d1_label}</div>
          </div>
        </li>
        <li>
          <Handle id="e" type="target" isConnectable={isConnectable} />
          <div>
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_5' id={data.e1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -20, marginTop: -21, }} >{data.e1_label}</div>
          </div>
        </li>
        <li>
          <Handle id="f" type='source' isConnectable={isConnectable} style={{ background: '#e43816' }} />

          <div>
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_6' id={data.f1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -23, marginTop: -20, }} >{data.f1_label}</div>
          </div>
        </li>
        <li>
          <Handle id="g" type="target" isConnectable={isConnectable} />
          <div>
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_7' id={data.g1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -25, marginTop: -16, }} >{data.g1_label}</div>
          </div>
        </li>
        <li>
          <Handle id="h" type='source' isConnectable={isConnectable} style={{ background: '#e43816' }} />
          <div>
            <img src={require('../manul/p_5.png')} style={{ width: 20, height: 20 }} />
            <div className='synapse_8' id={data.h1_id} style={{ fontSize: 11, width: 20, height: 20, zIndex: 100, position: "absolute", marginLeft: -24, marginTop: -13, }} >{data.h1_label}</div>
          </div>
        </li>
      </ul>
    </div >
  );
}




function Flow() {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  //基础数据

  const [elementShow, setShow] = useEdgesState("none");
  const [top, setTop] = useEdgesState(0);
  const [left, setLeft] = useEdgesState(0);
  //移动显示

  const [nodeLabel, setNodeLabel] = useState();
  const [seletedID, setSID] = useState(null);
  //map更改


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: "",
          a1_id: `a1_${id}`,
          a1_label: "",

          b1_id: `b1_${id}`,
          b1_label: "",

          c1_id: `c1_${id}`,
          c1_label: "",

          d1_id: `d1_${id}`,
          d1_label: "",

          e1_id: `e1_${id}`,
          e1_label: "",

          f1_id: `f1_${id}`,
          f1_label: "",

          g1_id: `g1_${id}`,
          g1_label: "",

          h1_id: `h1_${id}`,
          h1_label: "",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const ajax = function () {

    $.ajax(
      {
        contentType: "application/json ",
        type: "POST",
        url: 'http://121.36.103.47:8011/bug-brain/next.do',
        headers: "url:bug-brain/next.do",
        data: JSON.stringify({
          "node_list": nodes,
          "properties_list": edges,
        }),
        success: function (result) {
          console.log(nodes)
          console.log(edges)
          console.log("成功了" + result)
        },
        error: function (m) {
          console.log("失败了" + m)
          console.log(m)
        }
      }
    )
  }

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        console.log(node.data.a1_id)
        if (node.id === seletedID) {
          node.data = {
            ...node.data,
            label: nodeLabel,
          };
        }

        if (node.data.a1_id === seletedID) {
          node.data = {
            ...node.data,
            a1_label: nodeLabel
          };
        }

        if (node.data.b1_id === seletedID) {
          node.data = {
            ...node.data,
            b1_label: nodeLabel
          };
        }

        if (node.data.c1_id === seletedID) {
          node.data = {
            ...node.data,
            c1_label: nodeLabel
          };
        }

        if (node.data.d1_id === seletedID) {
          node.data = {
            ...node.data,
            d1_label: nodeLabel
          };
        }

        if (node.data.e1_id === seletedID) {
          node.data = {
            ...node.data,
            e1_label: nodeLabel
          };
        }

        if (node.data.f1_id === seletedID) {
          node.data = {
            ...node.data,
            f1_label: nodeLabel
          };
        }

        if (node.data.g1_id === seletedID) {
          node.data = {
            ...node.data,
            g1_label: nodeLabel
          };
        }

        if (node.data.h1_id === seletedID) {
          node.data = {
            ...node.data,
            h1_label: nodeLabel
          };
        }







        return node;
      })
    );
  }, [nodeLabel, setNodes]);

  //文本

  return (
    <>
      <div style={{ height: '780px', width: '1440px', float: 'left' }}>
        <div className='dndflow'>
          <Sidebar />
          <div id="div3">
            <button className='button' onClick={ajax}>运行</button>
          </div>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onNodeClick={(e) => {
                console.log(e.target.id)
                setSID(e.target.id)
                setTop(e.clientY - 120)
                setLeft(e.clientX)
                if (elementShow === 'none') {
                  setShow('block')
                }
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
              <Background color="#9d9d9c" variant={"lines"} />
              <Controls />
              <InputElement
                inputNodeName={nodeLabel} inputTop={top}
                inputLeft={left} inputShow={elementShow}
                inputFunShow={setShow}
                inputSeletedID={seletedID} inputFunNodeLabel={setNodeLabel}
                inputFunSeletedId={setSID} />
            </ReactFlow>
          </div>
        </div>
      </div></>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

