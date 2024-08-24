const express = require("express");
const app = express();
const port = 5000;

// Sample JSON data
const data = [
  { id: 1, name: "Item 1", category: "A" },
  { id: 2, name: "Item 2", category: "B" },
  { id: 3, name: "Item 3", category: "A" },
  { id: 4, name: "Item 4", category: "C" },
  { id: 5, name: "Item 5", category: "B" },
  { id: 6, name: "Item 6", category: "A" },
  { id: 7, name: "Item 7", category: "C" },
  { id: 8, name: "Item 8", category: "B" },
  { id: 9, name: "Item 9", category: "A" },
  { id: 10, name: "Item 10", category: "C" },
];

app.get("/items", (req, res) => {
  const { page = 1, limit = 5, category } = req.query;

  let filteredData = data;

  // Filter
  if (category) {
    filteredData = filteredData.filter((item) => item.category === category);
  }

  // Paginatation
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  res.json({
    totalItems: filteredData.length,
    currentPage: parseInt(page),
    totalPages: Math.ceil(filteredData.length / limit),
    data: paginatedData,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
