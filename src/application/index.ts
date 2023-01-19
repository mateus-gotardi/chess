export interface ChessPieces {
    ID: string;
    name: string;
    color: string;
    isAttacked: boolean;
}

class ChessPiece {
    constructor(name, id, color, isAttacked: ChessPieces) {
        this.name = name; //string
        this.id = id; //string
        this.color = color; // string white | black
        this.isAttacked = isAttacked; // boolean
    }
}