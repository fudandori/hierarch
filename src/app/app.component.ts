import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HierarchComponent, Node } from './hierarch/hierarch.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'Hierarch';

  @ViewChild('hierarch') hierarch: HierarchComponent;

  private root = new Node('root');

  constructor() {
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

    this.root.children = [new Node('CC'),A, AH,  new Node('GG'), S, W];
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
    AF.children = [new Node('KU'), new Node('AK')];
    T.children = [new Node('TT')]
  }

  ngAfterViewInit() {
    this.hierarch.draw(this.root);
  }

  
}
