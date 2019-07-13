import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Hierarch';
  min = 0;

  @ViewChild('canvas') canvas: ElementRef;

  private obj = new Node('root');

  constructor(private rend: Renderer2) {
    const A = new Node('A');
    const B = new Node('B');
    const C = new Node('C');
    const D = new Node('D');
    const E = new Node('E');
    const F = new Node('F');
    const G = new Node('G');
    const H = new Node('H');
    const I = new Node('I');
    const J = new Node('J');
    const K = new Node('K');
    const L = new Node('L');
    const M = new Node('M');
    const N = new Node('N');
    const O = new Node('O');
    const P = new Node('P');
    const Q = new Node('Q');
    const R = new Node('R');
    const S = new Node('S');
    const T = new Node('T');
    const U = new Node('U');
    const V = new Node('V');
    const W = new Node('W');
    const X = new Node('X');
    const Y = new Node('Y');
    const Z = new Node('Z');
    const AA = new Node('AA');
    const AB = new Node('AB');
    const AC = new Node('AC');
    const AD = new Node('AD');
    const AE = new Node('AE');
    const AF = new Node('AF');
    const AG = new Node('AG');
    const AH = new Node('AH');

    AH.children = [new Node('UWU')];
    this.obj.children = [A, AH, S, W];
    A.children = [B, C];
    B.children = [D];
    D.children = [E, F, new Node('XX'), G];
    E.children = [H, I, J];
    F.children = [K, L, M, N, O, P];
    G.children = [Q, R];
    S.children = [T, U, V];
    W.children = [X, Y, Z, AA];
    U.children = [AB, AC, AD];
    AD.children = [AE];
    C.children = [AF, AG];
    AF.children = [new Node('KU'), new Node('AK')]
  }

  ngOnInit() {
    this.init(this.obj, -1);
    this.center(this.obj);
    this.obj.children
      .filter(c => c.i > 0)
      .forEach(c => this.displace(c, c.w));

    this.detach(this.obj, null);
    this.setMin(this.obj);
    this.displace(this.obj, Math.abs(this.min));
    this.centerRoot();
    this.print(this.obj);
  }

  private centerRoot() {
    this.obj.x = this.obj.children[0].x + (this.obj.children[this.obj.children.length - 1].x - this.obj.children[0].x)/2 + .5;
  }

  private searchSibling(node: Node, pos: number): Node {
    for (let i = pos; i >= 0; i--)
      if (node.children[i] && node.children[i].children) return node.children[i];
  }

  private detach(node: Node, parent: Node) {
    if (node.children) {
      node.children.forEach(c => this.detach(c, node));

      if (node.i > 0 && parent) {
        const sibling = this.searchSibling(parent, node.i - 1)

        if (sibling) {

          if (sibling.children && this.rightContour(sibling) >= this.leftContour(node)) {
            this.displace(node, this.rightContour(sibling) - this.leftContour(node) + 1);
          }
        }
      }
    }
  }

  private setMin(node: Node) {
    if (node.children) {
      node.children.forEach(c => {
        if (this.min > c.x) this.min = c.x;
        this.setMin(c);
      })
    }
  }

  private init(node: Node, level: number) {
    level++;

    node.y = level;

    if (node.children) {
      let w = 0;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        child.x = i;
        child.i = i;
        this.init(child, level);

        w += child.w;
      }

      node.w = w;
    }
  }

  private center(node: Node) {
    if (node.children) {
      const distance = node.children[node.children.length - 1].x - node.children[0].x + 1;
      node.children.forEach(c => {
        const offset = 0.5 + c.i - distance / 2;
        c.x = node.x + offset;

        this.center(c);
      });
    }
  }

  private displace(node: Node, x: number) {
    node.x += x;

    if (node.children) {
      node.children.forEach(c => this.displace(c, x));
    }
  }

  private leftContour(node: Node): number {
    let r = node.x;

    if (node.children) {
      node.children.forEach(c => {
        let co = this.leftContour(c);
        if (r > co) r = co;
      })
    }

    return r;
  }

  private rightContour(node: Node): number {
    let r = node.x;

    if (node.children) {
      node.children.forEach(c => {
        let co = this.rightContour(c);
        if (r < co) r = co;
      })
    }

    return r;
  }

  private print(node: Node) {
    const div = document.createElement('div');
    const text = document.createElement('strong');

    text.innerHTML = node.name;
    div.appendChild(text);
    div.style.backgroundColor = 'SteelBlue';
    div.style.color = 'White';
    div.style.height = '50px';
    div.style.width = '50px';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.position = 'absolute';
    div.style.borderRadius = '5px';
    div.style.left = node.x * 55 + 'px';
    div.style.top = node.y * 100 + 'px';

    document.getElementById('canvas').appendChild(div);

    if (node.children) {
      node.children.forEach(c => this.print(c));
    }
  }

}


class Node {
  name: string;
  children: Node[];
  x = 0;
  y = 0;
  i = 0;
  w = 1;

  constructor(name: string) {
    this.name = name;
  }
}
