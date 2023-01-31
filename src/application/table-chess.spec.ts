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

    it('should test some moves with turns', () => {
        expect(TABLE.getTurn()).toEqual(ChessPieceColor.WHITE)
        TABLE.movePiece(1, 2, 3, 2)
        expect(TABLE.getTurn()).toEqual(ChessPieceColor.BLACK)
        TABLE.movePiece(6, 3, 4, 3)
        expect(TABLE.getTurn()).toEqual(ChessPieceColor.WHITE)
        TABLE.movePiece(0, 3, 3, 0)
        expect(TABLE.getTurn()).toEqual(ChessPieceColor.BLACK)
        expect(TABLE.getPiece(6, 3).name).toEqual(ChessPieceName.EMPTY)
        expect(TABLE.getPiece(4, 3).name).toEqual(ChessPieceName.PAWN)
        expect(TABLE.getPiece(3, 2).name).toEqual(ChessPieceName.PAWN)
        expect(TABLE.getPiece(3, 0).name).toEqual(ChessPieceName.QUEEN)
        expect(TABLE.getPiece(1, 2).name).toEqual(ChessPieceName.EMPTY)
        expect(TABLE.getPiece(0, 3).name).toEqual(ChessPieceName.EMPTY)
    })

    it('should not move when its not your turn', () => {
        TABLE.movePiece(1, 3, 2, 3)
        expect(TABLE.getPiece(1, 3).name).toEqual(ChessPieceName.PAWN)
        expect(TABLE.getPiece(2, 3).name).toEqual(ChessPieceName.EMPTY)
    })

    it('should not move queen', () => {
        TABLE.movePiece(3, 0, 3, 3)
        expect(TABLE.getPiece(3, 0).name).toEqual(ChessPieceName.QUEEN)
        expect(TABLE.getPiece(3, 3).name).toEqual(ChessPieceName.EMPTY)
    })

    it('should pawn kill a piece', () => {
        TABLE.movePiece(4, 3, 3, 2)
        expect(TABLE.getTurn()).toEqual(ChessPieceColor.WHITE)
        expect(TABLE.getPiece(3, 2).name).toEqual(ChessPieceName.PAWN)
        expect(TABLE.getPiece(4, 3).name).toEqual(ChessPieceName.EMPTY)
        expect(TABLE.getDeadPieces().length).toEqual(1)
    })

    it('should test Knight moves', () => {
        const moves = TABLE.checkValidMoves(0, 1)
        expect(moves).toEqual([[2, 2], [2, 0]])
    })

    it('should test pawn moves', () => {
        const movesWhite = TABLE.checkValidMoves(1, 1)
        const movesBlack = TABLE.checkValidMoves(6, 1)
        expect(movesWhite).toEqual([[2, 1], [3, 1]])
        expect(movesBlack).toEqual([[5, 1], [4, 1]])
    })

    it('should test pawn moves pass kill', () => {
        TABLE.movePiece(1, 1, 3, 1)
        TABLE.movePiece(3, 2, 2, 1)
        expect(TABLE.getTurn()).toEqual(ChessPieceColor.WHITE)
        expect(TABLE.getPiece(1, 1).name).toEqual(ChessPieceName.EMPTY)
        expect(TABLE.getPiece(2, 1).name).toEqual(ChessPieceName.PAWN)
        expect(TABLE.getPiece(3, 1).name).toEqual(ChessPieceName.EMPTY)
        expect(TABLE.getPiece(3, 2).name).toEqual(ChessPieceName.EMPTY)
    })
});