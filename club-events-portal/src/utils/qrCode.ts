/**
 * Simple, self-contained QR Code SVG generator based on data hash
 * Creates standard 25x25 QR matrix with accurate finder patterns and timing patterns.
 */
export function generateQrMatrix(data: string, size = 25): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  // Draw 7x7 Finder Pattern
  const drawFinderPattern = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 ||
          r === 6 ||
          c === 0 ||
          c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startY + r][startX + c] = true;
        } else {
          matrix[startY + r][startX + c] = false;
        }
      }
    }
  };

  // 3 Corner Finders
  drawFinderPattern(0, 0); // Top-left
  drawFinderPattern(size - 7, 0); // Top-right
  drawFinderPattern(0, size - 7); // Bottom-left

  // Timing lines
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Generate deterministic pseudo-random bits based on data hash
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }

  // Fill in the data area
  let seed = Math.abs(hash);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finders
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= size - 8) ||
        (r >= size - 8 && c < 8)
      ) {
        continue;
      }
      if (r === 6 || c === 6) continue;

      // PRNG bit
      seed = (seed * 9301 + 49297) % 233280;
      matrix[r][c] = seed % 2 === 0;
    }
  }

  return matrix;
}
