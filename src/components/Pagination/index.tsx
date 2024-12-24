import React from 'react';
import { BiyaButton } from '../BiyaButton';

interface PaginationProps {
  currentPage: number;
  updatePage: (val: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage = 1, updatePage}) => {
  return (
    <div className='sticky bottom-0 bg-white h-14 flex justify-between px-10 items-center'>
      <p>Page { currentPage }</p>
      <div className='mr-5'>
        {currentPage > 1 && <BiyaButton size='small' label='First Page' primary={false} onClick={() => updatePage(1)} />}
        {currentPage !== 1 && <BiyaButton size='small' label='Prev Page' primary={false} onClick={() => updatePage(currentPage - 1)} />}

          <>
            <BiyaButton size='small' label='Next Page' primary={false} onClick={() => updatePage(currentPage + 1)} />
          </>
      </div>
    </div>
  )
}

export default Pagination;
