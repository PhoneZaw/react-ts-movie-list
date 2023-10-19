interface NavigatorProp {
    navigateForwardPage : () => void,
    navigateBackwardPage : () => void,
    navigateToPage: (pageNo: number) => void,
    currentPageNo : number,
    totalPageNo : number
}

export default function Navigator({navigateForwardPage, navigateBackwardPage, navigateToPage, currentPageNo, totalPageNo} : NavigatorProp) {
  
  const displayPageRange = 5;
  const startPage = Math.max(1, currentPageNo - Math.floor(displayPageRange / 2));
  const endPage = Math.min(totalPageNo, startPage + displayPageRange - 1);
  
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="w-full flex justify-end">
      <div className="mx-2 w-fit flex gap-1 my-5 rounded-md">
        <button className="px-4 py-1 bg-slate-700 rounded-l-md disabled:opacity-25" onClick={() => navigateBackwardPage()} disabled={currentPageNo <= 1}>Prev</button>
        {pageNumbers.map((page) => (
          <div
            key={page}
            className={`px-1 py-1  hover:cursor-pointer ${currentPageNo === page ? 'bg-slate-700 text-white' : ''}`}
            onClick={() => navigateToPage(page)}
          >
            {page}
          </div>)
        )}
        <button className="px-4 py-1 bg-slate-700 rounded-r-md" onClick={() => navigateForwardPage()} disabled={currentPageNo >= totalPageNo}>Next</button>
      </div>
    </div>
  )
}
