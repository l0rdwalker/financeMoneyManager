import './RefactoredNode.scss'
import React from 'react';
import Path from './RefactoredPath'

import MenuIcon from '@material-ui/icons/Menu';

class RefactoredNode extends React.Component {
    constructor(props){  
        super(props);
        this.tree = props.data;

        this.name = props.name;

        console.log(this.tree[this.name]);

        //this.tree[this.name].Children.length
        this.paths = new Array(6).fill(null);

        for (var x = 0; x < this.tree[this.name].Children.length; x++) {
            var childName = this.tree[this.name].Children[x];
            var latchNum = this.tree[childName].latch;

            this.createNode(latchNum,childName,this.tree);
        }

        if (this.isRoot()) {
            this.pos();
        }
    }

    createNode(latchNum,nodeName,props) {
        var newProps = JSON.parse(JSON.stringify(props));

        newProps.name = nodeName;
        newProps.latch = latchNum;

        this.paths[latchNum] = new Path(newProps);
        this.paths[latchNum].assignParent(this);
    }

    isLeaf() {
        return this.paths.some(el => el !== null);
    }

    Height() {
        var height = 0;

        if (this.isLeaf()) {
            return 0;
        } 

        for (var i = 0; i < this.paths.length; i++) {
            if (!(this.paths[i] == null)) {
                var tempHeight = this.paths[i].Height() + 1;

                if (height <= tempHeight) {
                    height = tempHeight;
                }
            }
        }
        return height;
    }

    isRoot() {
        return (this.parentPath == null);
    }

    ////////////// getters and setters /////////////
    claimParent(object) { //allows parent-paths to assign themselves the role of parent to node.
        this.parentPath = object;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getName() {
        return this.name;
    }

    getParentIndex(name) {
        if (!(this.isRoot())) {
            for (var x = 0; this.paths.length; x++) {
                if (this.paths[x].getName() == name) {
                    return x;
                }
            }
        }
    }

    getPathNum() {
        return this.paths.length;
    }
    ////////////////////////////////////////////////


    ///////////////DOMcontrol///////////////////////x,y,sisterNum,index,width
    pos() {
        if (this.tree[this.name]['Pos'] == null) {
            if (this.isRoot()) {
                this.y = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2);
                this.x = 100;
            } else {
                var width = 1 + this.parentPath.Height();

                this.y = this.parentPath.getY() + 150;
                this.x = (this.parentPath.getX()  - ((150*this.parentPath.getPathNum())*width));
                this.x = this.x + (150*(this.parentPath.getParentIndex(this.name)*(width*4)));
            }
        } else {
            this.y = this.tree[this.name]['Pos']['y'];
            this.x = this.tree[this.name]['Pos']['x'];
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
                        </div>
                    </div>
                </div>
          </div>
        );

        return element;
    }
    ////////////////////////////////////////////////
}

export default RefactoredNode;