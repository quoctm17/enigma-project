import { createContext, useState, ReactNode, useEffect } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

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
    const [userImages, setUserImages] = useState<{ [key: string]: string }>({});

    const convex = useConvex();

    useEffect(() => {
        const fetchUserImages = async () => {
            const result = await convex.query(api.user.getAllUsers);
            const images = result.reduce((acc: any, user: any) => {
                acc[user.email] = user.image;
                return acc;
            }, {});
            setUserImages(images);
        };

        fetchUserImages();
    }, [convex]);

    return (
        <FileListContext.Provider value={{ fileList_, setFileList_, activeTeam, setActiveTeam, userImages }}>
            {children}
        </FileListContext.Provider>
    );
};
