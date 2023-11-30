import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "@app/_models";

@Component({
  selector: 'app-surf',
  templateUrl: 'surf.component.html',
  styleUrls: ['surf.component.css']
})
export class SurfComponent implements OnInit {
  // Initialize your filter variables
  nameFilter: string = '';
  authorFilter: string = '';
  categoryFilter: string = '';
  filteredBooks: any[] = [];
  user: User = { bookSubscribed: [] }; // Initialize user with an empty bookSubscribed array

  // Initialize the list of books
  books: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // Load your book data here, e.g., make an HTTP request.
    this.http.get('assets/books.json').subscribe((data: any) => {
      this.books = data;
      this.filteredBooks = this.books;
      this.applyFilters();
    });

    // Load user data from localStorage
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      this.user = JSON.parse(userDataString);
    }
  }

  subscribeBook(bookId: string) {
    // Check if the book ID is not already in the subscriptionBooks array
    if (this.user && this.user.bookSubscribed && !this.user.bookSubscribed.includes(bookId)) {
      // Add the book ID to the subscriptionBooks array
      this.user.bookSubscribed.push(bookId);
  
      // Update elibrary-users
      let users = JSON.parse(localStorage.getItem('elibrary-users')!) || [];
      const existingUserIndex = users.findIndex((u: any) => u.id === this.user.id);
      if (existingUserIndex !== -1) {
        // Update only the bookSubscribed field
        users[existingUserIndex].bookSubscribed = this.user.bookSubscribed;
        localStorage.setItem('elibrary-users', JSON.stringify(users));
      }
  
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }
  

  applyFilters() {
    this.filteredBooks = this.books.filter((book) => {
      return (
        book.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        book.author.toLowerCase().includes(this.authorFilter.toLowerCase()) &&
        book.category.toLowerCase().includes(this.categoryFilter.toLowerCase())
      );
    });
  }
}















// import { Component, OnInit } from "@angular/core";
// import { HttpClient } from '@angular/common/http';

// import { User } from "@app/_models";

// @Component({selector: 'app-surf',
//     templateUrl: 'surf.component.html',
//     styleUrls: ['surf.component.css']})
// export class SurfComponent implements OnInit {
//     // Initialize your filter variables
//     nameFilter: string = '';
//     authorFilter: string = '';
//     categoryFilter: string = '';
//     filteredBooks: any[] = [];

//     // Initialize the list of books
//     books: any[] = [];

//     constructor(private http: HttpClient) {
//     }
  
//     ngOnInit() {
//       // Load your book data here, e.g., make an HTTP request.
//       this.http.get('assets/books.json').subscribe((data: any) => {
//         this.books = data;
//         this.filteredBooks = this.books;
//         this.applyFilters();
//       });
//   }

//   subscribeBook(bookId: string) {
//     // Get the user data from localStorage
//     const userDataString = localStorage.getItem('elibrary-users');
//     console.log('User data:', userDataString);
//     if (userDataString) {
//       const userData = JSON.parse(userDataString);
//       // Check if the book ID is not already in the subscriptionBooks array
//       if (userData.bookSubscribed && !userData.bookSubscribed.includes(bookId)) {
//         // Add the book ID to the subscriptionBooks array
//         userData.bookSubscribed.push(bookId);
//         // Update user data in localStorage
//         localStorage.setItem('user', JSON.stringify(userData));
//       }
//     }

//   }
  
//     applyFilters() {
//       this.filteredBooks = this.books.filter((book) => {
//         return (
//           book.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
//           book.author.toLowerCase().includes(this.authorFilter.toLowerCase()) &&
//           book.category.toLowerCase().includes(this.categoryFilter.toLowerCase())
//         );
//       });
//     }
    
// }
