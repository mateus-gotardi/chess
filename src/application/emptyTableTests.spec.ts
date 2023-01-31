import { createEmptyTable } from "./createEmptyTable";
import { TableChess } from "./table-chess";
import { ChessPieceName, ChessPieceColor } from "./chess.piece";
let TABLE: TableChess;

describe("createEmptyTable", () => {
  it("should create an empty table", () => {
    const table = createEmptyTable();
    TABLE = new TableChess(table)
    expect(TABLE).toBeTruthy();
  });
});
