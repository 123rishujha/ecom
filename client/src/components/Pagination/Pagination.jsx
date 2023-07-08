import { useCallback, useMemo } from "react";

function Pagination({
  currentPage,
  totalProductLength,
  perPage,
  handleCurrentPage,
  siblingCount = 1,
}) {
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length: length }, (elem, i) => {
      console.log("elem", elem);
      return i + start;
    });
  };

  const paginationRange = useCallback(() => {
    const totalPageCount = Math.ceil(totalProductLength / perPage);

    const totalPageNumbers = 2 * siblingCount + 5; // siblingCount + left + right + current + 2*dots;

    //case 1. if totalPageCount less than totalPageNumbers then
    if (totalPageCount <= totalPageNumbers) {
      return range(1, totalPageCount);
    }

    let leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    let rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    let shouldShowLeftDots = leftSiblingIndex > 2;
    let shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    let firstpageIndex = 1;
    let lastPageIndex = totalPageCount;

    //case 2. show dots on right side
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "DOTS", totalPageCount];
    }
    //case 3. show dots on left side
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstpageIndex, "DOTS", ...rightRange];
    }
    //case 4. show dots on both side;
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstpageIndex, "DOTS", ...middleRange, "DOTS", totalPageCount];
    }
  }, [totalProductLength, perPage, currentPage, siblingCount]);

  
  let BtnArray = useMemo(()=>{
    return paginationRange()
  },[totalProductLength, perPage, currentPage, siblingCount])

  const prev = () => {
    handleCurrentPage(currentPage - 1);
  };

  const next = () => {
    handleCurrentPage(currentPage + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        width: "fit-content",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      {currentPage !== 1 && (
        <button
          style={{ padding: "0px", margin: "0px", height: "30px" }}
          onClick={prev}
        >
          prev
        </button>
      )}
      {BtnArray?.map((elem) => {
        if (elem === "DOTS") {
          return <p>&#8230;</p>;
        } else {
          return (
            <button
              style={{
                backgroundColor: "transparent",
                border: elem === currentPage ? "1px solid red" : "none",
                borderRadius: "20%",
                padding: "0px 10px",
                height: "30px",
              }}
              onClick={() => handleCurrentPage(elem)}
            >
              {" "}
              {elem}{" "}
            </button>
          );
        }
      })}
      {currentPage !== BtnArray[BtnArray.length - 1] && (
        <button
          style={{ padding: "0px", margin: "0px", height: "30px" }}
          onClick={next}
        >
          next
        </button>
      )}
    </div>
  );
}

export default Pagination;
