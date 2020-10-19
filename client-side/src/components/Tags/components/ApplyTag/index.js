import React, { useState } from 'react';
import classnames from 'classnames';

import './style.scss';

const ApplyTag = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    
    const handleInputChange = (event) => {
        const {value} = event.target;
        setSearchInputValue(value);
    }

    const toggle = () => {
        setIsOpen(!isOpen);
        setSearchInputValue('');
    }

    const handleAppendTag = (e, value) => {
        e.preventDefault();

        if(!selected.includes(value)){
            selected.push(value);
        }
        setSelected(selected);
        props.onApplyTag(selected);
        toggle();
    }

    const handleRemoveTag = (e, value) => {
        e.preventDefault();
        e.stopPropagation();

        if(selected.includes(value)){
            selected.splice(selected.indexOf(value), 1);
        }

        setSelected(selected);
        props.onApplyTag(selected);
        setSearchInputValue('');
    }

    const handleClickOutside = () => toggle();

    const {id, name, placeholder} = props;

    return (
        <div className="apply-tag-container">
            <label>Tags:</label>
            <button type="button" className="form-control apply-tag-toggle" onClick={() => toggle()}>
                <ul>
                    {selected.map((item, idx) => {
                            return(
                                <li key={idx}>
                                    <span className="tag">{item}
                                        <span className="tag-addon" onClick={(e) => handleRemoveTag(e, item)}>x</span>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </button>
            <div className={classnames(isOpen ? "show" : "", "tag-input")}>
                <div className="form-input-single">
                    <input 
                        type="text"
                        className="form-control"
                        id={id} 
                        name={name} 
                        value={searchInputValue} 
                        placeholder={placeholder} 
                        onChange={(e) => handleInputChange(e)} 
                        autoComplete="off" 
                    />
                    {searchInputValue != "" && <span className="add-new-value" onClick={(e) => { handleAppendTag(e, searchInputValue)}}>
                        <i className="fe fe-plus-circle" />
                    </span>}
                </div>
            </div>
        </div>
    )
}

export default ApplyTag;