'use client'; // this registers <Editor> as a Client Component
import { useState, useEffect, useMemo } from 'react';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { useMutation } from 'convex/react';
import { PartialBlock, BlockNoteEditor } from '@blocknote/core';
import { toast } from 'sonner';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';

const rawDocument = [
    {
        type: 'heading',
        content: 'This is a heading block',
    },
    {
        type: 'paragraph',
        content: 'This is a paragraph block',
    },
    {
        type: 'paragraph',
    },
] as PartialBlock[];

const doc = new Y.Doc();

function EditorV2({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any; fileId: any; fileData: FILE }) {
    const updateDocument = useMutation(api.files.updateDocument);
    const provider = useMemo(() => new WebrtcProvider(fileId, doc), []);

    const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined | 'loading'>('loading');

    // Loads the previously stored editor contents.
    useEffect(() => {
        if (!fileData) return;
        const content = fileData.document ? (JSON.parse(fileData.document) as PartialBlock[]) : rawDocument;
        setInitialContent(content);
    }, [fileData]);

    useEffect(() => {
        console.log('trigger Value: ', onSaveTrigger);
        onSaveTrigger && onSaveDocument();
    }, [onSaveTrigger]);

    // Creates a new editor instance.
    // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
    // can delay the creation of the editor until the initial content is loaded.
    const editor = useMemo(() => {
        if (initialContent === 'loading') {
            return undefined;
        }
        return BlockNoteEditor.create({
            initialContent,
            collaboration: {
                // The Yjs Provider responsible for transporting updates:
                provider,
                // Where to store BlockNote data in the Y.Doc:
                fragment: doc.getXmlFragment('document-store'),
                // TODO: get real user information
                // Information (name and color) for this user:
                user: {
                    // get random name and random color
                    name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
                },
            },
        });
    }, [initialContent]);

    const onSaveDocument = () => {
        if (editor && editor.document) {
            updateDocument({
                _id: fileId,
                document: JSON.stringify(editor.document),
            }).then(
                (resp) => {
                    toast('Document Updated!');
                },
                (e) => {
                    toast('Server Error!');
                },
            );
        }
    };

    if (editor === undefined) {
        return <p>Loading content...</p>;
    }

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} theme={'light'} />;
}

export default EditorV2;
