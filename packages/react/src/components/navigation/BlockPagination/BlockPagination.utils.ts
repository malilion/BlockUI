export type PaginationEntry = number | "start-ellipsis" | "end-ellipsis";

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);
}

/**
 * Page numbers to render, with ellipses for skipped runs. The list always has
 * the same length for a given `pageCount`, so the control does not jump around.
 */
export function getPaginationRange(
  page: number,
  pageCount: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationEntry[] {
  // Boundaries + siblings + current + two ellipses.
  const total = boundaryCount * 2 + siblingCount * 2 + 3;
  if (pageCount <= total) return range(1, pageCount);

  const startPages = range(1, boundaryCount);
  const endPages = range(pageCount - boundaryCount + 1, pageCount);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, pageCount - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    pageCount - boundaryCount - 1,
  );

  return [
    ...startPages,
    siblingsStart > boundaryCount + 2 ? "start-ellipsis" : boundaryCount + 1,
    ...range(siblingsStart, siblingsEnd),
    siblingsEnd < pageCount - boundaryCount - 1 ? "end-ellipsis" : pageCount - boundaryCount,
    ...endPages,
  ];
}
