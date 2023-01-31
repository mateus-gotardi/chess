import { ChessPieceName, ChessPieceColor } from "./chess.piece";
import { NewTable } from "./create-game";
import { TableChess } from "./table-chess";
let TABLE: TableChess;

describe('test valid moves of all pieces at the beginning', ()=>{
    const table = NewTable();
    TABLE = new TableChess(table)
    it('should test rook moves', ()=>{
        const leftWhiteRook = TABLE.checkValidMoves(0, 0)
        expect(leftWhiteRook).toEqual([])
        const rightWhiteRook = TABLE.checkValidMoves(0, 7)
        expect(rightWhiteRook).toEqual([])
        const leftBlackRook = TABLE.checkValidMoves(7, 0)
        expect(leftBlackRook).toEqual([])
        const rightBlackRook = TABLE.checkValidMoves(7, 7)
        expect(rightBlackRook).toEqual([])
    })
    it('should test Knight moves', () => {
        const leftWhiteKnight = TABLE.checkValidMoves(0, 1)
        expect(leftWhiteKnight).toEqual([[2, 2], [2, 0]])
        const rightWhiteKnight = TABLE.checkValidMoves(0, 6)
        expect(rightWhiteKnight).toEqual([[2, 7], [2, 5]])
        const leftBlackKnight = TABLE.checkValidMoves(7, 1)
        expect(leftBlackKnight).toEqual([[5, 2], [5, 0]])
        const rightBlackKnight = TABLE.checkValidMoves(7, 6)
        expect(rightBlackKnight).toEqual([[5, 7], [5, 5]])
    })
    it('should test Bishop moves', () => {
        const leftWhiteBishop = TABLE.checkValidMoves(0, 2)
        expect(leftWhiteBishop).toEqual([])
        const rightWhiteBishop = TABLE.checkValidMoves(0, 5)
        expect(rightWhiteBishop).toEqual([])
        const leftBlackBishop = TABLE.checkValidMoves(7, 2)
        expect(leftBlackBishop).toEqual([])
        const rightBlackBishop = TABLE.checkValidMoves(7, 5)
        expect(rightBlackBishop).toEqual([])
    })
    it ('should test Queen moves', () => {
        const whiteQueen = TABLE.checkValidMoves(0, 3)
        expect(whiteQueen).toEqual([])
        const blackQueen = TABLE.checkValidMoves(7, 3)
        expect(blackQueen).toEqual([])
    })
    it('should test King moves', () => {
        const whiteKing = TABLE.checkValidMoves(0, 4)
        expect(whiteKing).toEqual([])
        const blackKing = TABLE.checkValidMoves(7, 4)
        expect(blackKing).toEqual([])
    })
    it('should test Pawn moves', () => {
        expect(TABLE.checkValidMoves(1, 0)).toEqual([[2, 0], [3, 0]])
        expect(TABLE.checkValidMoves(1, 1)).toEqual([[2, 1], [3, 1]])
        expect(TABLE.checkValidMoves(1, 2)).toEqual([[2, 2], [3, 2]])
        expect(TABLE.checkValidMoves(1, 3)).toEqual([[2, 3], [3, 3]])
        expect(TABLE.checkValidMoves(1, 4)).toEqual([[2, 4], [3, 4]])
        expect(TABLE.checkValidMoves(1, 5)).toEqual([[2, 5], [3, 5]])
        expect(TABLE.checkValidMoves(1, 6)).toEqual([[2, 6], [3, 6]])
        expect(TABLE.checkValidMoves(1, 7)).toEqual([[2, 7], [3, 7]])
        expect(TABLE.checkValidMoves(6, 0)).toEqual([[5, 0], [4, 0]])
        expect(TABLE.checkValidMoves(6, 1)).toEqual([[5, 1], [4, 1]])
        expect(TABLE.checkValidMoves(6, 2)).toEqual([[5, 2], [4, 2]])
        expect(TABLE.checkValidMoves(6, 3)).toEqual([[5, 3], [4, 3]])
        expect(TABLE.checkValidMoves(6, 4)).toEqual([[5, 4], [4, 4]])
        expect(TABLE.checkValidMoves(6, 5)).toEqual([[5, 5], [4, 5]])
        expect(TABLE.checkValidMoves(6, 6)).toEqual([[5, 6], [4, 6]])
        expect(TABLE.checkValidMoves(6, 7)).toEqual([[5, 7], [4, 7]])
    })
})


describe('test moves of the pieces', () => {
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

    it('should test pawn moves pass kill', () => {
        TABLE.movePiece(1, 1, 3, 1)
        TABLE.movePiece(3, 2, 2, 1)
        expect(TABLE.getTurn()).toEqual(ChessPieceColor.WHITE)
        expect(TABLE.getPiece(1, 1).name).toEqual(ChessPieceName.EMPTY)
        expect(TABLE.getPiece(2, 1).name).toEqual(ChessPieceName.PAWN)
        expect(TABLE.getPiece(3, 1).name).toEqual(ChessPieceName.EMPTY)
        expect(TABLE.getPiece(3, 2).name).toEqual(ChessPieceName.EMPTY)
    })
})
