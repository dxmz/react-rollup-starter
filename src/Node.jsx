import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {

    handleClick(e, node) {
        e.stopPropagation();
        e.preventDefault();
        this.props.data && this.props.data.nodeCallback(e, node);
    }

    render() {
        const {data, isOpen, style, toggle, activeNode, toggleUpIcon, toggleDownIcon} = this.props;
        const {id, isLeaf, name, nestingLevel} = data;
        const iconUp = toggleUpIcon || <span className={'node-toggle-icon'}>+</span> ;
        const iconDown = toggleDownIcon || <span className={'node-toggle-icon'}>-</span>;

        return (
            <div style={{...style}}
                 className={id === activeNode ?
                     (isLeaf ? 'node-wrapper active-node-wrapper' : 'active-not-leaf-node-wrapper') : 'node-wrapper'}>
                <div
                    style={{
                        alignItems: 'baseline',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <div style={{
                        paddingTop: `${(style.height - 25)/2}px`,
                        paddingLeft: nestingLevel * style.height + (isLeaf ? 8 : 0)
                    }}
                         className={'node-name'}
                         onClick={(e) => this.handleClick(e, data)}>
                        {name}
                    </div>
                    {
                        !isLeaf &&
                        (<div onClick={toggle}>{isOpen ? iconDown : iconUp}</div>)
                    }
                </div>
            </div>

        )
    }
}
