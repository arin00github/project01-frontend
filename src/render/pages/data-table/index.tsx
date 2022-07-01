import React, { useCallback, useEffect, useState } from "react";
import { putSelCountry } from "Store/deplomacy/deplomacy-slice";
import { useAppSelector, useAppDispatch } from "Store/hooks";
import { AppState } from "Store/index";
import DetailIndex from "./detail";
import DataTableList from "./table-list";

const DataTableIndex = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const deplomacyValue = useAppSelector((state: AppState) => state.deplomacy);

  console.log("index", deplomacyValue?.selCountry);

  return (
    <>
      <DataTableList />
      {deplomacyValue?.selCountry && <DetailIndex onClose={() => dispatch(putSelCountry(undefined))} />}
    </>
  );
};

export default DataTableIndex;
