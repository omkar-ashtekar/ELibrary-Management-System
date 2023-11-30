import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: ['quiz.component.css']
})
export class QuizComponent {
  books = [  // Define your list of books here
    { title: 'Book 1' },
    { title: 'Book 2' },
    { title: 'Book 3' }
  ];

  selectedBook: any = null;

  startQuiz(book: any): void {
    this.selectedBook = book;
  }
}
