import "./style/Paging.css"
import {memo, useEffect, useState} from "react";



const Paging=({TotalPage=1,APIPaging=function (){},APISearchPaging=function (){},whatAction="normal"})=>{

    const [totalPage,setTotalPage]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);

    useEffect(() => {
        convertTotalPage();
    }, [TotalPage]);

    // totalpage
    const convertTotalPage=()=>{
        const myArr=[];
        for(let i=0;i<TotalPage;i++){
            myArr.push(i);
        }
        setTotalPage(myArr);
    }

    //MovePage
    const handleMovePage=(e)=>{
        if(whatAction==="normal"){
            //getAll
            const pageClick=e.target.innerText;
            handleMoveActivePage(pageClick);
            setCurrentPage(Number(pageClick));
            //Call API Paging
            APIPaging(pageClick);
        }else{
            //getAllSearch
            const pageClick=e.target.innerText;
            handleMoveActivePage(pageClick);
            setCurrentPage(Number(pageClick));
            //Call API Search Paging
            APISearchPaging(pageClick);
        }
    }

    //Move Previous Page
    const handleMovePreviousPage=()=>{
        if(whatAction==="normal"){
            if(currentPage===1){
                APIPaging(totalPage.length);
                handleMoveActivePage(totalPage.length);
                setCurrentPage(totalPage.length);
            }else{
                APIPaging(currentPage-1);
                handleMoveActivePage(currentPage-1);
                setCurrentPage(prevState => prevState-1);
            }
        }else{
            if(currentPage===1){
                APISearchPaging(totalPage.length);
                handleMoveActivePage(totalPage.length);
                setCurrentPage(totalPage.length);
            }else{
                APISearchPaging(currentPage-1);
                handleMoveActivePage(currentPage-1);
                setCurrentPage(prevState => prevState-1);
            }
        }
    }

    //Move Next Page
    const handleMoveNextPage=()=>{
        if(whatAction==="normal"){
            if(currentPage===totalPage.length){
                APIPaging(1);
                handleMoveActivePage(1);
                setCurrentPage(1);
            }else{
                APIPaging(currentPage+1);
                handleMoveActivePage(currentPage+1);
                setCurrentPage(prevState => prevState+1);
            }
        }else{
            if(currentPage===totalPage.length){
                APISearchPaging(1);
                handleMoveActivePage(1);
                setCurrentPage(1);
            }else{
                APISearchPaging(currentPage+1);
                handleMoveActivePage(currentPage+1);
                setCurrentPage(prevState => prevState+1);
            }
        }
    }

    const handleMoveActivePage=(pageClick)=>{
        const page_paging_DOC=document.querySelectorAll(".paging-page");
        //remove active
        page_paging_DOC.forEach(page=>{
            page.classList.remove("active-paging");
        })
        //add active
        page_paging_DOC.forEach(page=>{
            if(typeof pageClick === "number"){
                if(Number(page.textContent)===pageClick){
                    page.classList.add("active-paging");
                }
            }else{
                if(page.textContent===pageClick){
                    page.classList.add("active-paging");
                }
            }
        })
    }

    return (
        <div className="paging-container">
            <i onClick={handleMovePreviousPage} className="fa-solid fa-angle-left paging-previous"></i>
            <div className="list-paging">
                {totalPage.map((page,index)=>{
                    if(index===0) {
                        return(
                            <span key={index} onClick={handleMovePage} className="active-paging paging-page">{page+1}</span>
                        )
                    }else{
                        return (
                            <span key={index} onClick={handleMovePage} className="paging-page">{page+1}</span>
                        )
                    }
                })}
            </div>
            <i onClick={handleMoveNextPage} className="fa-solid fa-angle-right paging-next"></i>
        </div>
    )

}

export default memo(Paging)