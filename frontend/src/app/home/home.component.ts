import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = ['Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography'];

  books = [
    {
      title: 'Book 1',
      author: 'Author 1',
      description: 'Description for Book 1',
      price: 10.99,
      rating: 4.5,
      image: 'ilcacciatore.jpg'
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      description: 'Description for Book 2',
      price: 12.99,
      rating: 4.0,
      image: 'ciccio.jpeg'
    },
    {
      title: 'Book 3',
      author: 'Author 3',
      description: 'Description for Book 3',
      price: 15.99,
      rating: 4.8,
      image: 'ilmondoalcontrario.jpg'
    }
  ];

  featuredBooks = [
    {
      title: 'Featured Book 1',
      author: 'Featured Author 1',
      description: 'Description for Featured Book 1',
      price: 19.99,
      image: 'featured-book1.jpg'
    },
    {
      title: 'Featured Book 2',
      author: 'Featured Author 2',
      description: 'Description for Featured Book 2',
      price: 22.99,
      image: 'featured-book2.jpg'
    },
    {
      title: 'Featured Book 3',
      author: 'Featured Author 3',
      description: 'Description for Featured Book 3',
      price: 18.99,
      image: 'featured-book3.jpg'
    },
    {
      title: 'Featured Book 4',
      author: 'Featured Author 4',
      description: 'Description for Featured Book 4',
      price: 20.99,
      image: 'featured-book4.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
