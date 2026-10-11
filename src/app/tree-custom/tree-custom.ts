import {Component} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/**
 * @title Tree with flat nodes (childrenAccessor)
 */
@Component({
  selector: 'app-tree-custom',
  styleUrl: './tree-custom.scss',
  templateUrl: './tree-custom.html',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class TreeCustom {
  dataSource = EXAMPLE_DATA;

  /** Indent per level in px; must match --tree-indent in tree-custom.scss. */
  readonly indent = INDENT;

  private readonly guides = buildGuides(EXAMPLE_DATA);

  /** CSS custom properties consumed by the ::before / ::after guide pseudo-elements. */
  guide(node: FoodNode): Record<string, string> {
    return this.guides.get(node) ?? {};
  }

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}

const INDENT = 24;

/** Offset (in CSS) of the vertical line in column `k`, flipped in RTL via `--guide-sign`. */
const columnOffset = (k: number) =>
  `calc(var(--guide-sign) * (${k} * var(--tree-indent) + var(--tree-indent) / 2 - 0.5px))`;

/**
 * Computes guide custom properties for every non-root node.
 * `continuing[k]` says whether the line in ancestor column k runs through the row (the ancestor
 * at that level has later siblings). The node's own column is `continuing.length`; its full
 * vertical line is only drawn when more siblings follow, otherwise the ::after elbow stops at
 * the row's middle.
 */
function buildGuides(roots: FoodNode[]): Map<FoodNode, Record<string, string>> {
  const result = new Map<FoodNode, Record<string, string>>();
  const walk = (nodes: FoodNode[], continuing: boolean[]) => {
    nodes.forEach((node, i) => {
      const isLast = i === nodes.length - 1;
      const isLeaf = !node.children?.length;
      const col = continuing.length;
      const columns = continuing.flatMap((through, k) => (through ? [k] : []));
      if (!isLast) {
        columns.push(col);
      }
      result.set(node, {
        '--guide-display': 'block',
        '--guide-col': String(col),
        // Leaves also span the spacer button so the connector reaches the text.
        '--guide-elbow': `calc(var(--tree-indent) * ${isLeaf ? 1.5 : 0.5} - ${isLeaf ? 4 : 0}px)`,
        '--guide-shadows': columns.length
          ? columns.map((k) => `${columnOffset(k)} 0 0 0 var(--tree-guide-color)`).join(', ')
          : 'none',
      });
      if (!isLeaf) {
        walk(node.children!, [...continuing, !isLast]);
      }
    });
  };
  // Root nodes have no guides; their children start the first guide column.
  roots.forEach((root) => walk(root.children ?? [], []));
  return result;
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

