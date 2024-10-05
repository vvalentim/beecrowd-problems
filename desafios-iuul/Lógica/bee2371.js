import { input_2371 as input } from "./input.js";
// const input = require("fs").readFileSync("/dev/stdin", "utf8");
// import { memoryUsage } from "node:process";

/**
 * 1. Extrair quantidade linhas/colunas do tabuleiro.
 *
 * 2. Mapear as peças (coordenadas) dos navios no tabuleiro (como detectar as posições das partes de um navio?).
 *
 * 3. Identificar se o tiro disparado atingiu uma peça de navio e se sim, buscar a qual instância de navio aquela peça pertence.
 */

const SHIP_PIECE = "#";
const VECTORS = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
];

class Ship {
  _parts = [];
  _partsHit = [];
  _sunken = false;

  constructor(parts) {
    this._parts = parts;
  }

  get sunken() {
    return this._sunken;
  }

  detectHit(part) {
    if (this._parts.includes(part) && !this._partsHit.includes(part)) {
      this._partsHit.push(part);

      if (this._partsHit.length === this._parts.length) {
        this._sunken = true;
        // console.log(`SHIP HAS SUNK`);
      }

      return true;
    }

    return false;
  }
}

class Board {
  _rows = 0;
  _columns = 0;
  _pieces = [];
  _ships = [];
  _visited = [];

  constructor(rows, columns, pieces) {
    this._rows = rows;
    this._columns = columns;
    this._pieces = pieces;
  }

  get ships() {
    return this._ships;
  }

  _getVectorPosition(row, column) {
    return row * this._columns + column;
  }

  _getAdjacentShipTiles(startingRow, startingColumn) {
    const tiles = [];
    const stack = [[startingRow, startingColumn]];

    while (stack.length) {
      const last = stack.pop();
      const [row, col] = last;

      const position = this._getVectorPosition(row, col);

      // Verificar se a posição atual já foi visitada.
      if (!this._visited.includes(position) && this._pieces[row][col] === SHIP_PIECE) {
        this._visited.push(position);
        tiles.push(position);

        // Identificar quais são as peças adjacentes e que possuem uma peça de navio.
        for (let i = 0; i < VECTORS.length; i++) {
          const neighborRow = row + VECTORS[i][0];
          const neighborCol = col + VECTORS[i][1];

          if (neighborRow < 0 || neighborRow >= this._rows) continue;
          if (neighborCol < 0 || neighborCol >= this._columns) continue;
          if (this._pieces[neighborRow][neighborCol] !== SHIP_PIECE) continue;

          stack.push([neighborRow, neighborCol]);
        }
      }
    }

    return tiles;
  }

  mapShipParts() {
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._columns; col++) {
        const position = this._getVectorPosition(row, col);

        if (!this._visited.includes(position) && this._pieces[row][col] === SHIP_PIECE) {
          // Obtém as linhas/colunas com as peças adjacentes do navio e transforma os valores em índices de um vetor.
          const parts = this._getAdjacentShipTiles(row, col).sort((a, b) => a - b);

          const ship = new Ship(parts);

          this._ships.push(ship);
        }
      }
    }
  }

  shoot(row, column) {
    // Normalizar para índice iniciando em zero.
    row--;
    column--;

    if (this._pieces[row][column] === SHIP_PIECE) {
      const position = this._getVectorPosition(row, column);
      let hit = false;

      for (const ship of this._ships) {
        if (ship.detectHit(position)) {
          hit = true;
          break;
        }
      }

      // if (hit) {
      //   console.log(`BOMBED AT ${position}`);
      // }
    }
  }

  countSunkenShips() {
    return this._ships.reduce((accumulator, current) => {
      return current.sunken ? accumulator + 1 : accumulator;
    }, 0);
  }
}

const main = (input) => {
  const lines = input.split("\n");

  const [rows, columns] = lines[0].split(" ").map(Number);
  const pieces = lines.slice(1, rows + 1).map((row) => row.split(""));
  const numShots = Number(lines[rows + 1]);

  const gameBoard = new Board(rows, columns, pieces);

  gameBoard.mapShipParts();
  // console.log(gameBoard.ships);

  for (let shot = 0; shot < numShots; shot++) {
    const [row, column] = lines[rows + 2 + shot].split(" ").map(Number);

    gameBoard.shoot(row, column);
  }

  console.log(gameBoard.countSunkenShips());
};

// console.time("w");
// main(input[0]);
main(input);
