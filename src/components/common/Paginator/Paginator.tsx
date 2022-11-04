import React, {useState} from 'react'
import s from './Paginator.module.css'
import cn from 'classnames'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {UsersSearchForm} from "../../Users/UsersSearchForm/UsersSearchForm";

type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}
const Paginator = React.memo(({portionSize = 10, ...props}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPgeNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    return <div className={s.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>prev</button>}
        {pages
            .filter(p => p >= leftPortionPgeNumber && p <= rightPortionPageNumber)
            .map((p, index) => {
                    return <span className={cn({
                        [s.selectedPage]: props.currentPage === p
                    }, s.pageNumber)}
                                 key={index}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}
                    >{p}</span>
                }
            )
        }
        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>next</button>}


    </div>
})

export default Paginator

