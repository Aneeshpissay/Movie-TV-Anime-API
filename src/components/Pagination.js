import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

function Paginate(props){
    const pageLinks = [];
    for(let i=1;i<=props.numberPages;i++){
        let active = props.pages === i ? 'active': '';
        pageLinks.push(<PaginationItem key={i} className={`${active}`} onClick={()=>props.nextPage(i)}><PaginationLink href="#">{i}</PaginationLink></PaginationItem>)
    }
    return(
        <div className="container">
             <div className="row">
             <Pagination style={{flexWrap: "wrap"}}>
                   { props.pages > 1 ?  <PaginationItem onClick={()=>props.nextPage(props.pages - 1)}><PaginationLink>Prev</PaginationLink></PaginationItem> : ''}
                    {pageLinks}
                   { props.pages < props.numberPages ?  <PaginationItem onClick={()=>props.nextPage(props.pages + 1)}><PaginationLink>Next</PaginationLink></PaginationItem> : ''}
             </Pagination>
             </div>
        </div>
    )
}

export default Paginate;