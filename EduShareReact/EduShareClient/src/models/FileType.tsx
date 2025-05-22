export interface FileType {
    id: number;
    fileName: string;
    folderId: number;
    topicId: number;
    fileSize:number
    fileType:string;
    userId: number;
    fileUrl:string;
    createdAt:string;
    updatedAt:string;
    isPublic:boolean;
    ownerName?: string;

}
