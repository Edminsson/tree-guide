import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import {MatTree, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DataService, FoodNode } from '../data.service';

/**
 * @title Tree with flat nodes (childrenAccessor)
 */
@Component({
  selector: 'app-tree-custom',
  styleUrl: './tree-custom.scss',
  templateUrl: './tree-custom.html',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class TreeCustom implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly tree = viewChild<MatTree<FoodNode>>('tree');

  dataSource = signal<FoodNode[]>([]);

  /** Every node in the tree, depth first, with the chain of ancestors leading to it. */
  readonly items = computed(() => flatten(this.dataSource()));

  /** The node last revealed through {@link reveal}; rendered highlighted. */
  readonly selected = signal<FoodNode | undefined>(undefined);

  private readonly nodeIds = computed(
    () => new Map(this.items().map((item, i) => [item.node, i] as const)),
  );

  /** Indent per level in px; must match --tree-indent in tree-custom.scss. */
  readonly indent = INDENT;

  private guides: Map<FoodNode, Record<string, string>> | undefined;

  ngOnInit() {
    this.loadData();
  }

  reloadData() {
    this.loadData(true);
  }

  loadData(isReload: boolean = false) {
      this.dataService.getTreeData().subscribe(data => {
      if (isReload) {
        data[0].name = 'Reloaded Fruit';
        data[1]!.children![0].name = 'Verde';
        this.dataSource.set(data);
      } else {
        this.dataSource.set(data);
        this.guides = buildGuides(data);
        afterNextRender(() => this.tree()?.expandAll(), {injector: this.injector});
      }
    })
  }

  /** CSS custom properties consumed by the ::before / ::after guide pseudo-elements. */
  guide(node: FoodNode): Record<string, string> {
    return this.guides?.get(node) ?? {};
  }

  /** Expands the ancestors of `item`, highlights it and scrolls it into view. */
  reveal(item: TreeItem) {
    const tree = this.tree();
    item.ancestors.forEach((ancestor) => tree?.expand(ancestor));
    this.selected.set(item.node);
    afterNextRender(
      () => {
        const id = this.nodeIds().get(item.node);
        this.host.nativeElement
          .querySelector(`[data-node-id="${id}"]`)
          ?.scrollIntoView({block: 'nearest'});
      },
      {injector: this.injector},
    );
  }

  nodeId(node: FoodNode): number | undefined {
    return this.nodeIds().get(node);
  }

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}

const INDENT = 24;

export interface TreeItem {
  node: FoodNode;
  ancestors: FoodNode[];
  /** Full path, e.g. "Vegetables › Orange", to tell apart nodes that share a name. */
  label: string;
}

function flatten(nodes: FoodNode[], ancestors: FoodNode[] = []): TreeItem[] {
  return nodes.flatMap((node) => [
    {node, ancestors, label: [...ancestors, node].map((n) => n.name).join(' › ')},
    ...flatten(node.children ?? [], [...ancestors, node]),
  ]);
}

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
