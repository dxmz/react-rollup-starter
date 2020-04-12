import React, {Component} from 'react';
import {FixedSizeTree as Tree} from 'react-vtree';
import Node from './Node.jsx';

export default class VirtualizedMenuTree extends Component {

    constructor(props) {
        super(props);
        this.state = {activeNode: ''};
        this.row = (props) => {
            const { toggleUpIcon, toggleDownIcon } = this.props;
            const {index, data, style, isScrolling} = props;
            const { component: Node, treeData, order, records, } = data;

            return <Node {...records[order[index]]}
                         style={style}
                         activeNode={this.state.activeNode}
                         isScrolling={isScrolling}
                         treeData={treeData}
                         toggleUpIcon={toggleUpIcon}
                         toggleDownIcon={toggleDownIcon}
            />
        };
    }

    treeFunction(tree) {
        const that = this;
        const { isOpenByDefault } = this.props;
        const isOpen = (typeof isOpenByDefault !== 'undefined') ? Boolean(isOpenByDefault) : true;

        function* treeWalker(refresh) {
            const stack = [];

            // Remember all the necessary data of the first node in the stack.
            stack.push({
                nestingLevel: 0,
                node: tree,
                nodeCallback: that.nodeCallback
            });

            // Walk through the tree until we have no nodes available.
            while (stack.length !== 0) {
                const {
                    node,
                    nestingLevel,
                    nodeCallback
                } = stack.pop();

                // Here we are sending the information about the node to the Tree component
                // and receive an information about the openness state from it. The
                // `refresh` parameter tells us if the full update of the tree is requested;
                // basing on it we decide to return the full node data or only the node
                // id to update the nodes order.
                const isOpened = yield refresh
                    ? {
                        id: node.id,
                        isLeaf: node.children ? node.children.length === 0 : true,
                        isOpenByDefault: isOpen,
                        name: node.name,
                        nestingLevel,
                        nodeCallback
                    }
                    : node.id;

                // Basing on the node openness state we are deciding if we need to render
                // the child nodes (if they exist).
                if (node.children && node.children.length !== 0 && isOpened) {
                    // Since it is a stack structure, we need to put nodes we want to render
                    // first to the end of the stack.
                    for (let i = node.children.length - 1; i >= 0; i--) {
                        stack.push({
                            nestingLevel: nestingLevel + 1,
                            node: node.children[i],
                            nodeCallback
                        });
                    }
                }
            }
        }

        return treeWalker;
    }

    nodeCallback= (e, params) => {
        const { clickNodeCallback } = this.props;

        this.setState({activeNode: (params && params.id) || ''});
        clickNodeCallback && clickNodeCallback(e, params);
    };

    render() {
        const {treeData, height, width, itemSize, treeWalker, ...other} = this.props;

        return (
            <Tree
                treeWalker={treeWalker || this.treeFunction(treeData)}
                itemSize={itemSize ? itemSize : 30}
                height={height ? height : 500}
                rowComponent={this.row}
                width={width ? width : '100%'}
                {...other}>
                {
                    Node
                }
            </Tree>
        )
    }
}
