import {Component, computed, inject} from '@angular/core';
import {Directionality} from '@angular/cdk/bidi';
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
  selector: 'app-tree',
  styleUrl: './tree.scss',
  templateUrl: './tree.html',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class Tree {
  dataSource = EXAMPLE_DATA;

  /** Indent per level in px; must match the guide geometry below. */
  readonly indent = INDENT;

  private readonly dir = inject(Directionality);

  /** Background layers (guide lines + elbow) for every node, rebuilt when the direction changes. */
  private readonly guides = computed(() => {
    const rtl = this.dir.valueSignal() === 'rtl';
    const result = new Map<FoodNode, GuideStyle>();
    const walk = (nodes: FoodNode[], continuing: boolean[]) => {
      nodes.forEach((node, i) => {
        const isLast = i === nodes.length - 1;
        result.set(node, buildGuide(continuing, isLast, !node.children?.length, rtl));
        if (node.children?.length) {
          walk(node.children, [...continuing, !isLast]);
        }
      });
    };
    // Root nodes have no guides; their children start the first guide column.
    this.dataSource.forEach((root) => {
      if (root.children?.length) {
        walk(root.children, []);
      }
    });
    return result;
  });

  guide(node: FoodNode): GuideStyle {
    return this.guides().get(node) ?? NO_GUIDE;
  }

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}

interface GuideStyle {
  image: string;
  size: string;
  position: string;
}

const INDENT = 24;
const NO_GUIDE: GuideStyle = {image: 'none', size: 'auto', position: '0 0'};
const LINE = 'linear-gradient(var(--tree-guide-color), var(--tree-guide-color))';

/**
 * Builds the background layers for one node.
 * `continuing[k]` says whether the guide in ancestor column k runs through this row (the
 * ancestor at that level has later siblings). The node's own column is `continuing.length`:
 * a full line when more siblings follow, or a line stopping at the elbow when this is the
 * last sibling.
 */
function buildGuide(
  continuing: boolean[],
  isLast: boolean,
  isLeaf: boolean,
  rtl: boolean,
): GuideStyle {
  const layers: {w: string; h: string; x: number; y: string}[] = [];
  continuing.forEach((through, k) => {
    if (through) {
      layers.push({w: '1px', h: '100%', x: k * INDENT + INDENT / 2, y: 'top'});
    }
  });
  const x = continuing.length * INDENT + INDENT / 2;
  layers.push({w: '1px', h: isLast ? '50%' : '100%', x, y: 'top'});
  // Elbow: leaves also span the spacer button so the line reaches the text.
  const elbowWidth = isLeaf ? INDENT - 4 + INDENT / 2 : INDENT / 2;
  layers.push({w: `${elbowWidth}px`, h: '1px', x, y: '50%'});
  return {
    image: layers.map(() => LINE).join(', '),
    size: layers.map((l) => `${l.w} ${l.h}`).join(', '),
    position: layers
      .map((l) => (rtl ? `right ${l.x}px top ${l.y}` : `${l.x}px ${l.y === 'top' ? '0' : l.y}`))
      .join(', '),
  };
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

