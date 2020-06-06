import { Component, Input, OnInit } from '@angular/core';

interface Node {
  id: string; // unique across graph
  parents: string[]; // array of ids of nodes who are parents of this node
  children: string[]; // array of ids of nodes who are children of this node
  x: number; // negative || positive integer
  y: number; // negative || positive integer
}
@Component({
  selector: 'interview-graph',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  graph: Node[] = [
    {
      id: 'root',
      parents: [],
      children: ['a', 'b', 'c'],
      x: 50,
      y: 1
    },
    {
      id: 'a',
      parents: ['root'],
      children: ['d', 'e'],
      x: -10,
      y: 2
    },
    {
      id: 'b',
      parents: ['root'],
      children: ['e', 'z'],
      x: 20,
      y: 2
    },
    {
      id: 'c',
      parents: ['root'],
      children: ['f', 'g', 'h'],
      x: 29,
      y: 2
    },
    {
      id: 'z',
      parents: ['b'],
      children: [],
      x: 5,
      y: 3
    },
    {
      id: 'd',
      parents: ['a'],
      children: [],
      x: 5,
      y: 3
    },
    {
      id: 'e',
      parents: ['a', 'b'],
      children: ['ee'],
      x: 5,
      y: 3
    },
    {
      id: 'ee',
      parents: ['e', 'f', 'h'],
      children: [],
      x: 5,
      y: 4
    },
    {
      id: 'f',
      parents: ['c'],
      children: ['ee'],
      x: 50,
      y: 3
    },
    {
      id: 'g',
      parents: ['c'],
      children: ['gg'],
      x: 41,
      y: 3
    },
    {
      id: 'gg',
      parents: ['g'],
      children: [],
      x: 1,
      y: 4
    },
    {
      id: 'h',
      parents: ['c'],
      children: ['ee'],
      x: 61,
      y: 3
    },
  ]

  violatingNodes: Node[] = [];
  leafNodes: Node[] = [];

  ngOnInit() {
    this.violatingNodes = this.getNodesTooClose(this.graph, 10);
  }


  // METHODS TO IMPLEMENT BELOW //


  /**
   * Given a graph and a non-negative number 'minimum distance', return an array of all nodes in that are
   * violating the 'sibling distance rule'.
   * 
   * A node is violating the 'sibling distance rule' if its x position is less than {@param minimumDistance}
   * units away from the x position of a sibling.
   * 
   * All children of a node are considered 'siblings'.
   * 
   * 
   * @param graph: array of Node that represent all the nodes in our graph
   * @param minimumDistance: non-negative number. 
   * 
   * @return the array of nodes that are 'too close' with at least one of its siblings
   */
  getNodesTooClose(graph: Node[], minimumDistance: number): Node[] {
    // implement!

    // in the interview I thought I was comapring the children to all the other children to see if any set of 2 children of a node had x values that were outside of the distance... this is a much harder problem than comparing all of the children to the parent x... and is what I got hung on at the very end.

    // I made it a little more readable, and a lot more efficient after fiddling with it for a minute
    
    // make a map O(n)
    var map = new Map( graph.map(node => [node.id, node] as [string, Node]));
    
    return graph.filter(node => {//O(n)
      var childrenOutside = node.children
      .map(child => {return map.get(child);})//now O(1) not O(n) 
      .filter(child => node.x - child.x > minimumDistance)

      return childrenOutside.length > 0;
    });
    //we should now be O(n^2*m) I wont say n^3 because m is really going to be the average degree of each node in the graph. if we built the data structure as a hash (assuming uniqueness in the data) then we would be at O(n*m) which may be as good as we can get.
  }
}
