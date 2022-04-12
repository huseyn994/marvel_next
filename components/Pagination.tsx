import React, { useState } from "react";
import styles from '../styles/Home.module.css'

function Pagination({
    total,
    perPage,
    setPage
}: {
    total: number
    perPage: number
    setPage: (page: number) => void
}) {
    const [currentPage, setCurrentPage] = useState(0);

    const setNewPage = (page: number) => {
        setCurrentPage(page);
        setPage(page);
    }
    let maxPages = Math.floor(total / perPage);
    let items = [];
    let leftSide = currentPage - 2;
    if (leftSide <= 0) leftSide = 1;
    let rightSide = currentPage + 2;
    if (rightSide > maxPages) rightSide = maxPages;
    for (let number = leftSide; number <= rightSide; number++) {
        items.push(
            <div key={number} className={(number === currentPage ? styles.paginationItem + ' ' + styles.active : styles.paginationItem)}
                onClick={() => { setNewPage(number) }}>
                {number}
            </div>,
        );
    }
    const nextPage = () => {
        if (currentPage < maxPages) {
            setNewPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setNewPage(currentPage - 1)
        }
    }

    const paginationRender = (
        <>
            <div className={styles.flexContainer}>
                <div className="round-effect" onClick={prevPage}> &lsaquo; </div>
                {items}
                <div className="round-effect" onClick={nextPage}> &rsaquo; </div>
            </div>
        </>
    );
    return (paginationRender);
}

export default Pagination;