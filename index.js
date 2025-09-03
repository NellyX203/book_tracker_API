const { json } = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running at http//localhost:${port}`);
});

let books = [
 { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018, completed: false },
 { id: 2, title: "Clean Code", author: "Robert C. Martin", year: 2008, completed: false }
];

app.get('/books', (req, res) => {
 res.json({ success: true, data: books });
});

app.get('/books/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const book = books.find(b => b.id === id);
 if (!book) return res.status(404).json({ success: false, message: "Book not found" });
 res.json({ success: true, data: book });
});

app.get('/books/search', (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Title query param required" });

  const results = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  res.json(results);
});

app.get('/books/completed', (req, res) => {
  const completedBooks = books.filter(book => book.completed === true);
  res.json(completedBooks);
});



app.post('/books', (req, res) => {
 const { title, author, year } = req.body;
 if (!title || !author || !year) {
   return res.status(400).json({ success: false, message: "All fields are required" });
 }
 const newBook = { id: books.length + 1, title, author, year, completed: false || req.body.completed, createdAt: new Date().toISOString()};
 books.push(newBook);
 res.status(201).json({ success: true, data: newBook });
if (!book.year || book.year <= 1900) {
  return res.status(400).json({ error: "Year must be greater than 1900" });
}

});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  if (req.body.year && req.body.year <= 1900) {
    return res.status(400).json({ error: "Year must be greater than 1900" });
  }

  // Update fields
  Object.assign(book, req.body);
  res.json({ message: "Book updated successfully", book });
});


app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books.splice(index, 1);
  res.json({ message: "Book deleted successfully" });
});


