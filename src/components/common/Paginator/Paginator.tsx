import React from 'react'
import s from './Paginator.module.css'

type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
const Paginator = React.memo((props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
                    {pages.map((p, index) => {
                        return <span key={index} onClick={(e) => { props.onPageChanged(p) }}
                                     className={props.currentPage === p ? s.selectedPage : ''}>{p}</span>
                    })}
            </div>
})

export default Paginator