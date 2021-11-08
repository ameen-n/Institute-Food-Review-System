import { useEffect, useState } from "react";
import ShowbuttonCard from "./ShowButtonCard";
import ReactPaginate from 'react-paginate';

export default function(props){

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
                const endOffset = itemOffset + 5;
                setCurrentItems(props.value.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(props.value.length / 5));
    }, [itemOffset])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 5) % props.value.length;
        setItemOffset(newOffset);
    };
    

    return (
        <>
            <section className="mainsection">
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100 ver1 m-b-110">
                                <div className="table100-head">
                                    <table>
                                        <thead>
                                            <tr className="row100 head">
                                                <th className="cell100 column1">Food Item</th>
                                                <th className="cell100 column3">Rating</th>
                                                <th className="cell100 column3">Like Count</th>
                                                <th className="cell100 column4">View</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                {/* <Items currentItems={currentItems} /> */}
                                {currentItems && currentItems.map((val, index) => {
                                    return (
                                        <ShowbuttonCard key={val.id} value={val} />
                                    )
                                })}
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< previous"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}