export class ResearchDto {
    _id: string;
    title: string;
    abstract?: string;
    group?: string;
    fileUrl?: string;
    author?: {
        _id: string;
        username: string;
        email: string;
    };
    isPublic?: boolean;
    status?: "Pending" | "Approved" | "Rejected";
    feedback?: string;
    createdAt?: string;

    constructor() {
        this._id = '';
        this.title = '';
        this.abstract = '';
        this.group = '';
        this.fileUrl = '';
        this.isPublic = false;
        this.status = "Pending";
        this.createdAt = '';
    }
}
