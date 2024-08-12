import "./Path.css"
import React from 'react';
import NewNode from "../Node/NewNode";

class Path extends React.Component {
  constructor(props){  
    super(props);
    this.data = props;
    this.latch = props.latch;

    this.calculatePos = this.calculatePos.bind(this);
    this.reDraw = this.reDraw.bind(this);
    this.updateDOM = this.updateDOM.bind(this);

    this.getName = this.getName.bind(this);
    this.associate = this.associate.bind(this);
    this.SetClampPost = this.SetClampPost.bind(this);
    
    this.PassDown = this.PassDown.bind(this);
    this.getNodeName = this.getNodeName.bind(this);
    this.jsonEncode = this.jsonEncode.bind(this);
  }

  PassDown(value) {
    this.child.PassDown(value);
  }

  jsonEncode(value) {
    return this.child.jsonEncode();
  }

  reRender() {
    this.parent.reRender();
  }

  getNodeName() {
    return this.child.getName();
  }

  associate(Object) {
    this.child = new NewNode(this.data);
    this.parent = Object;
    this.child.AssociateParent(this)
    this.name = this.child.getName() + this.parent.getName();
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

  getName(){
    return this.name;
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

  reDraw() {
    this.SetClampPost();

    /*
    this.parentX = document.getElementById(this.parent.getName()).style.x;
    this.parentY = document.getElementById(this.parent.getName()).style.y;

    this.childX = document.getElementById(this.child.getName()).style.x;
    this.childY = document.getElementById(this.child.getName()).style.y;
    */
   
    this.childX = parseInt(this.child.getX());
    this.childY = parseInt(this.child.getY());

    this.calculatePos(this.parentX,this.parentY,this.childX,this.childY);
    this.updateDOM();
  }

  updateDOM() {
    var DOMelement = document.getElementById(this.name);

    var width = (document.getElementById(this.child.getName()).clientWidth / 2);

    DOMelement.style.top = this.parentY + "px";
    DOMelement.style.left = (this.parentX + width) + "px";
    DOMelement.style.width = this.width + "px";
    DOMelement.style.transform = "rotate("+(this.angle)+"deg)";
  }

  Height() {
    return this.child.Height();
  }

  Position(x,y,sisterNum,index,width) {
    this.child.Position(x,y,sisterNum,index,width);
  }

  render() {
    this.SetClampPost();

    this.childX = parseInt(this.child.getX());
    this.childY = parseInt(this.child.getY());

    this.calculatePos(this.parentX,this.parentY,this.childX,this.childY);

    const path = (<div id={this.name} className='Path'style={{
      top: this.parentY,
      left: this.parentX+75,
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