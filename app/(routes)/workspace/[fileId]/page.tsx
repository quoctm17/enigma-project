'use client';
import React, { useEffect, useMemo, useState } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

import WorkspaceHeader from '../_components/WorkspaceHeader';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';
import EditorV2 from '../_components/EditorV2';

const doc = new Y.Doc();

function Workspace({ params }: any) {
    const provider = useMemo(() => new WebrtcProvider(params.fileId, doc), []);
    const userMetaData = useMemo(
        () =>
            // get random name and random color
            ({
                name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            }),
        [],
    );

    const [triggerSave, serTriggerSave] = useState(false);
    const convex = useConvex();
    const [fileData, setFileData] = useState<FILE | any>();
    useEffect(() => {
        console.log('FILEID', params.fileId);
        params.fileId && getFileData();
    }, []);

    const getFileData = async () => {
        const result = await convex.query(api.files.getFileById, { _id: params.fileId });
        setFileData(result);
    };
    return (
        <div>
            <WorkspaceHeader onSave={() => serTriggerSave(!triggerSave)} />

            {/* Workspace Layout */}
            <div
                className="h-[calc(100vh-64px)] grid grid-cols-1
            md:grid-cols-2"
            >
                {/* Document  */}
                <div className=" text-enm-main-text bg-enm-bg">
                    {/* <Editor onSaveTrigger={triggerSave}
                        fileId={params.fileId}
                        fileData={fileData}
                    /> */}
                    <EditorV2
                        onSaveTrigger={triggerSave}
                        fileId={params.fileId}
                        fileData={fileData}
                        provider={provider}
                        doc={doc}
                        userMetaData={userMetaData}
                    />
                </div>
                {/* Whiteboard/canvas */}
                <div className=" border-l bg-enm-bg">
                    <Canvas
                        onSaveTrigger={triggerSave}
                        fileId={params.fileId}
                        fileData={fileData}
                        provider={provider}
                        doc={doc}
                        userMetaData={userMetaData}
                    />
                </div>
            </div>
        </div>
    );
}

export default Workspace;
