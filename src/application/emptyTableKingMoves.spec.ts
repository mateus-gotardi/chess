import { createEmptyTable } from "./createEmptyTable";
import { TableChess } from "./table-chess";
import { ChessPieceName, ChessPieceColor, ChessPiece } from "./chess.piece";
let TABLE: TableChess;

describe("tests king moves with empty table", () => {
  it("should create an empty table", () => {
    const table = createEmptyTable();
    TABLE = new TableChess(table)
    expect(TABLE).toBeTruthy();
  });
  it("should add a king in the middle of the table and check his moves", () => {
    TABLE.setPiece(4, 3, new ChessPiece({ name: ChessPieceName.KING, color: ChessPieceColor.WHITE, isWhiteAttacked: false, isBlackAttacked: false, isMoved: true }))
    expect(TABLE.getPiece(4, 3).name).toBe(ChessPieceName.KING)
    expect(TABLE.getPiece(4, 3).color).toBe(ChessPieceColor.WHITE)
    expect(TABLE.checkValidMoves(4, 3)).toEqual([[5, 3], [3, 3], [4, 4], [4, 2], [5, 4], [3, 2], [5, 2], [3, 4]])
  })
  it('should not allow a king to get close to another king', () => {
    TABLE.setPiece(4, 5, new ChessPiece({ name: ChessPieceName.KING, color: ChessPieceColor.BLACK, isWhiteAttacked: false, isBlackAttacked: false, isMoved: true }))
    expect(TABLE.getPiece(4, 5).name).toBe(ChessPieceName.KING)
    expect(TABLE.getPiece(4, 5).color).toBe(ChessPieceColor.BLACK)
    expect(TABLE.checkValidMoves(4, 5)).toEqual([[5, 5], [3, 5], [4, 6], [5, 6], [3, 6]])
    expect(TABLE.checkValidMoves(4, 3)).toEqual([[5, 3], [3, 3], [4, 2], [3, 2], [5, 2]])
  })
  it('should remove previous test pieces', () => {
    TABLE.setPiece(4, 3, new ChessPiece({ name: ChessPieceName.EMPTY, color: ChessPieceColor.NULL, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    TABLE.setPiece(4, 5, new ChessPiece({ name: ChessPieceName.EMPTY, color: ChessPieceColor.NULL, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    expect(TABLE.getPiece(4, 3).name).toBe(ChessPieceName.EMPTY)
    expect(TABLE.getPiece(4, 3).color).toBe(ChessPieceColor.NULL)
    expect(TABLE.getPiece(4, 5).name).toBe(ChessPieceName.EMPTY)
    expect(TABLE.getPiece(4, 5).color).toBe(ChessPieceColor.NULL)
  })

  it('should place white king and rooks', () => {
    TABLE.setPiece(0, 4, new ChessPiece({ name: ChessPieceName.KING, color: ChessPieceColor.WHITE, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    TABLE.setPiece(0, 0, new ChessPiece({ name: ChessPieceName.ROOK, color: ChessPieceColor.WHITE, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    TABLE.setPiece(0, 7, new ChessPiece({ name: ChessPieceName.ROOK, color: ChessPieceColor.WHITE, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    TABLE.checkAttack()
    expect(TABLE.getPiece(0, 7).name).toBe(ChessPieceName.ROOK)
    expect(TABLE.getPiece(0, 7).color).toBe(ChessPieceColor.WHITE)
    expect(TABLE.getPiece(0, 4).name).toBe(ChessPieceName.KING)
    expect(TABLE.getPiece(0, 4).color).toBe(ChessPieceColor.WHITE)
    expect(TABLE.getPiece(0, 0).name).toBe(ChessPieceName.ROOK)
    expect(TABLE.getPiece(0, 0).color).toBe(ChessPieceColor.WHITE)
  })
  it('should test white castling move', () => {
    const moves = TABLE.checkValidMoves(0, 4)
    expect(moves).toEqual([
      [1, 4], [0, 5],
      [0, 3], [1, 5],
      [1, 3], [0, 6],
      [0, 2]
    ])
    expect(TABLE.getTurn()).toBe(ChessPieceColor.WHITE)
    TABLE.movePiece(0, 4, 0, 2)
    expect(TABLE.getTurn()).toBe(ChessPieceColor.BLACK)
    expect(TABLE.getPiece(0, 2).name).toBe(ChessPieceName.KING)
    expect(TABLE.getPiece(0, 2).color).toBe(ChessPieceColor.WHITE)
    expect(TABLE.getPiece(0, 3).name).toBe(ChessPieceName.ROOK)
    expect(TABLE.getPiece(0, 3).color).toBe(ChessPieceColor.WHITE)
    expect(TABLE.getPiece(7, 3).isWhiteAttacked).toBe(true)
  })

  it('should place black king and rooks', () => {
    TABLE.setPiece(7, 4, new ChessPiece({ name: ChessPieceName.KING, color: ChessPieceColor.BLACK, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    TABLE.setPiece(7, 0, new ChessPiece({ name: ChessPieceName.ROOK, color: ChessPieceColor.BLACK, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    TABLE.setPiece(7, 7, new ChessPiece({ name: ChessPieceName.ROOK, color: ChessPieceColor.BLACK, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }))
    TABLE.checkAttack()
    expect(TABLE.getPiece(7, 7).name).toBe(ChessPieceName.ROOK)
    expect(TABLE.getPiece(7, 7).color).toBe(ChessPieceColor.BLACK)
    expect(TABLE.getPiece(7, 4).name).toBe(ChessPieceName.KING)
    expect(TABLE.getPiece(7, 4).color).toBe(ChessPieceColor.BLACK)
    expect(TABLE.getPiece(7, 0).name).toBe(ChessPieceName.ROOK)
    expect(TABLE.getPiece(7, 0).color).toBe(ChessPieceColor.BLACK)
  })
  it('should test black castling move considering attacked places', () => {
    const moves = TABLE.checkValidMoves(7, 4)
    expect(moves).toEqual([
      [6, 4], [7, 5],
      [6, 5], [7, 6],
      [7, 2]
    ])
    expect(TABLE.getTurn()).toBe(ChessPieceColor.BLACK)
    TABLE.movePiece(7, 4, 7, 2)
    expect(TABLE.getTurn()).toBe(ChessPieceColor.WHITE)
    expect(TABLE.getPiece(7, 2).name).toBe(ChessPieceName.KING)
    expect(TABLE.getPiece(7, 2).color).toBe(ChessPieceColor.BLACK)
    expect(TABLE.getPiece(7, 4).name).toBe(ChessPieceName.EMPTY)
    expect(TABLE.getPiece(7, 3).name).toBe(ChessPieceName.ROOK)
    expect(TABLE.getPiece(7, 3).color).toBe(ChessPieceColor.BLACK)
    expect(TABLE.getPiece(7, 0).name).toBe(ChessPieceName.EMPTY)
    expect(TABLE.getPiece(7, 3).isWhiteAttacked).toBe(true)
    expect(TABLE.getPiece(0, 3).isBlackAttacked).toBe(true)
  })
  it('should test king killing', () => {
    TABLE.movePiece(0, 3, 6, 3)
    TABLE.movePiece(7, 2, 6, 3)
    expect(TABLE.getPiece(6, 3).name).toBe(ChessPieceName.KING)
    expect(TABLE.getPiece(6, 3).color).toBe(ChessPieceColor.BLACK)
    expect(TABLE.getPiece(7, 2).name).toBe(ChessPieceName.EMPTY)
  })

});
