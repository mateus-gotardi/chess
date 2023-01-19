import { ChessPiece, ChessPieceColor, ChessPieceName } from './chess.piece';

export class TableChess {
  table: Array<Array<ChessPiece>>;
  constructor(table: Array<Array<ChessPiece>>) {
    this.table = table;
  }

  getTable() {
    return this.table;
  }

  getPiece(x: number, y: number): ChessPiece {
    return this.table[x][y];
  }

  setPiece(x: number, y: number, piece: ChessPiece) {
    this.table[x][y] = piece;
  }

  movePiece(x: number, y: number, newX: number, newY: number) {
    if (
      this.isPlaceEmpty(newX, newY) ||
      this.isPieceEnemy(newX, newY, this.getPiece(x, y))
    ) {
      const piece: ChessPiece = this.getPiece(x, y);
      this.setPiece(newX, newY, piece);
      this.setPiece(
        x,
        y,
        new ChessPiece({
          name: ChessPieceName.EMPTY,
          color: ChessPieceColor.NULL,
          isAttacked: false,
        }),
      );
    }
  }

  isPieceAttacked(x: number, y: number) {
    return this.getPiece(x, y);
  }

  isPieceWhite(x: number, y: number) {
    return this.getPiece(x, y).color === ChessPieceColor.WHITE;
  }

  isPieceBlack(x: number, y: number) {
    return this.getPiece(x, y).color === ChessPieceColor.BLACK;
  }

  isPieceKing(x: number, y: number) {
    const piece = this.getPiece(x, y).name === ChessPieceName.KING;
  }

  isPieceQueen(x: number, y: number) {
    return this.getPiece(x, y).name === ChessPieceName.QUEEN;
  }

  isPieceRook(x: number, y: number) {
    return this.getPiece(x, y).name === ChessPieceName.ROOK;
  }

  isPieceBishop(x: number, y: number) {
    return this.getPiece(x, y).name === ChessPieceName.BISHOP;
  }

  isPieceKnight(x: number, y: number) {
    return this.getPiece(x, y).name === ChessPieceName.KNIGHT;
  }

  isPiecePawn(x: number, y: number) {
    return this.getPiece(x, y).name === ChessPieceName.PAWN;
  }

  isPlaceEmpty(x: number, y: number) {
    return this.getPiece(x, y).name === ChessPieceName.EMPTY;
  }

  isPieceEnemy(x: number, y: number, piece: ChessPiece) {
    if (!this.isPlaceEmpty(x, y))
      return this.getPiece(x, y).color !== piece.color;
    else return false;
  }
  async checkValidMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    switch (piece.name) {
      case ChessPieceName.KING:
        return await this.checkValidKingMoves(x, y);
    //   case ChessPieceName.QUEEN:
    //     return this.checkValidQueenMoves(x, y);
    //   case ChessPieceName.ROOK:
    //     return this.checkValidRookMoves(x, y);
    //   case ChessPieceName.BISHOP:
    //     return this.checkValidBishopMoves(x, y);
    //   case ChessPieceName.KNIGHT:
    //     return this.checkValidKnightMoves(x, y);
    //   case ChessPieceName.PAWN:
    //     return this.checkValidPawnMoves(x, y);
       default:
        return [];
    }
  }
  async checkValidKingMoves(x: number, y: number) {
    //const piece = this.getPiece(x, y);
    const validMoves = [];
    if (this.isPlaceEmpty(x + 1, y)) validMoves.push([x + 1, y]);
    if (this.isPlaceEmpty(x - 1, y)) validMoves.push([x - 1, y]);
    if (this.isPlaceEmpty(x, y + 1)) validMoves.push([x, y + 1]);
    if (this.isPlaceEmpty(x, y - 1)) validMoves.push([x, y - 1]);
    if (this.isPlaceEmpty(x + 1, y + 1)) validMoves.push([x + 1, y + 1]);
    if (this.isPlaceEmpty(x - 1, y - 1)) validMoves.push([x - 1, y - 1]);
    if (this.isPlaceEmpty(x + 1, y - 1)) validMoves.push([x + 1, y - 1]);
    if (this.isPlaceEmpty(x - 1, y + 1)) validMoves.push([x - 1, y + 1]);
    console.log(validMoves)
    return validMoves;
  }
    checkValidQueenMoves(x: number, y: number) {
    //const piece = this.getPiece(x, y);
    const validMoves = [];
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x + i, y)) validMoves.push([x + i, y]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x - i, y)) validMoves.push([x - i, y]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x, y + i)) validMoves.push([x, y + i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x, y - i)) validMoves.push([x, y - i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x + i, y + i)) validMoves.push([x + i, y + i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x - i, y - i)) validMoves.push([x - i, y - i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {

        if (this.isPlaceEmpty(x + i, y - i)) validMoves.push([x + i, y - i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x - i, y + i)) validMoves.push([x - i, y + i]);
        else break;
        }
    return validMoves;
    }

    checkValidRookMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const validMoves = [];
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x + i, y)) validMoves.push([x + i, y]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x - i, y)) validMoves.push([x - i, y]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x, y + i)) validMoves.push([x, y + i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x, y - i)) validMoves.push([x, y - i]);
        else break;
        }
    return validMoves;
    }

    checkValidBishopMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const validMoves = [];
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x + i, y + i)) validMoves.push([x + i, y + i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x - i, y - i)) validMoves.push([x - i, y - i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x + i, y - i)) validMoves.push([x + i, y - i]);
        else break;
        }
    for (let i = 1; i < 8; i++) {
        if (this.isPlaceEmpty(x - i, y + i)) validMoves.push([x - i, y + i]);
        else break;
        }
    return validMoves;
    }

    checkValidKnightMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const validMoves = [];
    if (this.isPlaceEmpty(x + 1, y + 2)) validMoves.push([x + 1, y + 2]);
    if (this.isPlaceEmpty(x + 1, y - 2)) validMoves.push([x + 1, y - 2]);
    if (this.isPlaceEmpty(x - 1, y + 2)) validMoves.push([x - 1, y + 2]);
    if (this.isPlaceEmpty(x - 1, y - 2)) validMoves.push([x - 1, y - 2]);
    if (this.isPlaceEmpty(x + 2, y + 1)) validMoves.push([x + 2, y + 1]);
    if (this.isPlaceEmpty(x + 2, y - 1)) validMoves.push([x + 2, y - 1]);
    if (this.isPlaceEmpty(x - 2, y + 1)) validMoves.push([x - 2, y + 1]);
    if (this.isPlaceEmpty(x - 2, y - 1)) validMoves.push([x - 2, y - 1]);
    return validMoves;
    }

    checkValidPawnMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const validMoves = [];
    if (piece.color === ChessPieceColor.WHITE) {
        if (this.isPlaceEmpty(x, y + 1)) validMoves.push([x, y + 1]);
        if (y === 1 && this.isPlaceEmpty(x, y + 2)) validMoves.push([x, y + 2]);
        if (this.isPieceEnemy(x + 1, y + 1, piece)) validMoves.push([x + 1, y + 1]);
        if (this.isPieceEnemy(x - 1, y + 1, piece)) validMoves.push([x - 1, y + 1]);
        }
    else {
        if (this.isPlaceEmpty(x, y - 1)) validMoves.push([x, y - 1]);
        if (y === 6 && this.isPlaceEmpty(x, y - 2)) validMoves.push([x, y - 2]);
        if (this.isPieceEnemy(x + 1, y - 1, piece)) validMoves.push([x + 1, y - 1]);
        if (this.isPieceEnemy(x - 1, y - 1, piece)) validMoves.push([x - 1, y - 1]);
        }
    return validMoves;
    }
}

export function NewTable() {
  var table = [
    [
      new ChessPiece({
        name: ChessPieceName.ROOK,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.KNIGHT,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.BISHOP,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.QUEEN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.KING,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.BISHOP,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.KNIGHT,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.ROOK,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
    ],

    [
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.WHITE,
        isAttacked: false,
      }),
    ],

    [
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
    ],
    [
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
    ],
    [
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
    ],
    [
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.EMPTY,
        color: ChessPieceColor.NULL,
        isAttacked: false,
      }),
    ],

    [
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.PAWN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
    ],

    [
      new ChessPiece({
        name: ChessPieceName.ROOK,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.KNIGHT,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.BISHOP,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.QUEEN,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.KING,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.BISHOP,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.KNIGHT,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
      new ChessPiece({
        name: ChessPieceName.ROOK,
        color: ChessPieceColor.BLACK,
        isAttacked: false,
      }),
    ],
  ];
  return table;
}
