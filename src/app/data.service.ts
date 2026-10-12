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
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
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
    ],
  },
];
