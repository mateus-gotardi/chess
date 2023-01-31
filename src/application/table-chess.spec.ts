import { ChessPieceName, ChessPieceColor } from "./chess.piece";
import { NewTable } from "./create-game";
import { TableChess } from "./table-chess";
let TABLE: TableChess;
describe("TableChess", () => {
    it("should create a new table", () => {
        const table = NewTable();
        TABLE = new TableChess(table)
        expect(TABLE).toBeTruthy();
    });

    it("should get right pieces", () => {
        expect(TABLE.getPiece(0, 0).name).toEqual(ChessPieceName.ROOK);
        expect(TABLE.getPiece(0, 1).name).toEqual(ChessPieceName.KNIGHT);
        expect(TABLE.getPiece(0, 2).name).toEqual(ChessPieceName.BISHOP);
        expect(TABLE.getPiece(0, 3).name).toEqual(ChessPieceName.QUEEN);
        expect(TABLE.getPiece(0, 4).name).toEqual(ChessPieceName.KING);
        expect(TABLE.getPiece(0, 5).name).toEqual(ChessPieceName.BISHOP);
        expect(TABLE.getPiece(0, 6).name).toEqual(ChessPieceName.KNIGHT);
        expect(TABLE.getPiece(0, 7).name).toEqual(ChessPieceName.ROOK);
        expect(TABLE.getPiece(1, 0).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(1, 1).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(1, 2).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(1, 3).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(1, 4).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(1, 5).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(1, 6).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(1, 7).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 0).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 1).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 2).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 3).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 4).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 5).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 6).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(6, 7).name).toEqual(ChessPieceName.PAWN);
        expect(TABLE.getPiece(7, 0).name).toEqual(ChessPieceName.ROOK);
        expect(TABLE.getPiece(7, 1).name).toEqual(ChessPieceName.KNIGHT);
        expect(TABLE.getPiece(7, 2).name).toEqual(ChessPieceName.BISHOP);
        expect(TABLE.getPiece(7, 3).name).toEqual(ChessPieceName.QUEEN);
        expect(TABLE.getPiece(7, 4).name).toEqual(ChessPieceName.KING);
        expect(TABLE.getPiece(7, 5).name).toEqual(ChessPieceName.BISHOP);
        expect(TABLE.getPiece(7, 6).name).toEqual(ChessPieceName.KNIGHT);
        expect(TABLE.getPiece(7, 7).name).toEqual(ChessPieceName.ROOK);
    })
});