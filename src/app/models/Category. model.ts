export class Category {
    public id: number;
    public title: string;
    public created_at: Date;
    public updated_at: Date;
    public clues_count: number;

    constructor(
        id: number,
        title: string,
        created_at: Date,
        updated_at: Date,
        clues_count: number
    ) {
        this.id = id;
        this.title = title;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.clues_count = clues_count;
    }
}