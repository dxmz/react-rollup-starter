import React from 'react'
import { render } from 'react-dom'
import VirtualizedMenuTree from '../../src/VirtualizedMenuTree.jsx';
// import VirtualizedMenuTree from '../../lib/react-virtualized-menu-tree.esm';

const tree = {
    name: 'Root #1',
    id: 'root-1',
    children: [
        {
            children: [
                {id: 'child-2', name: 'Child #2'},
                {id: 'child-3', name: 'Child #3'},
                {id: 'child-6', name: 'Child #6'},
                {id: 'child-7', name: 'Child #7'},
                {id: 'child-8', name: 'Child #8'},
                {id: 'child-9', name: 'Child #9'},
                {id: 'child-10', name: 'Child #10'},
                {id: 'child-11', name: 'Child #11'},
                {id: 'child-12', name: 'Child #12'},
                {id: 'child-13', name: 'Child #13'},
                {id: 'child-14', name: 'Child #142222222222222222'},
                {id: 'child-15', name: 'Child #15'},
                {id: 'child-16', name: 'Child #16'},
            ],
            id: 'child-1',
            name: 'Child #1',
        },
        {
            children: [{id: 'child-5', name: 'Child #5'}],
            id: 'child-4',
            name: 'Child #4',
        },
        {
            children: [
                {id: 'child-22', name: 'Child #22'},
                {id: 'child-23', name: 'Child #23'},
                {id: 'child-26', name: 'Child #26'},
                {id: 'child-27', name: 'Child #27'},
                {id: 'child-28', name: 'Child #28'},
                {id: 'child-29', name: 'Child #29'},
                {id: 'child-210', name: 'Child #210'},
                {id: 'child-211', name: 'Child #211'},
                {id: 'child-212', name: 'Child #212'},
                {id: 'child-213', name: 'Child #213'},
                {id: 'child-214', name: 'Child #214'},
                {id: 'child-215', name: 'Child #215'},
                {id: 'child-216', name: 'Child #216'},
            ],
            id: 'child-21',
            name: 'Child #21',
        },
    ],
};

const App = () => <VirtualizedMenuTree clickNodeCallback={(e,params) => {console.log(e, params)}}
                                       width={'300px'}
                                       itemSize={40}
                                       treeData={tree}/>;

render(<App />, document.getElementById('root'));
