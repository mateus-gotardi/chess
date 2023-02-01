import { ChessPiece, ChessPieceColor, ChessPieceName } from './chess.piece';
export class TableChess {
  table: Array<Array<ChessPiece>>;
  deadPieces: Array<ChessPiece>;
  turn: ChessPieceColor;
  gameMoves: Array<Array<number>>;
  whiteChecked: boolean;
  blackChecked: boolean;

  constructor(table: Array<Array<ChessPiece>>) {
    this.table = table;
    this.deadPieces = [];
    this.turn = ChessPieceColor.WHITE;
    this.gameMoves = [];
    this.whiteChecked = false;
    this.blackChecked = false;
    this.checkAttack()
  }

  getTurn() {
    return this.turn;
  }

  getTable() {
    return this.table;
  }
  getDeadPieces() {
    return this.deadPieces;
  }

  getPiece(x: number, y: number): ChessPiece {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.table[x][y];
  }

  setPiece(x: number, y: number, piece: ChessPiece) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    this.table[x][y] = piece;
  }

  checkAttack() {
    this.blackChecked = false;
    this.whiteChecked = false;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = this.getPiece(x, y);
        piece.isWhiteAttacked = false;
        piece.isBlackAttacked = false;
      }
    }
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = this.getPiece(x, y);
        if (piece.color !== ChessPieceColor.NULL) {
          const validMoves = this.checkValidMoves(x, y);
          validMoves.forEach((move) => {
            const attackedPiece = this.getPiece(move[0], move[1]);
            if (piece.color === ChessPieceColor.WHITE) {
              attackedPiece.isWhiteAttacked = true;
            } else if (piece.color === ChessPieceColor.BLACK) {
              attackedPiece.isBlackAttacked = true;
            }
            if (attackedPiece.name === ChessPieceName.KING && attackedPiece.color !== piece.color) {
              if (attackedPiece.color === ChessPieceColor.WHITE) {
                this.whiteChecked = true;
              } else {
                this.blackChecked = true;
              }
            }
          });
        }
      }
    }
  }

  afterMove(x: number, y: number, newX: number, newY: number) {
    if (this.turn === ChessPieceColor.WHITE) {
      this.turn = ChessPieceColor.BLACK;
    } else {
      this.turn = ChessPieceColor.WHITE;
    }

    this.gameMoves.push([x, y, newX, newY]);

    this.checkAttack();
  }

  movePiece(x: number, y: number, newX: number, newY: number) {
    const piece = this.getPiece(x, y);
    const validMoves = this.checkValidMoves(x, y);
    if (piece.color === this.turn && validMoves.filter((move) => move[0] === newX && move[1] === newY).length > 0) {
      const finalPlace = this.getPiece(newX, newY);
      //adds dead piece to cemetery 
      if (finalPlace.color !== ChessPieceColor.NULL) {
        this.deadPieces.push(finalPlace);
      }
      //en passant
      else if (piece.name === ChessPieceName.PAWN && this.getPiece(x, newY).name === ChessPieceName.PAWN && this.isPieceEnemy(x, newY, piece)) {
        this.deadPieces.push(this.getPiece(x, newY));
        this.setPiece(x, newY, new ChessPiece({ name: ChessPieceName.EMPTY, color: ChessPieceColor.NULL, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }));
      }
      //castling
      if (piece.name === ChessPieceName.KING && newY === y + 2) {
        this.setPiece(x, y + 3, new ChessPiece({ name: ChessPieceName.EMPTY, color: ChessPieceColor.NULL, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }));
        this.setPiece(x, y + 1, new ChessPiece({ name: ChessPieceName.ROOK, color: piece.color, isWhiteAttacked: false, isBlackAttacked: false, isMoved: true }));
      } else if (piece.name === ChessPieceName.KING && newY === y - 2) {
        this.setPiece(x, y - 4, new ChessPiece({ name: ChessPieceName.EMPTY, color: ChessPieceColor.NULL, isWhiteAttacked: false, isBlackAttacked: false, isMoved: false }));
        this.setPiece(x, y - 1, new ChessPiece({ name: ChessPieceName.ROOK, color: piece.color, isWhiteAttacked: false, isBlackAttacked: false, isMoved: true }));
      }
      //sets piece as moved
      if (!piece.isMoved) { piece.isMoved = true };
      //sets piece in new position
      this.setPiece(newX, newY, piece);
      //sets old position as empty
      this.setPiece(
        x,
        y,
        new ChessPiece({
          name: ChessPieceName.EMPTY,
          color: ChessPieceColor.NULL,
          isWhiteAttacked: false,
          isBlackAttacked: false,
          isMoved: false
        }),
      );
      // register move, change turn and check attack
      this.afterMove(x, y, newX, newY);
    }
  }

  isPieceAttacked(x: number, y: number, piece: ChessPiece) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    let place = this.getPiece(x, y);
    if (piece.color === ChessPieceColor.WHITE) {
      return place.isBlackAttacked;
    } else if (piece.color === ChessPieceColor.BLACK) {
      return place.isWhiteAttacked;
    }
  }

  isPieceMoved(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).isMoved;
  }

  isPieceWhite(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).color === ChessPieceColor.WHITE;
  }

  isPieceBlack(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).color === ChessPieceColor.BLACK;
  }

  isPieceKing(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).name === ChessPieceName.KING;
  }

  isPieceQueen(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).name === ChessPieceName.QUEEN;
  }

  isPieceRook(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).name === ChessPieceName.ROOK;
  }

  isPieceBishop(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).name === ChessPieceName.BISHOP;
  }

  isPieceKnight(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
    return this.getPiece(x, y).name === ChessPieceName.KNIGHT;
  }

  isPiecePawn(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
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
    if (x < 0 || x > 7 || y < 0 || y > 7) return;
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

  isEnemyKingAround(x: number, y: number, piece: ChessPiece) {
    if (x < 0 || x > 7 || y < 0 || y > 7) return true;
    let isKing = false
    if (this.isPieceKing(x + 1, y) && this.isPieceEnemy(x + 1, y, piece) ||
      this.isPieceKing(x - 1, y) && this.isPieceEnemy(x - 1, y, piece) ||
      this.isPieceKing(x, y + 1) && this.isPieceEnemy(x, y + 1, piece) ||
      this.isPieceKing(x, y - 1) && this.isPieceEnemy(x, y - 1, piece) ||
      this.isPieceKing(x + 1, y + 1) && this.isPieceEnemy(x + 1, y + 1, piece) ||
      this.isPieceKing(x - 1, y - 1) && this.isPieceEnemy(x - 1, y - 1, piece) ||
      this.isPieceKing(x + 1, y - 1) && this.isPieceEnemy(x + 1, y - 1, piece) ||
      this.isPieceKing(x - 1, y + 1) && this.isPieceEnemy(x - 1, y + 1, piece)) {
      isKing = true
    }
    return isKing
  }

  checkValidKingMoves(x: number, y: number) {
    const piece = this.getPiece(x, y);
    let moves = [];
    if (!this.isPieceAttacked(x + 1, y, piece) && this.isPlaceEmpty(x + 1, y) && !this.isEnemyKingAround(x + 1, y, piece)) moves.push([x + 1, y])
    if (!this.isPieceAttacked(x + 1, y, piece) && this.isPieceEnemy(x + 1, y, piece) && !this.isEnemyKingAround(x + 1, y, piece)) moves.push([x + 1, y])

    if (!this.isPieceAttacked(x - 1, y, piece) && this.isPlaceEmpty(x - 1, y) && !this.isEnemyKingAround(x - 1, y, piece)) moves.push([x - 1, y])
    if (!this.isPieceAttacked(x - 1, y, piece) && this.isPieceEnemy(x - 1, y, piece) && !this.isEnemyKingAround(x - 1, y, piece)) moves.push([x - 1, y])

    if (!this.isPieceAttacked(x, y + 1, piece) && this.isPlaceEmpty(x, y + 1) && !this.isEnemyKingAround(x, y + 1, piece)) moves.push([x, y + 1])
    if (!this.isPieceAttacked(x, y + 1, piece) && this.isPieceEnemy(x, y + 1, piece) && !this.isEnemyKingAround(x, y + 1, piece)) moves.push([x, y + 1])

    if (!this.isPieceAttacked(x, y - 1, piece) && this.isPlaceEmpty(x, y - 1) && !this.isEnemyKingAround(x, y - 1, piece)) moves.push([x, y - 1])
    if (!this.isPieceAttacked(x, y - 1, piece) && this.isPieceEnemy(x, y - 1, piece) && !this.isEnemyKingAround(x, y - 1, piece)) moves.push([x, y - 1])

    if (!this.isPieceAttacked(x + 1, y + 1, piece) && this.isPlaceEmpty(x + 1, y + 1) && !this.isEnemyKingAround(x + 1, y + 1, piece)) moves.push([x + 1, y + 1])
    if (!this.isPieceAttacked(x + 1, y + 1, piece) && this.isPieceEnemy(x + 1, y + 1, piece) && !this.isEnemyKingAround(x + 1, y + 1, piece)) moves.push([x + 1, y + 1])

    if (!this.isPieceAttacked(x - 1, y - 1, piece) && this.isPlaceEmpty(x - 1, y - 1) && !this.isEnemyKingAround(x - 1, y - 1, piece)) moves.push([x - 1, y - 1])
    if (!this.isPieceAttacked(x - 1, y - 1, piece) && this.isPieceEnemy(x - 1, y - 1, piece) && !this.isEnemyKingAround(x - 1, y - 1, piece)) moves.push([x - 1, y - 1])

    if (!this.isPieceAttacked(x + 1, y - 1, piece) && this.isPlaceEmpty(x + 1, y - 1) && !this.isEnemyKingAround(x + 1, y - 1, piece)) moves.push([x + 1, y - 1])
    if (!this.isPieceAttacked(x + 1, y - 1, piece) && this.isPieceEnemy(x + 1, y - 1, piece) && !this.isEnemyKingAround(x + 1, y - 1, piece)) moves.push([x + 1, y - 1])

    if (!this.isPieceAttacked(x - 1, y + 1, piece) && this.isPlaceEmpty(x - 1, y + 1) && !this.isEnemyKingAround(x - 1, y + 1, piece)) moves.push([x - 1, y + 1])
    if (!this.isPieceAttacked(x - 1, y + 1, piece) && this.isPieceEnemy(x - 1, y + 1, piece) && !this.isEnemyKingAround(x - 1, y + 1, piece)) moves.push([x - 1, y + 1])

    if (!piece.isMoved) {
      if (this.isPieceRook(x, y + 3) && !this.isPieceMoved(x, y + 3) &&
        this.isPlaceEmpty(x, y + 2) && this.isPlaceEmpty(x, y + 1) &&
        !this.isEnemyKingAround(x, y + 2, piece) &&
        !this.isPieceAttacked(x, y + 2, piece)) moves.push([x, y + 2])

      if (this.isPieceRook(x, y - 4) && !this.isPieceMoved(x, y - 4) &&
        this.isPlaceEmpty(x, y - 2) && this.isPlaceEmpty(x, y - 1) &&
        this.isPlaceEmpty(x, y - 3) && !this.isEnemyKingAround(x, y - 2, piece) &&
        !this.isPieceAttacked(x, y - 2, piece)) moves.push([x, y - 2])
    }
    return moves;
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
      else if (this.gameMoves.length > 0 &&
        this.gameMoves[this.gameMoves.length - 1][0] == x + 2 &&
        this.gameMoves[this.gameMoves.length - 1][1] == y + 1 &&
        this.gameMoves[this.gameMoves.length - 1][2] == x &&
        this.gameMoves[this.gameMoves.length - 1][3] == y + 1 &&
        this.getPiece(x, y + 1).name === ChessPieceName.PAWN &&
        this.getPiece(x, y + 1).color === ChessPieceColor.BLACK) validMoves.push([x + 1, y + 1]);

      if (this.isPieceEnemy(x + 1, y - 1, piece)) validMoves.push([x + 1, y - 1]);
      else if (this.gameMoves.length > 0 &&
        this.gameMoves[this.gameMoves.length - 1][0] == x + 2 &&
        this.gameMoves[this.gameMoves.length - 1][1] == y - 1 &&
        this.gameMoves[this.gameMoves.length - 1][2] == x &&
        this.gameMoves[this.gameMoves.length - 1][3] == y - 1 &&
        this.getPiece(x, y + 1).name === ChessPieceName.PAWN &&
        this.getPiece(x, y + 1).color === ChessPieceColor.BLACK) validMoves.push([x + 1, y - 1]);
    }
    else {
      if (this.isPlaceEmpty(x - 1, y)) validMoves.push([x - 1, y]);
      if (x === 6 && this.isPlaceEmpty(x - 2, y)) validMoves.push([x - 2, y]);
      if (this.isPieceEnemy(x - 1, y + 1, piece)) validMoves.push([x - 1, y + 1]);

      else if (this.gameMoves.length > 0 &&
        this.gameMoves[this.gameMoves.length - 1][0] == x - 2 &&
        this.gameMoves[this.gameMoves.length - 1][1] == y + 1 &&
        this.gameMoves[this.gameMoves.length - 1][2] == x &&
        this.gameMoves[this.gameMoves.length - 1][3] == y + 1 &&
        this.getPiece(x, y + 1).name === ChessPieceName.PAWN &&
        this.getPiece(x, y + 1).color === ChessPieceColor.WHITE) validMoves.push([x - 1, y + 1]);

      if (this.isPieceEnemy(x - 1, y - 1, piece)) validMoves.push([x - 1, y - 1]);

      else if (this.gameMoves.length > 0 &&
        this.gameMoves[this.gameMoves.length - 1][0] == x - 2 &&
        this.gameMoves[this.gameMoves.length - 1][1] == y - 1 &&
        this.gameMoves[this.gameMoves.length - 1][2] == x &&
        this.gameMoves[this.gameMoves.length - 1][3] == y - 1 &&
        this.getPiece(x, y - 1).name === ChessPieceName.PAWN &&
        this.getPiece(x, y - 1).color === ChessPieceColor.WHITE) validMoves.push([x - 1, y - 1]);
    }
    return validMoves;
  }
}
