"use client"
import { useState } from 'react';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

type Id<T> = string & { __tableName: T };

interface File {
    id: string;
    fileName: string;
    createdBy: string;
    archive: boolean;
    document: string;
    whiteboard: string;
}

function FilesPage() {
    const convex = useConvex();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFile, setNewFile] = useState({
        fileName: '',
        teamId: '' as Id<'teams'>,  // Replace with the actual team ID
        createdBy: 'admin@example.com',  // Replace with the actual creator's email
        archive: false,
        document: '',
        whiteboard: ''
    });

    const files = useQuery(api.files.getAllFiles) as File[] | undefined;
    const createFile = useMutation(api.files.createFile);

    const handleCreateFile = async () => {
        await createFile(newFile);
        setNewFile({
            fileName: '',
            teamId: '' as Id<'teams'>,
            createdBy: 'admin@example.com',
            archive: false,
            document: '',
            whiteboard: ''
        });
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Files</h1>
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">Create File</Button>
            <Table className="mt-6">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Archive</TableHead>
                        <TableHead>Document</TableHead>
                        <TableHead>Whiteboard</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {files?.map((file) => (
                        <TableRow key={file.id}>
                            <TableCell>{file.fileName}</TableCell>
                            <TableCell>{file.createdBy}</TableCell>
                            <TableCell>{file.archive ? "Yes" : "No"}</TableCell>
                            <TableCell>{file.document}</TableCell>
                            <TableCell>{file.whiteboard}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="bg-gray-800 text-white">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Create File</h2>
                    <Input
                        value={newFile.fileName}
                        onChange={(e) => setNewFile({ ...newFile, fileName: e.target.value })}
                        placeholder="Name"
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        value={newFile.document}
                        onChange={(e) => setNewFile({ ...newFile, document: e.target.value })}
                        placeholder="Document"
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        value={newFile.whiteboard}
                        onChange={(e) => setNewFile({ ...newFile, whiteboard: e.target.value })}
                        placeholder="Whiteboard"
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Button onClick={handleCreateFile} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Create</Button>
                </div>
            </Modal>
        </div>
    );
}

export default FilesPage;
