import { FC, memo, useEffect, useRef, useState } from "react";
import config from '../flume-config';
import Layout from "./Layout";
import { NodeEditor, NodeMap } from "flume";
import { IFlume } from "../types/unknownTypes";
import { SidePanel } from "./SidePanel";
import { Button } from "antd";
import { v4 } from "uuid";

const Editor: FC = () => {
    const [nodes, setNodes] = useState<NodeMap | undefined>({});
    const [editorKey, setEditorKey] = useState<string>(v4());

    const nodeEditor = useRef()

    const forceReloadEditor = () => {
        setEditorKey(v4());
    }

    const openScenario = async () => {
        try {
            const handles = await window.showOpenFilePicker({ multiple: false });
            const tasks = handles.map(async handle => {
                const file = await handle.getFile();
                const json = await file.text();
                const data = JSON.parse(json) as NodeMap;
                setNodes(data);
            });

            await Promise.all(tasks);

            forceReloadEditor();
        } catch (error) {
            console.error(error);
        }
    }

    const saveScenario = async () => {
        if (nodeEditor.current === null || nodeEditor.current === undefined) return;

        try {
            const castedEditor = nodeEditor.current as IFlume;
            const json = JSON.stringify(castedEditor.getNodes());

            const handle = await window.showSaveFilePicker({ suggestedName: 'scenario.yade' });
            const writable = await handle.createWritable();
            await writable.write(json);
            writable.close();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Layout>
            <SidePanel>
                <Button onClick={openScenario}>Open</Button>
                <Button onClick={saveScenario}>Save</Button>
            </SidePanel>
            <NodeEditor
                key={editorKey}
                nodeTypes={config.nodeTypes}
                portTypes={config.portTypes}
                ref={nodeEditor}
                nodes={nodes}
                onChange={setNodes}
            />
        </Layout>
    );
};

export default memo(Editor);