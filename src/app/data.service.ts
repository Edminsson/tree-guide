import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Service()
export class DataService {
    public getTreeData(): Observable<FoodNode[]> {
        return of(EXAMPLE_DATA);
    }
}

const EXAMPLE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
      {
        name: 'Citrus',
        children: [{name: 'Orange'}, {name: 'Lemon'}, {name: 'Lime'}, {name: 'Grapefruit'}],
      },
      {
        name: 'Berries',
        children: [{name: 'Strawberry'}, {name: 'Blueberry'}, {name: 'Raspberry'}, {name: 'Blackberry'}],
      },
      {
        name: 'Tropical',
        children: [{name: 'Mango'}, {name: 'Pineapple'}, {name: 'Papaya'}],
      },
    ],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
      {
        name: 'Leafy',
        children: [{name: 'Spinach'}, {name: 'Kale'}, {name: 'Lettuce'}],
      },
      {
        name: 'Root',
        children: [{name: 'Beet'}, {name: 'Radish'}, {name: 'Turnip'}],
      },
    ],
  },
  {
    name: 'Grains',
    children: [
      {
        name: 'Rice',
        children: [{name: 'Basmati'}, {name: 'Jasmine'}, {name: 'Brown rice'}],
      },
      {
        name: 'Wheat',
        children: [{name: 'Durum'}, {name: 'Spelt'}],
      },
      {name: 'Oats'},
      {name: 'Barley'},
    ],
  },
  {
    name: 'Dairy',
    children: [
      {
        name: 'Cheese',
        children: [{name: 'Cheddar'}, {name: 'Brie'}, {name: 'Gouda'}, {name: 'Feta'}],
      },
      {
        name: 'Yogurt',
        children: [{name: 'Greek'}, {name: 'Plain'}],
      },
      {name: 'Butter'},
    ],
  },
  {
    name: 'Meat',
    children: [
      {
        name: 'Poultry',
        children: [{name: 'Chicken'}, {name: 'Turkey'}, {name: 'Duck'}],
      },
      {
        name: 'Red meat',
        children: [{name: 'Beef'}, {name: 'Lamb'}, {name: 'Pork'}],
      },
    ],
  },
  {
    name: 'Seafood',
    children: [
      {
        name: 'Fish',
        children: [{name: 'Salmon'}, {name: 'Tuna'}, {name: 'Cod'}],
      },
      {
        name: 'Shellfish',
        children: [{name: 'Shrimp'}, {name: 'Crab'}, {name: 'Lobster'}],
      },
    ],
  },
  {
    name: 'Nuts',
    children: [{name: 'Almond'}, {name: 'Walnut'}, {name: 'Cashew'}, {name: 'Pistachio'}],
  },
  {
    name: 'Beverages',
    children: [
      {
        name: 'Hot',
        children: [{name: 'Coffee'}, {name: 'Tea'}],
      },
      {
        name: 'Cold',
        children: [{name: 'Juice'}, {name: 'Lemonade'}],
      },
    ],
  },
];
