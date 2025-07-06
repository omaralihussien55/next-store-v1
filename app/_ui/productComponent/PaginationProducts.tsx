"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChangeValuePageProduct } from "@/redux/counterSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const PaginationProducts = ({ totalPage }: { totalPage: number }) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.NavSlice);
    const [pointer,setPointer]= useState<boolean>(false)
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      dispatch(ChangeValuePageProduct({ page: newPage }));
    }
  };

  const generateVisiblePages = () => {
    const maxVisible = 5;
    const pages = [];

    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = generateVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {visiblePages.map((p) => {
        
            return (
            
          <PaginationItem key={p} >
            <PaginationLink 
              style={{
                // pointerEvents:pointer?"none":"all"
              }}
              className="cursor-pointer"
              size={"sm"}
              isActive={p === page}
              onClick={() =>{
                if(pointer){

                }else{
                  
                }
                 handlePageChange(p)
                 const isNo =( p * 10) >= totalPage 
                 setPointer(isNo)
                }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        )
        } )}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            className={page === totalPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationProducts;
