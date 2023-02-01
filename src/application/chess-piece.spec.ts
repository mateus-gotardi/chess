import { ChessPiece, ChessPieceColor, ChessPieceName } from "./chess.piece";

describe("ChessPiece", () => {
    it("should create a new piece", () => {
        const piece = new ChessPiece({name: ChessPieceName.KING, color: ChessPieceColor.WHITE, isAttacked: false, isMoved: false})
        expect(piece).toBeTruthy();
    });
});