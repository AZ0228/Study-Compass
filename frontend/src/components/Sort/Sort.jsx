import React, { useState, useEffect } from 'react';
import './Sort.css';

import Tags from '../../assets/Icons/sort/Tags.svg';
import SortBy from '../../assets/Icons/sort/SortBy.svg';
import More from '../../assets/Icons/sort/More.svg';
import TagsSelected from '../../assets/Icons/sort/TagsSelected.svg';
import SortBySelected from '../../assets/Icons/sort/SortBySelected.svg';
import MoreSelected from '../../assets/Icons/sort/MoreSelected.svg';
import ChevronDown from '../../assets/Icons/sort/ChevronDown.svg';
import ChevronUp from '../../assets/Icons/sort/ChevronUp.svg';

function Sort(){
    const [selected, setSelected] = useState(null);


    return (
        <div className="sort-row">
            <div className={`tags ${selected === 'tags' ? "selected": ""}`}>
                <img src={selected === 'tags' ? TagsSelected : Tags} alt="" />
                <p>Tags</p>
                <img src={selected === 'tags' ? ChevronUp : ChevronDown} alt="" />
            </div>
            <div className={`sort-by ${selected === 'sort' ? "selected" : ""}`}>
                <img src={selected === 'sort' ? SortBySelected : SortBy} alt="" />
                <p>Sort by</p>
                <img src={selected === 'sort' ? ChevronUp : ChevronDown} alt="" />
            </div>
            <div className={`more ${selected === 'sort' ? "selected" : ""}`}>
                <img src={selected === 'more' ? MoreSelected : More} alt="" />
                <p>More</p>
                <img src={selected === 'more' ? ChevronUp : ChevronDown} alt="" />
            </div>
        </div>
    );
}

export default Sort;