/* eslint-disable no-console */
import React from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { PaginationItem } from "./pagination-item";
//import { CellSort } from "./cell-sort";
import { SearchFilter } from "./search-filter";
import { Pagination } from "./pagination";
//import { CellSort } from "./cell-sort";
import { CellSort2 } from "./cell-sort2";
import { IOptions, ITableColumn } from "Types/table-inteface";

export interface IBasicTable<T> {
  aria_title?: string;
  data?: T[];
  handleRowClick?: (value: T) => void;
  handleSort: (columnId: string, sortValue: boolean | undefined) => void;
  columns: ITableColumn<T>[];
  options?: IOptions;
  minH?: string;
  size: string;
  addIdx?: boolean;
}

function BasicTable<T extends object>({
  data,
  handleRowClick,
  columns,
  aria_title,
  handleSort,
  size,
  options,
  addIdx,
  minH,
}: IBasicTable<T>) {
  const exceptedData = ["id", "idx"];

  // const anotherStyle = {
  //   trStyle: {
  //     bg: "whiteAlpha.100",
  //     borderRadius: "4px",
  //     marginBottom: "6pz",
  //   },
  //   tdStyle: {
  //     border: "none",
  //   },
  // };

  const sizeOptionRendering = (sizeValue: string) => {
    switch (sizeValue) {
      case "sm": {
        const styleContent = { h: "28px", lineHeight: "28px", fontSize: "12px", minH: "300px" };
        return styleContent;
        break;
      }
      case "md": {
        const styleContent = { h: "36px", lineHeight: "36px", fontSize: "13px", minH: "390px" };
        return styleContent;
        break;
      }
      case "lg": {
        const styleContent = { h: "46px", lineHeight: "46px", fontSize: "13px", minH: "480px" };
        return styleContent;
        break;
      }
      default: {
        const styleContent = { h: "46px", lineHeight: "46px", fontSize: "13px", minH: "480px" };
        return styleContent;
        break;
      }
    }
  };

  return (
    <>
      <Box>
        <Box color="white" minH={minH ? minH : sizeOptionRendering(size).minH}>
          {data && data[0] && (
            <Table style={{ tableLayout: "fixed" }}>
              <colgroup>
                {addIdx && <col style={{ width: "10%" }}></col>}
                {columns.map((colValue, idx) => {
                  if (colValue.width) {
                    return <col key={`${aria_title}_col_${idx}`} style={{ width: colValue.width }} />;
                  }
                })}
              </colgroup>
              <Thead>
                <Tr w="100%">
                  {addIdx && <Th textAlign="center" p="4px"></Th>}
                  {columns.map((item, idx) => {
                    if (!exceptedData.includes(item.access)) {
                      return (
                        <CellSort2<T>
                          options={options}
                          item={item}
                          key={`thead_${idx}`}
                          handleSort={(cellId, value) => {
                            if (item.sortable) {
                              handleSort(cellId, value);
                            }
                          }}
                        />
                      );
                    }
                  })}
                </Tr>
              </Thead>
              <Tbody w="100%">
                {data.map((item: T, indx) => {
                  return (
                    <Tr
                      w="100%"
                      key={`row_${indx}`}
                      _hover={{ bg: "whiteAlpha.200" }}
                      cursor="pointer"
                      onClick={() => {
                        if (handleRowClick) handleRowClick(item);
                      }}
                    >
                      {/* {addIdx && options && (
                        <Td style={sizeOptionRendering(size)} p="0 8px" textAlign="center">
                          {options?.from + indx + 1}
                        </Td>
                      )} */}
                      {columns &&
                        columns.map((it, idx) => {
                          const findItem = Object.entries(item).find((itemSet) => itemSet[0] === it.access);
                          if (findItem && !exceptedData.includes(it.access)) {
                            return (
                              <Td
                                //w={it.width}
                                style={sizeOptionRendering(size)}
                                p="0 8px"
                                textAlign="center"
                                key={`cell_${indx}_${idx}`}
                                whiteSpace="nowrap"
                                textOverflow="ellipsis"
                                overflow="hidden"
                              >
                                {it.cell ? it.cell(item) : findItem[1]}
                              </Td>
                            );
                          }
                        })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </>
  );
}

export const MyBasicTable = { BasicTable, PaginationItem, SearchFilter, Pagination };
