import React from 'react';

import '../Nodes/index.css';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  return (
    <aside>
      <div id='flowperiphery'>
      <div id="overflow">

      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
        <img src={require('../manul/p_1.png')}/>
      </div>
      
      <div className="dndnode nenor" onDragStart={(event) => onDragStart(event, ' selectorNode')} draggable>
        <img src={require('../manul/p_5.png')} />
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        <img src={require('../manul/p_7.png')} />
      </div>

      </div>
      </div>
      <div id="div2">
        <button className='button'>帮助</button>
      </div>
    </aside>
  );
};