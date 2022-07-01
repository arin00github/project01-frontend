/* eslint-disable no-console */
import { Icon, Th, Text } from "@chakra-ui/react";

import React, { useState } from "react";
import { ITableColumn, IOptions } from "Types/table-inteface";

interface ICellSort<T> {
  item: ITableColumn<T>;
  options?: IOptions;
  handleSort: (id: string, sort: boolean | undefined) => void;
}

export function CellSort2<T extends object>({ item, handleSort, options }: ICellSort<T>) {
  return (
    <Th cursor="pointer" textAlign="center" p="4px">
      {item.header}
    </Th>
  );
}
