import React from 'react';
import './Node.css'
import AddButton from '../button/AddButton';
import {useState} from 'react';
import {useDrag} from 'react-use-gesture';


const Node = ({data}) => {

  const [NodePos, setNodePos] = useState({x:0,y:0});
  
  const bindNodePos = useDrag((params) => {
    var canvasHeight = document.getElementById('Node').parentNode.clientHeight;
    var canvasWidth = document.getElementById('Node').parentNode.offsetWidth;

    var nodeWidth = document.getElementById('Node').clientWidth;
    var nodeHeight = document.getElementById('Node').clientHeight;

    if ((params.offset[1] + nodeHeight) > canvasHeight) {
      params.offset[1] = canvasHeight - nodeHeight;
    } else if (params.offset[1] < 0) {
      params.offset[1] = 0;
    }

    if ((params.offset[0] + nodeWidth) > canvasWidth) {
      params.offset[0] = canvasWidth - nodeWidth;
    } else if (params.offset[0] < 0) {
      params.offset[0] = 0;
    }

    var heightOffset = params.offset[1];
    var widthOffset = params.offset[0];

    setNodePos({
      x: widthOffset,
      y: heightOffset,
    });
  });

  var left = null;
  var right = null;

  var leftPercent  = .5;
  var rightPercent = .5;

  ////Output HTML
  return (
    <div id="Node" {...bindNodePos()} className="Node" style={{
      top: NodePos.y,
      left: NodePos.x,
    }}>


    <div id='NodeCover'>



    </div>

      <div id='NodeInnerWrapper'>
        <div class="AddButton"/>
      </div>

      <div id='NodeInnerWrapper'>
        <h3>{data}</h3>
      </div>

      <div id='NodeInnerWrapper'>
        <div class="AddButton"/>
      </div>


    </div>
  );
}

export default Node;

