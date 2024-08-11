// Navbar Component
const Navbar = {
    template: `
        <nav>
            <h1>My Book Collection</h1>
        </nav>
    `
};

// Book List Component
const BookList = {
    props: ['books'],
    template: `
        <div>
            <h2>Book List</h2>
            <ul>
                <li v-for="book in books" :key="book.title" :style="getBookStyle">
                    <strong>{{ book.title }}</strong> by {{ book.author }}
                </li>
            </ul>
        </div>
    `,
    methods: {
        getBookStyle() {
            return {
                backgroundImage: 'url("/images/books.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
                color: '#fff',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginBottom: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
            };
        }
    }
};


// Add Book Component
const AddBook = {
    data() {
        return {
            newBook: { title: '', author: '' }
        };
    },
    methods: {
        addBook() {
            if (this.newBook.title && this.newBook.author) {
                this.$emit('book-added', this.newBook);
                this.newBook = { title: '', author: '' };
            }
        }
    },
    template: `
        <div>
            <h2>Add a New Book</h2>
            <input v-model="newBook.title" placeholder="Book Title" />
            <input v-model="newBook.author" placeholder="Author" />
            <button @click="addBook">Add Book</button>
        </div>
    `
};

// Vue Instance
const app = Vue.createApp({
    components: {
        'navbar': Navbar,
        'book-list': BookList,
        'add-book': AddBook
    },
    data() {
        return {
            books: [
                { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
                { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
            ]
        };
    },
    methods: {
        addBookToList(newBook) {
            this.books.push(newBook);
        }
    },
    template: `
        <div>
            <navbar></navbar>
            <book-list :books="books"></book-list>
            <add-book @book-added="addBookToList"></add-book>
        </div>
    `
});

app.mount('#app');

