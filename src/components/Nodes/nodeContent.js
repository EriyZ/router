import React, { useState, useEffect } from 'react';
import { Input, Switch } from 'antd';

export default ({ info, onChange }) => {
    const [nodeInfo, setNodeInfo] = useState({});

    useEffect(() => {
        if (info.id) {
            // console.log(info)
            if (!info.isHidden) {
                info.isHidden = false;
            }
            setNodeInfo(info);
        }
    }, [info.id]);

    // 改变名称
    const setNodeName = (value) => {
        setNodeInfo({
            ...nodeInfo,
            label: value,
        });
        onChange({
            ...nodeInfo,
            label: value,
        });
    };

    // 改变背景色
    const setNodeBg = (value) => {
        // console.log(value);
        setNodeInfo({
            ...nodeInfo,
            nodeBg: value,
        });
        onChange({
            ...nodeInfo,
            nodeBg: value,
        });
    };

    // 是否隐藏
    const setNodeHidden = (value) => {
        setNodeInfo({
            ...nodeInfo,
            isHidden: value,
        });
        onChange({
            ...nodeInfo,
            isHidden: value,
        });
    };

    return nodeInfo.id ? (
        <div className="updatenode__controls" style={{ position: 'absolute', top: 1000, height: 120, width: 300, height: 300 }}>
            <label>名称:</label>
            {/* <input value={nodeInfo.label} onChange={(evt) => setNodeName(evt.target.value)} /> */}
            <Input
                placeholder=""
                onChange={(evt) => setNodeName(evt.target.value)}
            />

            <label className="updatenode__bglabel">背景色:</label>
            <Input type="color" onChange={(evt) => setNodeBg(evt.target.value)} />

            <div className="updatenode__checkboxwrapper">
                <label>是否隐藏:</label>
                <Switch checked={nodeInfo.isHidden} onChange={setNodeHidden} />
            </div>
        </div>
    ) : (
        <></>
    );
};