import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'fdn-hierarch',
  templateUrl: './hierarch.component.html',
  styleUrls: ['./hierarch.component.css']
})
export class HierarchComponent {

  @Input() height = 50;
  @Input() width = 50;
  @Input() vGap = 10;
  @Input() hGap = 5;
  @Input() fontColor = '#ffffff';
  @Input() backgroundColor = '#4682b4';
  @Input() border = '0px solid transparent';
  @Input() borderRadius = 5;

  private min = 0;
  private vmax = 0;
  private hmax = 0;

  @HostListener('window:resize', ['$event'])
  resize(event) {


    const c = document.getElementById("can") as HTMLCanvasElement;
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(630, 50);
    ctx.lineTo(630, 60);
    ctx.stroke();
  }

  /**
   * Draws the hierarchy tree on the canvas.
   * @param root the root element of the hierarchy tree 
   */
  public draw(root: Node) {
    this.deploy(root, -1);
    this.center(root);

    this.disengage(root, null);

    this.setMinMax(root);
    this.displace(root, Math.abs(this.min));
    root.center();
    this.print(root);
    let canvas = document.getElementById('can') as HTMLCanvasElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log('min:' + this.min + ' vmax:' + this.vmax + ' hmax:' + this.hmax);
  }

  /**
  * Searchs for the left-most node of the same parent that carries children
  * @param node Parent node to look into
  * @param pos Index to start searching
  */
  private searchSibling(node: Node, pos: number): Node {
    for (let i = pos; i >= 0; i--)
      if (node.children[i] && node.children[i].hasChildren()) return node.children[i];
  }

  /**
   * Displaces the node descendants from left to right so that the siblings descendants do not stack on top of each other
   * @param node The no
   * @param parent 
   */
  private disengage(node: Node, parent: Node) {
    if (node.hasChildren()) {
      node
        .children
        .forEach(c => this.disengage(c, node));

      if (node.i > 0 && parent) {
        const sibling = this.searchSibling(parent, node.i - 1)

        if (sibling && sibling.hasChildren()) {
          const rightContour = this.contour(sibling, 'right');
          const leftContour = this.contour(node, 'left');

          if (rightContour >= leftContour) {
            this.displace(node, rightContour - leftContour + 1);
          }
        }
      }
    }
  }

  private setMinMax(node: Node) {
    node
      .children
      .forEach(c => {
        if (this.min > c.x) this.min = c.x;
        if (this.hmax < c.x) this.hmax = c.x;
        if (this.vmax < c.y) this.hmax = c.y;
        this.setMinMax(c);
      })
  }

  /**
   * Sets the initial conditions of the hierarchy tree
   * @param node The root node
   * @param level The initial level
   */
  private deploy(node: Node, level: number) {
    level++;

    node.y = level;

    node
      .children
      .forEach((c, i) => {
        c.x = i;
        c.i = i;
        this.deploy(c, level);
      });
  }

  private center(node: Node) {
    if (node.hasChildren()) {
      const distance = node.children[node.children.length - 1].x - node.children[0].x + 1;
      node
        .children
        .forEach(c => {
          const offset = 0.5 + c.i - distance / 2;
          c.x = node.x + offset;

          this.center(c);
        });
    }
  }

  /**
   * Moves the node and all its descendants a given amount of units horizontally
   * @param node The node to be displaced
   * @param x The number of units to displace
   */
  private displace(node: Node, x: number) {
    node.x += x;
    node
      .children
      .forEach(c => this.displace(c, x));
  }

  /**
   * Gets maximum contour of the node.
   * The contour of a node indicates what is the reach for every level of the branch
   * @param node Node to get the contour from
   * @param side string with the selected side of the node. It must be 'left' or 'right'
   */
  private contour(node: Node, side: string): number {
    let r = node.x;

    node.children.forEach(c => {
      let co = this.contour(c, side);
      if (side === 'right' && r < co) r = co;
      else if (side === 'left' && r > co) r = co;
    })

    return r;
  }

  /**
   * Creates the HTML element of the  node 
   * @param node Node to be represented by the element
   */
  private generateElement(node: Node): HTMLDivElement {
    const div = document.createElement('div');
    const text = document.createElement('strong');

    text.innerHTML = node.text;
    div.appendChild(text);
    div.style.backgroundColor = this.backgroundColor;
    div.style.color = this.fontColor;
    div.style.height = this.height.toString() + 'px';
    div.style.width = this.width.toString() + 'px';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.position = 'absolute';
    div.style.border = this.border;
    div.style.borderRadius = this.borderRadius.toString() + 'px';
    div.style.left = (node.x * (this.width + this.hGap)).toString() + 'px';
    div.style.top = (node.y * (this.height + this.vGap)).toString() + 'px';

    return div;
  }

  /**
   * Prints the input node's tree
   * @param node Node to be printed
   */
  private print(node: Node) {

    const el = this.generateElement(node);

    document
      .getElementById('canvas')
      .appendChild(el);

    node.children.forEach(c => this.print(c));


  }
}

export class Node {
  text: string;
  children = Array<Node>();
  x = 0;
  y = 0;
  i = 0;
  w = 1;

  constructor(name: string) {
    this.text = name;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  first(): Node {
    return this.children[0];
  }

  last(): Node {
    return this.children[this.children.length - 1];
  }

  center() {
    if (this.hasChildren) {
      this.x = 0.5 + this.first().x + (this.last().x - this.first().x) / 2;
    }
  }
}
