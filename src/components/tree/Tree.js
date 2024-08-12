import NewNode from '../Node/RefactoredNode/RefactoredNode'
import '../tree/Tree.scss'
import NewButton from "../NewButton/NewButton"

const Tree = ({handleClick}) => {
  /*
  let text = '{"Nodes":[' +
  '{"id":"rootNode","left":"x135","right":"x140","percentage": [0.5,0.5]},' +
  '{"id":"x135","left":"x130","right":"x125","percentage": [0.5,0.5]},' +
  '{"id":"x130","left":null,"right":null,"percentage": [0.5,0.5]},' +
  '{"id":"x140","left":"x145","right":"x180","percentage": [0.5,0.5]},' +
  '{"id":"x145","left":"x155","right":"x150","percentage": [0.5,0.5]},' +
  '{"id":"x150","left":null,"right":null,"percentage": [0.5,0.5]},' +
  '{"id":"x155","left":"x160","right":"x165","percentage": [0.5,0.5]},' +
  '{"id":"x125","left":null,"right":null,"percentage": [0.5,0.5]},' +
  '{"id":"x165","left":null,"right":null,"percentage": [0.5,0.5]},' +
  '{"id":"x180","left":null,"right":null,"percentage": [0.5,0.5]},' +
  '{"id":"x160","left":null,"right":null,"percentage": [0.5,0.5]}' +
  ']}';
    */

  /*

{"125":{"Type":{"typeName":"splitter","percentage":0.5},"Children":[]},"130":{"Type":{"typeName":"splitter","percentage":0.5},"Children":[]},"rootNode":{"Type":{"typeName":"root"},"Children":["x130","x125"]}}

  */

  let text = '{' +
    '"x125":{"Type":{"typeName":"splitter","percentage":0.5},"Children":[],"latch":1},' +
    '"x130":{"Type":{"typeName":"splitter","percentage":0.5},"Children":[], "latch":2},' +
    '"rootNode":{"Type":{"typeName":"root"},"Children":["x130","x125"]}' +
    '}';

    console.log(text);

  return (
    <div className="Tree">
        <div className='TreeContainer'>
          <NewButton />
          <NewNode data={JSON.parse(text)} name={"rootNode"}/>
        </div>
    </div>
  );
}

export default Tree;