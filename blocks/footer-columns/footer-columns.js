export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // First row contains column headers
  const headerRow = rows[0];
  const headers = [...headerRow.children];

  // Create container for all columns
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'footer-columns-container';

  // Create each column
  headers.forEach((header, colIndex) => {
    const column = document.createElement('div');
    column.className = 'footer-column';

    // Add column header
    const headerDiv = document.createElement('div');
    headerDiv.className = 'footer-column-header';
    headerDiv.innerHTML = header.innerHTML;
    column.appendChild(headerDiv);

    // Create list for column links
    const linksList = document.createElement('ul');
    linksList.className = 'footer-column-links';

    // Collect all links for this column from subsequent rows
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
      const row = rows[rowIndex];
      const cells = [...row.children];
      const cell = cells[colIndex];

      // Skip empty cells
      if (!cell || !cell.textContent.trim()) {
        // eslint-disable-next-line no-continue
        continue;
      }

      // Create list item
      const listItem = document.createElement('li');
      listItem.innerHTML = cell.innerHTML;
      linksList.appendChild(listItem);
    }

    // Only add the list if it has items
    if (linksList.children.length > 0) {
      column.appendChild(linksList);
    }

    columnsContainer.appendChild(column);
  });

  // Replace block content with new structure
  block.textContent = '';
  block.appendChild(columnsContainer);
}
