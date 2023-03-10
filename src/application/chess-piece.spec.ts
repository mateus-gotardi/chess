import { ChessPiece, ChessPieceColor, ChessPieceName } from "./chess.piece";

describe("ChessPiece", () => {
    it("should create a new piece", () => {
        const piece = new ChessPiece({ name: ChessPieceName.KING, color: ChessPieceColor.WHITE, isMoved: false, isWhiteAttacked: false, isBlackAttacked: false })
        expect(piece).toBeTruthy();
    });
});