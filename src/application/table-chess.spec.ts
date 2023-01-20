import { ChessPieceName } from "./chess.piece";
import { NewTable } from "./create-game";
import { TableChess } from "./table-chess";
let TABLE: TableChess;
describe("TableChess", () => {
    it("should create a new table", () => {
        const table = NewTable();
        TABLE = new TableChess(table)
        expect(TABLE).toBeTruthy();
    });
    it("should get king piece", () => {
        const piece = TABLE.getPiece(0, 4)
        console.log(piece)
        expect(piece.name).toBe(ChessPieceName.KING)
    })
    // it('should move a pice', () => {
    //     TABLE.movePiece(0,0,3,2)
    //     TABLE.movePiece(0,1, 7,7)
    //     expect(TABLE.getPiece(0,1).name).toBe(ChessPieceName.EMPTY)
    //     expect(TABLE.getPiece(7,7).name).toBe(ChessPieceName.KNIGHT)
    //     expect(TABLE.getPiece(3,2).name).toBe(ChessPieceName.ROOK)
    //     expect(TABLE.getPiece(0,0).name).toBe(ChessPieceName.EMPTY)

    // })
    it('should test queen moves', () => {
        TABLE.movePiece(0, 3, 4, 3)
        TABLE.movePiece(0, 0, 4, 2)
        const moves = TABLE.checkValidMoves(4, 3)
        expect(moves).toBeTruthy()
    })
    it('should test Knight moves', () => {
        const moves = TABLE.checkValidMoves(0, 1)
        console.log(moves)
        expect(moves).toEqual([[2, 2], [2, 0]])
    })
    it('should test pawn moves', () => {
        const movesWhite = TABLE.checkValidMoves(1, 1)
        const movesBlack = TABLE.checkValidMoves(6, 1)
        expect(movesWhite).toEqual([[2, 1], [3, 1]])
        expect(movesBlack).toEqual([[5, 1], [4, 1]])
    })
});