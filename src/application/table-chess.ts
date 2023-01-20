import { ChessPiece, ChessPieceColor, ChessPieceName } from './chess.piece';
import { NewTable } from './create-game';

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
    if (x < 0 || x > 7 || y < 0 || y > 7) return false;
    else
      return this.table[x][y].name === ChessPieceName.EMPTY;
  }

  isPieceEnemy(x: number, y: number, piece: ChessPiece) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return false;
    else {
      if (!this.isPlaceEmpty(x, y))
        return this.getPiece(x, y).color !== piece.color;
      else return false;
    }

  }
  checkValidMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    switch (piece.name) {
      case ChessPieceName.KING:
        return this.checkValidKingMoves(x, y);
      case ChessPieceName.QUEEN:
        return this.checkValidQueenMoves(x, y);
      case ChessPieceName.ROOK:
        return this.checkValidRookMoves(x, y);
      case ChessPieceName.BISHOP:
        return this.checkValidBishopMoves(x, y);
      case ChessPieceName.KNIGHT:
        return this.checkValidKnightMoves(x, y);
      case ChessPieceName.PAWN:
        return this.checkValidPawnMoves(x, y);
      case ChessPieceName.EMPTY:
        return [];
      default:
        return [];
    }
  }
  checkValidKingMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const validMoves = [];

    return validMoves;
  }
  checkValidQueenMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    let moves = [];
    // check vertical
    for (let i = x - 1; i >= 0; i--) {
      if (this.table[i][y].name === ChessPieceName.EMPTY) {
        moves.push([i, y]);
      } else {
        if (this.isPieceEnemy(i, y, piece)) {
          moves.push([i, y]);
        }
        break
      }
    }
    for (let i = x + 1; i < 8; i++) {
      if (this.table[i][y].name === ChessPieceName.EMPTY) {
        moves.push([i, y]);
      } else {
        if (this.isPieceEnemy(i, y, piece)) {
          moves.push([i, y]);
        }
        break
      }
    }
    // check horizontal
    for (let i = y - 1; i >= 0; i--) {
      if (this.table[x][i].name === ChessPieceName.EMPTY) {
        moves.push([x, i]);
      } else {
        if (this.isPieceEnemy(x, i, piece)) {
          moves.push([x, i]);
        }
        break
      }
    }
    for (let i = y + 1; i < 8; i++) {
      if (this.table[x][i].name === ChessPieceName.EMPTY) {
        moves.push([x, i]);
      } else {
        if (this.isPieceEnemy(x, i, piece)) {
          moves.push([x, i]);
        }
        break
      }
    }
    // check diagonal moves
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    return moves;
  }
  checkValidRookMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    let moves = [];
    // check vertical
    for (let i = x - 1; i >= 0; i--) {
      if (this.table[i][y].name === ChessPieceName.EMPTY) {
        moves.push([i, y]);
      } else {
        if (this.isPieceEnemy(i, y, piece)) {
          moves.push([i, y]);
        }
        break
      }
    }
    for (let i = x + 1; i < 8; i++) {
      if (this.table[i][y].name === ChessPieceName.EMPTY) {
        moves.push([i, y]);
      } else {
        if (this.isPieceEnemy(i, y, piece)) {
          moves.push([i, y]);
        }
        break
      }
    }
    // check horizontal
    for (let i = y - 1; i >= 0; i--) {
      if (this.table[x][i].name === ChessPieceName.EMPTY) {
        moves.push([x, i]);
      } else {
        if (this.isPieceEnemy(x, i, piece)) {
          moves.push([x, i]);
        }
        break
      }
    }
    for (let i = y + 1; i < 8; i++) {
      if (this.table[x][i].name === ChessPieceName.EMPTY) {
        moves.push([x, i]);
      } else {
        if (this.isPieceEnemy(x, i, piece)) {
          moves.push([x, i]);
        }
        break
      }
    }
    return moves;
  }

  checkValidBishopMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    let moves = [];
    // check diagonal moves
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
      if (this.table[i][j].name === ChessPieceName.EMPTY) {
        moves.push([i, j]);
      } else {
        if (this.isPieceEnemy(i, j, piece)) {
          moves.push([i, j]);
        }
        break
      }
    }
    return moves;
  }

  checkValidKnightMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const validMoves = [];
    if (this.isPlaceEmpty(x + 1, y + 2) || this.isPieceEnemy(x + 1, y + 2, piece)) validMoves.push([x + 1, y + 2]);
    if (this.isPlaceEmpty(x + 1, y - 2) || this.isPieceEnemy(x + 1, y - 2, piece)) validMoves.push([x + 1, y - 2]);
    if (this.isPlaceEmpty(x - 1, y + 2) || this.isPieceEnemy(x - 1, y + 2, piece)) validMoves.push([x - 1, y + 2]);
    if (this.isPlaceEmpty(x - 1, y - 2) || this.isPieceEnemy(x - 1, y - 2, piece)) validMoves.push([x - 1, y - 2]);
    if (this.isPlaceEmpty(x + 2, y + 1) || this.isPieceEnemy(x + 2, y + 1, piece)) validMoves.push([x + 2, y + 1]);
    if (this.isPlaceEmpty(x + 2, y - 1) || this.isPieceEnemy(x + 2, y - 1, piece)) validMoves.push([x + 2, y - 1]);
    if (this.isPlaceEmpty(x - 2, y + 1) || this.isPieceEnemy(x - 2, y + 1, piece)) validMoves.push([x - 2, y + 1]);
    if (this.isPlaceEmpty(x - 2, y - 1) || this.isPieceEnemy(x - 2, y - 1, piece)) validMoves.push([x - 2, y - 1]);
    return validMoves;
  }

  checkValidPawnMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const validMoves = [];
    if (piece.color === ChessPieceColor.WHITE) {
      if (this.isPlaceEmpty(x + 1, y)) validMoves.push([x + 1, y]);
      if (x === 1 && this.isPlaceEmpty(x + 2, y)) validMoves.push([x + 2, y]);
      if (this.isPieceEnemy(x + 1, y + 1, piece)) validMoves.push([x + 1, y + 1]);
      if (this.isPieceEnemy(x + 1, y - 1, piece)) validMoves.push([x + 1, y - 1]);
    }
    else {
      if (this.isPlaceEmpty(x - 1, y)) validMoves.push([x - 1, y]);
      if (x === 6 && this.isPlaceEmpty(x - 2, y)) validMoves.push([x - 2, y]);
      if (this.isPieceEnemy(x - 1, y + 1, piece)) validMoves.push([x - 1, y + 1]);
      if (this.isPieceEnemy(x - 1, y - 1, piece)) validMoves.push([x - 1, y - 1]);
    }
    return validMoves;
  }
}
