import { randomUUID } from "crypto";


export interface ChessPieces {
    name: ChessPieceName;
    color: ChessPieceColor;
    isWhiteAttacked: boolean,
    isBlackAttacked: boolean,
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
    isWhiteAttacked: boolean;
    isBlackAttacked: boolean;
    color: string;
    id: string;
    name: string;
    isMoved: boolean;
    
    constructor({name, color, isMoved, isWhiteAttacked, isBlackAttacked }: ChessPieces) {
        this.name = name; //string
        this.id = randomUUID() //string
        this.color = color; // string white | black
        this.isWhiteAttacked = isWhiteAttacked; // boolean
        this.isBlackAttacked = isBlackAttacked; // boolean
        this.isMoved = isMoved; // boolean
    }
}

