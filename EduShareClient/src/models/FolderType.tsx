export interface FolderType {
    id: number;
    name: string;
    parentFolderId?: number | null;
    userId: number;
    updatedAt:string;
    createdAt:string;
}
