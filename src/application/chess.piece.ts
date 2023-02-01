import { randomUUID } from "crypto";


export interface ChessPieces {
    name: ChessPieceName;
    color: ChessPieceColor;
    isAttacked: boolean;
    isMoved: boolean;
}

export enum ChessPieceColor {
    WHITE = "white",
    BLACK = "black",
    NULL = "null"
}

export enum ChessPieceName {
    KING = "King",
    QUEEN = "Queen",
    ROOK = "Rook",
    BISHOP = "Bishop",
    KNIGHT = "Knight",
    PAWN = "Pawn",
    EMPTY = "Empty"
}

export class ChessPiece {
    isAttacked: boolean;
    color: string;
    id: string;
    name: string;
    isMoved: boolean;
    
    constructor({name, color, isAttacked, isMoved}: ChessPieces) {
        this.name = name; //string
        this.id = randomUUID() //string
        this.color = color; // string white | black
        this.isAttacked = isAttacked; // boolean
        this.isMoved = isMoved; // boolean
    }
}

