import React from 'react';
import './functionalNode.css'
import AddButton from '../button/AddButton';
import {useState} from 'react';
import {useDrag} from 'react-use-gesture';


const Node = ({data}) => {
  ////Output HTML
  return (
    <div onClick={this.moveTest} className='Node'>
        <div id='NodeCover'>
            <div id='left' className='NodeInnerWrapper'>
                <div class="AddButton"/>
            </div>

            <div id='right' className='NodeInnerWrapper'>
                <div className="AddButton"/>
            </div>

            <div id='Content' className='NodeInnerWrapper'>
            <button onClick={this.handleEvent}>Please Click</button>  
            </div>
        </div>
  </div>
  );
}

export default Node;

