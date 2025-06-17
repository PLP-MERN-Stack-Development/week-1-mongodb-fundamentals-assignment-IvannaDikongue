// Find all books in a specific genre
db.books.find({ genre: "Science Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

// Find books by a specific author
db.books.find({ author: "J.K. Rowling" })

// Update the price of a specific book
db.books.updateOne({ title: "The Great Gatsby" }, { $set: { price: 12.99 } })

// Delete a book by its title
db.books.deleteOne({ title: "Old Book Title" })


// Find books in stock and published after 2010 with projection
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Sort by price ascending
db.books.find().sort({ price: 1 })

// Sort by price descending
db.books.find().sort({ price: -1 })

// Pagination: 5 books per page, page 2 (skip first 5)
db.books.find().skip(5).limit(5)



// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: {
        decade: {
          $subtract: [
            { $year: { $toDate: { $concat: [ { $toString: "$published_year" }, "-01-01" ] } } },
            { $mod: [ "$published_year", 10 ] }
          ]
        }
      },
      count: { $sum: 1 }
    }
  }
])



// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Explain query performance before and after indexing
db.books.find({ title: "Some Book" }).explain("executionStats")

db.books.find({ author: "J.K. Rowling", published_year: { $gt: 2010 } }).explain("executionStats")
