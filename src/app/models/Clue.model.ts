import { Category } from './Category. model';

export class Clue {
    public id: number;
    public answer: string;
    public question: string;
    public value: number;
    public airdate: Date;
    public created_at: Date;
    public updated_at: Date;
    public category_id: number;
    public game_id: any;
    public invalid_count: number;
    public category: Category;


    constructor(
        id: number,
        answer: string,
        question: string,
        value: number,
        airdate: Date,
        created_at: Date,
        updated_at: Date,
        category_id: number,
        category: Category,
        game_id?: any,
        invalid_count?: number
    ) {
        this.id = id;
        this.answer = answer;
        this.question = question;
        this.value = value;
        this.airdate = airdate;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.category_id = category_id;
        this.category = category;
        if (game_id) {
            this.game_id = game_id;
        }
        if (invalid_count) {
            this.invalid_count = invalid_count;
        }
    }
}