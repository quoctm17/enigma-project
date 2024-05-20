import React, { useEffect, useState, useMemo } from 'react';
import {
    Excalidraw,
    getSceneVersion,
    MainMenu,
    newElementWith,
    restoreElements,
    WelcomeScreen,
} from '@excalidraw/excalidraw';
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AppState, BinaryFiles, Collaborator, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { useCallbackRefState } from '@/app/_hooks/useCallbackRefState';
import { Mutable } from '@excalidraw/excalidraw/types/utility-types';

type PointerUpdateType = {
    pointer: {
        x: number;
        y: number;
        tool: 'pointer' | 'laser';
    };
    button: 'down' | 'up';
    pointersMap: Map<
        number,
        Readonly<{
            x: number;
            y: number;
        }>
    >;
};

function Canvas({
    onSaveTrigger,
    fileId,
    fileData,
    provider,
    doc,
    userMetaData,
}: {
    onSaveTrigger: any;
    fileId: any;
    fileData: FILE;
    provider: any;
    doc: any;
    userMetaData: any;
}) {
    const yMapElement = useMemo(() => doc.getMap('excalidraw-elements'), []);
    const yMapCursor = useMemo(() => doc.getMap('excalidraw-cursors'), []);
    const collaborators = useMemo(() => {
        // TODO: get real data
        const c = new Map<string, Collaborator>();
        c.set(userMetaData.name, {
            username: userMetaData.name,
            avatarUrl: '../../../../img/doremon.png',
            color: {
                background: userMetaData.color,
                stroke: userMetaData.color,
            },
        });

        return c;
    }, []);
    let lastBroadcastedOrReceivedSceneVersion = useMemo(() => -1, []);

    const [excalidrawAPI, excalidrawRefCallback] = useCallbackRefState<ExcalidrawImperativeAPI>();

    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    useEffect(() => {
        // join room
        yMapCursor.set(userMetaData.name, JSON.stringify(collaborators.get(userMetaData.name)));
        // leave room
        return () => {
            yMapCursor.delete(userMetaData.name);
        };
    }, []);

    useEffect(() => {
        onSaveTrigger && saveWhiteboard();
    }, [onSaveTrigger]);

    // get elements from remote clients
    useEffect(() => {
        let intervalId: any = null;
        if (excalidrawAPI) {
            intervalId = setInterval(() => {
                const elements = JSON.parse((yMapElement.get('elements') as string) || '[]');
                handleRemoteSceneUpdate(_reconcileElements(elements));
            }, 1000);
        }

        return () => intervalId && clearInterval(intervalId);
    }, [excalidrawAPI]);

    useEffect(() => {
        const observer = (ymapEvent: any) => {
            ymapEvent.changes.keys.forEach((change: any, key: any) => {
                if (change.action === 'add') {
                    console.log(`Property "${key}" was added. Initial value: "${yMapCursor.get(key)}".`);
                    const collaborator = JSON.parse((yMapCursor.get(key) as string) || '{}');
                    setCollaborators(collaborator);
                } else if (change.action === 'update') {
                    console.log(
                        `Property "${key}" was updated. New value: "${yMapCursor.get(key)}". Previous value: "${change.oldValue}".`,
                    );
                    const collaborator = JSON.parse((yMapCursor.get(key) as string) || '{}');
                    updateCollaborator(collaborator);
                } else if (change.action === 'delete') {
                    console.log(
                        `Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`,
                    );
                }
            });
        };

        if (excalidrawAPI) {
            yMapCursor.observe(observer);
        }

        return () => {
            excalidrawAPI && yMapCursor.unobserve(observer);
        };
    }, [excalidrawAPI]);

    const setCollaborators = (updates: Partial<Collaborator>) => {
        if (updates.id === userMetaData.name) return;

        const _collaborators = new Map(collaborators);

        const updateName = updates.username || '';
        const user: Mutable<Collaborator> = {
            // ...collaborators.get(updateName),
            ...updates,
            // isCurrentUser: updateName === userMetaData.name,
        };
        _collaborators.set(updateName, user);

        excalidrawAPI?.updateScene({
            collaborators: _collaborators,
        });
    };

    const updateCollaborator = (updates: Partial<Collaborator>) => {
        if (updates.id === userMetaData.name) return;

        const _collaborators = new Map(collaborators);

        const updateName = updates.username || '';
        const user: Mutable<Collaborator> = {
            ...collaborators.get(updateName),
            ...updates,
            // isCurrentUser: updateName === userMetaData.name,
        };
        _collaborators.set(updateName, user);

        excalidrawAPI?.updateScene({
            collaborators: _collaborators,
        });
    };

    const saveWhiteboard = () => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: yMapElement.get('elements') as string,
        }).then((resp) => console.log(resp));
    };

    const onChange = (elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles) => {
        syncElements(elements);
        // setWhiteBoardData(elements);
    };

    const syncElements = (elements: readonly ExcalidrawElement[]) => {
        broadcastElements(elements);
    };

    const broadcastElements = (elements: readonly ExcalidrawElement[]) => {
        if (getSceneVersion(elements) > lastBroadcastedOrReceivedSceneVersion) {
            // use Yjs to sync elements to other clients
            yMapElement.set('elements', JSON.stringify(elements));
            lastBroadcastedOrReceivedSceneVersion = getSceneVersion(elements);
        }
    };

    const handleRemoteSceneUpdate = (elements: ExcalidrawElement[]) => {
        excalidrawAPI?.updateScene({
            elements,
        });
    };

    const _reconcileElements = (remoteElements: readonly ExcalidrawElement[]): ExcalidrawElement[] => {
        // const localElements = excalidrawAPI?.getSceneElementsIncludingDeleted();
        // const appState = excalidrawAPI?.getAppState();
        // const restoredRemoteElements = restoreElements(remoteElements, null);
        // const reconciledElements = reconcileElements(
        //     localElements,
        //     restoredRemoteElements as ExcalidrawElement[],
        //     appState,
        // );

        // Avoid broadcasting to the rest of the collaborators the scene
        // we just received!
        // Note: this needs to be set before updating the scene as it
        // synchronously calls render.
        lastBroadcastedOrReceivedSceneVersion = getSceneVersion(remoteElements);

        return remoteElements as ExcalidrawElement[];
    };

    const onPointerUpdate = ({ pointer, button, pointersMap }: PointerUpdateType) => {
        if (pointersMap.size < 2) {
            broadcastMouseLocation({ pointer, button, pointersMap });
        }
    };

    const broadcastMouseLocation = ({ pointer, button, pointersMap }: PointerUpdateType) => {
        const payload = {
            pointer,
            button: button || 'up',
            selectedElementIds: excalidrawAPI?.getAppState().selectedElementIds,
            username: userMetaData.name,
            id: userMetaData.name,
        };
        yMapCursor.set(userMetaData.name, JSON.stringify(payload));
    };

    return (
        <div style={{ height: '700px' }}>
            {fileData && (
                <Excalidraw
                    excalidrawAPI={excalidrawRefCallback}
                    theme="dark"
                    initialData={{
                        elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
                    }}
                    onChange={onChange}
                    onPointerUpdate={onPointerUpdate}
                    UIOptions={{
                        canvasActions: {
                            saveToActiveFile: false,
                            loadScene: false,
                            export: false,
                            toggleTheme: false,
                        },
                    }}
                >
                    <MainMenu>
                        <MainMenu.DefaultItems.ClearCanvas />
                        <MainMenu.DefaultItems.SaveAsImage />
                        <MainMenu.DefaultItems.ChangeCanvasBackground />
                    </MainMenu>
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                        <WelcomeScreen.Center>
                            <WelcomeScreen.Center.Heading>Welcome to Enigma Canvas!</WelcomeScreen.Center.Heading>
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>
            )}
        </div>
    );
}

export default Canvas;
