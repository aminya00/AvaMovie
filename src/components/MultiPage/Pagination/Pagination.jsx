import { memo, useEffect, useState } from 'react';
import './Pagination.css'
import { TbChevronLeft } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Pagination=memo(({boxesArr,showBoxesFunc,pageNumber,boexesInPage,pathName,searchParams})=>{

    const [pageCount,usePageCount]=useState(0)

    useEffect(()=>{
        usePageCount(Math.ceil(boxesArr.length/boexesInPage))
        let endBoxesIndex=+(pageNumber)*boexesInPage
        let startBoxesIndex=endBoxesIndex-boexesInPage
        showBoxesFunc([...boxesArr].slice(startBoxesIndex,endBoxesIndex))
        

    },[boxesArr,pageNumber])
    return(
        <div className={`pagination-container ${boxesArr.length<=boexesInPage?'no-pagination':''}`}>
        <div className='pagination-boxes-container'>
            {
                Array(pageCount).fill(0).map((paginationBox,index)=>(
                        <Link to={`${pathName}/${index+1}/${searchParams}`} key={index}> 
                    <div className={`pagination-box ${+(pageNumber)==index+1?"active":''}`}>
                        {index+1}
                    </div>
                        </Link>
                ))
            }
            {
                 pageCount!=+(pageNumber) ? 
            <Link to={`${pathName}/${+(pageNumber)+1}/${searchParams}`} > 
            <div className="pagination-box next-page"><TbChevronLeft /></div>
            </Link>
            :
            <div className="pagination-box next-page"><TbChevronLeft /></div>
            }
        </div>
        </div>
    )
})

export default Pagination