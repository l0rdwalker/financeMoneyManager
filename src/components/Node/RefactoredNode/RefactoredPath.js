import "./Path.css"
import "./RefactoredNode"
import React from 'react';

class Path extends React.Component {
  constructor(props){  
    super(props);
    this.latch = props.latch;
    console.log(props);
    this.childNode = new Node(props);
  }

  assignParent(parentObject) {
    this.parentNode = parentObject;
  }

  calculatePos(parentx,parenty,childx,childy) {
    var a = parseInt(parentx - childx);
    var b = parseInt(parenty - childy);
    var c = Math.sqrt(a * a + b * b);

    if (a > 0) {
      b = b * -1;
      this.angle = 180 - this.radians_to_degrees(Math.asin(b / c));
    } else {
      this.angle = 360 - this.radians_to_degrees(Math.asin(b / c));
    }

    this.width = c;
  }

  radians_to_degrees(radians)
  {
    var pi = Math.PI;
    return radians * (180/pi);
  }

  SetClampPost() {
    var LorR;

    if (this.latch == 1) {
      LorR = "R"
    } else {
      LorR = "L"
    }

    /*
    var NodeWidth = document.getElementById(this.parent.getName()).getBoundingClientRect().width;
    var LatchWidth = document.getElementById(this.parent.getName() + LorR).getBoundingClientRect().width;
    var NodeHeight = document.getElementById(this.parent.getName() + LorR).getBoundingClientRect().height;
    */

    var NodeWidth = 150;
    var LatchWidth = 25;
    var NodeHeight = 50;

    if (this.latch == 1) {
      this.parentX = parseInt(this.parent.getX()) + (NodeWidth / 2) - LatchWidth;
      this.parentY = parseInt(this.parent.getY()) + (NodeHeight / 2) - 10;
    } else {
      this.parentX = parseInt(this.parent.getX()) - (NodeWidth / 2) + LatchWidth;
      this.parentY = parseInt(this.parent.getY()) + (NodeHeight / 2);
    }
  }

  updateDOM() {
    var DOMelement = document.getElementById(this.name);

    var width = (document.getElementById(this.child.getName()).clientWidth / 2);

    DOMelement.style.top = this.parentPathY + "px";
    DOMelement.style.left = (this.parentPathX + width) + "px";
    DOMelement.style.width = this.width + "px";
    DOMelement.style.transform = "rotate("+(this.angle)+"deg)";
  }



  render() {
    this.SetClampPost();

    this.childX = parseInt(this.child.getX());
    this.childY = parseInt(this.child.getY());

    this.calculatePos(this.parentPathX,this.parentPathY,this.childX,this.childY);

    const path = (<div id={this.name} className='Path'style={{
      top: this.parentPathY,
      left: this.parentPathX+75,
      width: this.width,
      transform: "rotate("+(this.angle)+"deg)"
    }}></div>);

    const DivElements = [path];
    
    const Elements = this.child.render();

    for (var x = 0; x < Elements.length; x++) {
      DivElements.push(Elements[x]);
    }

    return DivElements;

  }
}

export default Path;