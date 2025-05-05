import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CatalogueService {
  private readonly listItems = [
    {
      "id": 1,
      "name": "Tasty Concrete Keyboard",
      "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      "price": "677.00",
      "image": "http://placeimg.com/640/480/fashion"
    },
    {
      "id": 2,
      "name": "Ergonomic Metal Salad",
      "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      "price": "751.00",
      "image": "http://placeimg.com/640/480/fashion"
    },
    {
      "id": 3,
      "name": "Tasty Wooden Mouse",
      "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      "price": "433.00",
      "image": "http://placeimg.com/640/480/fashion"
    },
    {
      "id": 4,
      "name": "Handmade Fresh Bike",
      "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
      "price": "929.00",
      "image": "http://placeimg.com/640/480/fashion"
    },
    {
      "id": 5,
      "name": "Practical Fresh Chair",
      "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      "price": "551.00",
      "image": "http://placeimg.com/640/480/fashion"
    },
    {
      "id": 6,
      "name": "Awesome Rubber Cheese",
      "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      "price": "181.00",
      "image": "http://placeimg.com/640/480/fashion"
    },
  ];

  findOne(id: number) {
    const result = this.listItems.find(item => item.id == id);
    if (!result) throw new NotFoundError(`Item with id ${id} not found`);

    return result;
  }

  findAll() {
    return this.listItems;
  }
}
