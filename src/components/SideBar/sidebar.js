import '../SideBar/sidebar.scss'
import MenuIcon from '@material-ui/icons/Menu';
import { RadialChart, FlexibleXYPlot } from 'react-vis'

import React, { useState, useEffect, useRef } from 'react'

const Sidebar = () => {

  const [Name, setName] = useState("");
  const [Percentages, setPercentages] = useState('[{"angle":0,"color":"#FFF","name":""}]');
  const [Children, setChildren] = useState([]);
  const [isSidebar, setSidebar] = useState(false);
  const [Balence, setBlanence] = useState(0.0);

  const open = (isSideMenue) => {
    return setSidebar(!isSideMenue)
  }
  const domeNode = useRef();

  const updateState = (event) => {
    if (domeNode.current.contains(event.target)) {
      return
    } else {
      setSidebar(false)
    }
  }

  function handleClick(object) {
    var NodeName = object.getName();
    var percent = object.getPercentages();
    var ChildNodes = object.getChildren();
    var Balence = object.getBalence();


    if (!(ChildNodes == null)) {
      var Ppercent = [];
      for (var x = 0; x < percent.length; x++) {
        Ppercent.push({angle: percent[x], name: ChildNodes[x].getNodeName()});
      }
  
      setPercentages(JSON.stringify(Ppercent));
      setChildren(ChildNodes);
      setBlanence(Balence);
    } else {
      setPercentages(JSON.stringify('[{"angle":0,"color":"#FFF","name":""}]'));
    }
    
    setSidebar(true);
    setName(NodeName);
  }

  useEffect(() => {
    window.config = handleClick;
  })

  useEffect(() => {
    //document.addEventListener('mousedown',(updateState))
    return () => {
      //document.removeEventListener('mousedown', updateState)
    }
  }, [])

  return (
    <>
      <header className="topBar">
        <span
          ref={domeNode}
          /*
          onClick={() => {
            open(isSidebar)            
          }} */
          >
          </span>

        <div className="sideMenu" style={{ left: isSidebar ? '0' : '-420px' }}>
          <div className="content">
            <button onClick={updateState} className='ExitWindow' type="button">Close</button>
            <input type="text" className="nodeName" name="nodeName" value={Name} />
              <h3>CurrentVal: ${Balence}</h3>
              <div className='ChartWrapper'>
                <RadialChart
                  data={JSON.parse(Percentages)}
                  width={300}
                  height={300} />
              </div>
              <input type="range" min="1" max="100" value="50" className='slider'></input>
            <button className='ChangesSubmit' type="button">SubmitChanges</button>
          </div>
        </div>
      </header>
    </>
  );

}


export default Sidebar;

/*

            <table>
              <tr>  
                {Children.map(Children => <th>{Children.getNodeName()}</th>)}
              </tr>
            </table>



*/