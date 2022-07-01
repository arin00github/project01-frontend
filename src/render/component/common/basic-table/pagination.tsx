import { Box, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { IOptions } from "Types/table-inteface";

import { PageButton } from "./page-button";
import { PaginationItem } from "./pagination-item";

interface IPagination {
  goToFront: (pageNumber: number) => void;
  goToBack: (pageNumber: number) => void;
  goToNext: (pageNumber: number) => void;
  goToPrev: (pageNumber: number) => void;
  onClickIndex: (pageNumber: number) => void;
  options: IOptions;
  indexArray: number[];
  totalDataLength: number;
  perPageCount?: number;
}

export const Pagination = ({
  goToFront,
  goToBack,
  goToPrev,
  goToNext,
  onClickIndex,
  options,
  indexArray,
  totalDataLength,
}: IPagination): JSX.Element => {
  const originalTotalLength = Math.ceil(totalDataLength / 10);

  return (
    <Box mt={10} w="100%" justifyContent="center" pb={5}>
      {totalDataLength && (
        <HStack spacing={3} justifyContent="center">
          <PageButton
            handleClick={() => {
              //const newOption = { ...options, from: 0 };
              //goToFront(newOption);
              goToFront(1);
            }}
            disabled={options.pageNo === 1}
            symbol={<Icon as={BsChevronDoubleLeft} color="white" />}
          />
          <PageButton
            handleClick={() => {
              const newNumber = options.pageNo - 1;
              goToPrev(newNumber);
            }}
            disabled={options.pageNo === 1}
            symbol={<Icon as={BsChevronLeft} color="white" />}
          />

          {indexArray.map((it) => {
            return (
              <PaginationItem
                key={`${it}`}
                indexNumber={it}
                bgStandard={options.pageNo === it + 1}
                handleClick={() => onClickIndex(it + 1)}
              />
            );
          })}

          <PageButton
            handleClick={() => {
              const newNumber = options.pageNo + 1;
              goToNext(newNumber);
            }}
            disabled={options.pageNo >= originalTotalLength}
            symbol={<Icon as={BsChevronRight} color="white" />}
          />
          <PageButton
            handleClick={() => {
              goToBack(originalTotalLength);
            }}
            disabled={options.pageNo === originalTotalLength}
            symbol={<Icon as={BsChevronDoubleRight} color="white" />}
          />
        </HStack>
      )}
    </Box>
  );
};
