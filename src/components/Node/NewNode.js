import './NewNode.scss'
import React from 'react';
import Path from '../Path/Path'

import MenuIcon from '@material-ui/icons/Menu';

class NewNode extends React.Component {
    constructor(props){  
        super(props);

        this.configWindow = window.config;
        this.tree = props.data;
        this.children = new Array(2);

        this.x = this.Center();
        this.y = 100;

        if (this.tree['rootNode'] != null) {
            this.name = 'rootNode';
            this.balence = 250;
        } else {
            this.name = props.name;
            this.balence = 0;
        }

        for (var x = 0; x < this.children.length; x++) {
            this.appendNode(x,props,this.tree[this.name][x]);
        }

        if (this.FinanaceConstructor(props.data[this.name][2])) {
            this.MethodSet = this.MethodSet.bind(this);
            this.MethodSet();
        }
    }


    MethodSet() {
        this.Position = this.Position.bind(this);
        this.Height = this.Height.bind(this);
        this.isLeaf = this.isLeaf.bind(this);

        this.getX = this.getX.bind(this);
        this.getY = this.getY.bind(this);
        this.getName = this.getName.bind(this);

        this.MouseDrag = this.MouseDrag.bind(this);
        this.MouseUp = this.MouseUp.bind(this);
        this.MouseMove = this.MouseMove.bind(this);

        this.setColor = this.setColor.bind(this);
        this.FinanaceConstructor = this.FinanaceConstructor.bind(this);
        this.CustomException = this.CustomException.bind(this);

        this.PassDown = this.PassDown.bind(this);
        this.updateDOM = this.updateDOM.bind(this);
        this.PassDownContent = this.PassDownContent.bind(this);

        this.createChild = this.createChild.bind(this);
        this.jsonEncode = this.jsonEncode.bind(this);
        this.makeid = this.makeid.bind(this);

        this.PrintJson = this.PrintJson.bind(this);
        this.reRender = this.reRender.bind(this);
        this.reDrawChildren = this.reDrawChildren.bind(this);

        this.testGlobalVariable = this.testGlobalVariable.bind(this); //this needs to be removed. TESTING ONLY
        this.getPercentages = this.getPercentages.bind(this); 
        this.getChildren = this.getChildren.bind(this);

        this.getBalence = this.getBalence.bind(this);

        this.ConfigWindow = window.config; //not sure if this is necessary. 
    }

    componentDidMount() {
        this.reRender();
    }

    PassDown(value) {
        if ((this.parent == null)) {
            displayValue = this.balence;
        } else {
            if (!(isNaN(value))) {
                this.balence = this.balence + value;
                var displayValue = value;
            } else {
                var displayValue = this.balence;
            }
        }

        this.updateDOM(displayValue);

        if (this.isLeaf()) {
            return
        } else {
            for (var x = 0; !(x > this.children.length); x++) {
                if (!(this.children[x] == null) && this.balence != 0) {
                    var PassValue =  this.balence * this.percentages[x];
                    displayValue = displayValue - PassValue;

                    var Element = document.getElementsByName(this.name+'Content')[0];
                    Element.style.backgroundColor = 'pink';

                    var Child = this.children[x];
                    setTimeout(this.PassDownContent.bind(Child,Child,PassValue,displayValue), 1000);
                }
            }

            if (!(this.isLeaf())) {
                this.balence = displayValue;
            }
        }
    }

    PassDownContent(Child,Val,displayValue) {
        var Element = document.getElementsByName(this.name+'Content')[0];
        Element.style.backgroundColor = 'orange';
        this.updateDOM(displayValue);        
        Child.PassDown(Val);
    }

    updateDOM(value) {
        var self = document.getElementById(this.name + "Balence");
        self.innerText = value;
    }

    FinanaceConstructor(data) {
        if (!(data.length == this.children.length)) {
            this.CustomException("error, cannot continue.");
            return false;
        }

        var CheckSum = 0;
        for (var i = 0; i < data.length; i++) {
            CheckSum = data[i] + CheckSum;
        }

        if (CheckSum > 1 || CheckSum < 0) {
            this.CustomException("error, cannot continue.");
            return false;
        } else {
            this.percentages = data;
        }

        return true;
    }

    AssociateParent(object) {
        this.parent = object;
    }

    //Movement Operations
    getBalence() {
        return this.balence;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getName(){
        return this.name;
    }

    getPercentages() {
        return this.percentages;
    }

    getChildren() {
        if (this.isLeaf()) {
            return null;
        } else {
            return this.children;
        }
    }

    MouseUp(){
        document.removeEventListener('mousemove', this.MouseMove);
    }

    MouseMove(e) {      
        var DOMelement = document.getElementById(this.name);

        var XoffSet = e.clientX;
        var YoffSet = e.clientY;

        DOMelement.style.top = (YoffSet) + "px";
        DOMelement.style.left = (XoffSet) + "px";

        this.x = XoffSet;
        this.y = YoffSet;

        this.reDrawChildren();
    }

    reDrawChildren() { //concider renameing this method
        for (var x = 0; x < this.children.length; x++) {
            var fChild = this.children[x];
            if (!(fChild == null)) {
                fChild.reDraw(); //redraws the path, not the node itself. 
            }
        }

        if (!(this.parent == null)) {
            this.parent.reDraw();
        }
    }

    MouseDrag(x) {
        document.addEventListener('mousemove', this.MouseMove);
    }

    ///Node Creation
    appendNode(x,props,element) {
        if (!(element == null)) {
            var lnewProps = JSON.parse(JSON.stringify(props));

            lnewProps.name = element;
            lnewProps.latch = x;

            if (!(lnewProps.data['rootNode'] == null)) {
                delete lnewProps.data['rootNode'];
            }

            this.children[x] = new Path(lnewProps);
            this.children[x].associate(this);
        } else {
            this.children[x] = null;
        } 
    }

    createChild(DOMelement,ChildIndex) { //may change with the introduction of new types of nodes
        if (this.children[ChildIndex] == null) {
            var lTempName = this.makeid(5);
            var lNewProps = '{"data":{"'+lTempName+'":[null,null,[0.5,0.5]],"name":"'+lTempName+'","latch":'+(ChildIndex)+'}}';

            this.appendNode(ChildIndex,JSON.parse(lNewProps),lTempName);

            var nullCount = 0;
            for (var x = 0; x < this.percentages.length; x++) {
                if ((this.children[x] == null) && (this.percentages[x] != 0) && (x != ChildIndex)) {
                    nullCount++;
                }
            }

            if (nullCount == 0) {
                var BasePercent = 1 / this.children.length;
            } else {
                var BasePercent = 1 / nullCount;
            }

            for (var x = 0; x < this.percentages.length; x++) {
                this.percentages[x] = BasePercent;
            }

            this.reRender();
            this.reDrawChildren(); //I don't want to update every single path. For now, it can sit by itself. 

        } else {
            console.log('invalid node');
        }
    }

    //Axillary Functions
    isLeaf() {
        var count = 0;
        for (var i = 0; i < this.children.length; i++) {
            if (!(this.children[i] == null)) {
                count = count + 1;
            }
        }
        return (count == 0);
    }

    Height() {
        var height = 0;

        if (this.isLeaf()) {
            return 0;
        } 

        for (var i = 0; i < this.children.length; i++) {
            if (!(this.children[i] == null)) {
                var tempHeight = this.children[i].Height() + 1;

                if (height <= tempHeight) {
                    height = tempHeight;
                }
            }
        }
        return height;
    }

    jsonEncode() { //I'm sure this can be improved. Greatly. 
        var id = '"id":"'+this.name+'"';

        var left;
        if (this.children[0] == null) {
            left = '"left":null,'
        } else {
            left = '"left":"'+this.children[0].getNodeName()+'",'
        }

        var right;
        if (this.children[1] == null) {
            right = '"right":null,'
        } else {
            right = '"right":"'+this.children[1].getNodeName()+'",'
        }

        var percentage = '"percentage": [';

        if (this.FinanaceConstructor(this.percentages)) { //Checks to see if the provided percentage is valid. 
            for (var x = 0; x < this.percentages.length; x++) {
                percentage = percentage + this.percentages[x];

                if (((x + 1) < this.percentages.length)) {
                    percentage = percentage + ",";
                }
            }

            percentage = percentage + "]";
        }

        var json = '{' + id + ',' + left + right + percentage + '}'

        if (this.isLeaf()) {
            return json;
        } else {
            for (var x = 0; x < this.children.length; x++) {
                if (!(this.children[x] == null)) {
                    json = json + this.children[x].jsonEncode();
                }
            }
        }
        
        return json;
    }

    CustomException(message) {
        const error = new Error(message);
      
        error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";
        return error;
    }

    //Node Spawn
    Position(x,y,sisterNum,index,width) { 
        var node = document.getElementById(this.name);

        if (node == null) {
            this.y = y + 150;

            this.x = (x - ((150*sisterNum)*width));
            this.x = this.x + (150*(index*(width*4)));   
        }
    }

    Center() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        return vw / 2;
    }

    setColor() {
        if (this.isLeaf()) {
          return 'green';
        } else {
          return 'orange';
        }
      }


    //Render related methods
    reRender() { //Recusivly returns up the tree until the root is found. A root is defigned by the lack of parent. 
        if (this.parent == null) {
            this.forceUpdate();
            this.reDrawChildren();
        } else {
            this.parent.reRender();
        }
    }

    render() {
        const element = (
            <div id={this.name} onMouseUp={this.MouseUp.bind(this, this.name)} onMouseDown={this.MouseDrag.bind(this, this.name)} className='Node' style={{
                top: this.y,
                left: this.x,
              }} >

                <div id='NodeCover'>
                    <div id='left' className='NodeInnerWrapper'>
                        <div id={this.name + "L"} onClick={this.createChild.bind(this, this.name + "L",0)} class="AddButton"/>
                    </div>

                    <div id='right' className='NodeInnerWrapper'>
                        <div id={this.name + "R"} onClick={this.createChild.bind(this, this.name + "R",1)} className="AddButton"/>
                    </div>

                    <div id='Content' className='NodeInnerWrapper' name={this.name+'Content'} style={{backgroundColor:this.setColor()}}>
                        <div id='CenterContent'>
                            <MenuIcon />
                            
                            <p>{this.name}</p>
                            <h2 id={this.name + "Balence"}>{this.balence}</h2>
                            <button onClick={this.PassDown.bind()}>TrickleDown</button>
                            <button onClick={this.PrintJson.bind()}>PrintJson</button>
                            <button onClick={this.testGlobalVariable.bind()}>GlobalValTest</button>
                        </div>
                    </div>
                </div>
          </div>
        );

        const Nodes = [element];

        if (this.isLeaf()) {
            return Nodes;
        } else {

            var width = 1 + this.Height();

            for (var i = 0; i < this.children.length; i++) {
                var elements = [];

                if (!(this.children[i] == null)) {
                    this.children[i].Position(this.x,this.y,this.children.length,i,width); //Passes down through Path

                    elements.push(this.children[i].render());
                    for (var k = 0; k < elements.length; k++) {
                        Nodes.push(elements[k]);
                    }
                }
            }
        }

        return Nodes;
    }




















    //Temporary methods
    PrintJson() {
        console.log(this.jsonEncode());
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    testGlobalVariable() {
        this.ConfigWindow = window.config;
        this.ConfigWindow(this);
    }
}

export default NewNode;