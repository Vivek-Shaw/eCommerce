import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeclass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeclass ? "bg-base-300 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButton = () => {
    const pageButtons = [];
    //first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeclass: page === 1 }));

    //dot
    if(page>2){
        pageButtons.push(
          <button
            className="btn btn-xs sm:btn-md border-none join-item"
            key="dots-1"
          >
            ...
          </button>
        );
    }
    

    // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(
        addPageButton({
          pageNumber: page,
          activeclass: true,
        })
      );
    }
    //dot
    if(page<pageCount-1){
        pageButtons.push(
          <button
            className="btn btn-xs sm:btn-md border-none join-item"
            key="dots-2"
          >
            ...
          </button>
        );
    }
    
    //last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeclass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {/* {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })} */}
        {renderPageButton()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
