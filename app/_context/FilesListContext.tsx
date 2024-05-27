import { createContext, useState, ReactNode } from "react";

export interface Team {
    _id: string;
    teamName: string;
    createBy: string;
    members: string[];
    roles: { [key: string]: string };
    images: { [key: string]: string };
}

export const FileListContext = createContext<any>(undefined);

export const FileListProvider = ({ children }: { children: ReactNode }) => {
    const [fileList_, setFileList_] = useState([]);
    const [activeTeam, setActiveTeam] = useState<Team | null>(null);

    return (
        <FileListContext.Provider value={{ fileList_, setFileList_, activeTeam, setActiveTeam }}>
            {children}
        </FileListContext.Provider>
    );
};

