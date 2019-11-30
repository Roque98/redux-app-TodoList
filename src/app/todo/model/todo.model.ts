export class Todo {
    public id: number;
    public text: string;
    public completed: boolean;

    constructor( text: string ) {
        this.text = text.charAt(0).toLocaleUpperCase() + text.slice(1);
        this.completed = false;
        this.id = Math.random();
    }
}