import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function ADemoFlow() {
    return (
        <div style={{ height: '600px', width: '800px' }}>
            <ReactFlow>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default ADemoFlow;