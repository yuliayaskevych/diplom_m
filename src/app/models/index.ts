export interface User {
    email: string;
    username: string;
    age: number;
    friends: string[];
  }
  
  export interface Users {
    [key: string]: User
  }

  export interface Game {
    name: string;
    genre: string;
    about: string;
    price: number;
  }

  export interface Games {
    [key: string]: Game
  }

  export interface Task {
    title: string;
    description: string;
    topic: string;
    level: 'hard'|'medium'|'easy';
    id: string;
  }

  export interface Tasks {
    [key: string]: Task
  }