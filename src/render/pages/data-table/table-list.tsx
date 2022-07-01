import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { IDeplomacyList, IResultCode } from "Types/deplomacy-interface";
import { NewAPICall } from "Api/api-interface";
import { IOptions, ITableColumn } from "Types/table-inteface";
import { BasicTable, Pagination } from "Component/common";
import TableUtils from "Utils/table-utils";
import { BodyFrame } from "../layout/body-frame/index";
import { useAppDispatch } from "Store/hooks";
import { putSelCountry } from "Store/deplomacy/deplomacy-slice";

const DataTableList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState<IOptions>({
    numOfRows: 10,
    pageNo: 1,
    filter: null,
  });

  const [data, setData] = useState<IResultCode<IDeplomacyList> | undefined>(undefined);

  const [pageIndexArray, setPageIndexArray] = useState<number[] | undefined>(undefined);

  const [activeClick, setActiveClick] = useState<boolean>(true);

  const updatePagination = (totalData: number, pageIndex: number) => {
    const newPagination = TableUtils.createPagination(totalData);
    const arrangedArray = TableUtils.displayPagination(newPagination, pageIndex);
    setPageIndexArray(arrangedArray);
  };

  const GetTotalCountryAPI = useCallback(() => {
    setActiveClick(false);
    const service = NewAPICall();
    service
      .GetTotalCountry(options.pageNo)
      .then((res) => {
        if (res && res.data) {
          setData({ ...res });
          updatePagination(res.totalCount, options.pageNo);
          setActiveClick(true);
        }
      })
      .catch((err) => console.log("GetTotalCountryAPI fail", err));
  }, [options.pageNo]);

  const changeOption = useCallback(
    (pageIndex: number) => {
      setOptions({
        ...options,
        pageNo: pageIndex,
      });
    },
    [options]
  );

  const countryColumns: ITableColumn<IDeplomacyList>[] = [
    { access: "country_nm", header: "국가명", sortable: false },
    {
      access: "country_eng_nm",
      header: "영문명",
      sortable: false,
      cell: (value) => `${value.country_eng_nm} (${value.country_iso_alp2})`,
    },
    { access: "export_amount", header: "수출액", sortable: false },
    { access: "import_amount", header: "수입", sortable: false },
    { access: "diplomatic_relations", header: "수교", sortable: false },
  ];

  useEffect(() => {
    GetTotalCountryAPI();
  }, [GetTotalCountryAPI]);

  return (
    <BodyFrame>
      <Heading size="sm" fontSize="24px" fontWeight="medium" pb={5}>
        국가별 외교관계
      </Heading>
      <Box>
        <Box w="100%" pt={8}>
          <BasicTable
            columns={countryColumns}
            data={data?.data}
            aria_title="deplomacy"
            handleSort={() => {
              console.log("handleSort");
            }}
            handleRowClick={(value) => {
              dispatch(putSelCountry({ name: value.country_nm, iso: value.country_iso_alp2 }));
              console.log("row click");
            }}
            size="lg"
          />
        </Box>
        {data?.totalCount && pageIndexArray && (
          <Pagination
            options={options}
            totalDataLength={data?.totalCount}
            indexArray={pageIndexArray}
            goToPrev={(pageNumber) => activeClick && changeOption(pageNumber)}
            goToNext={(pageNumber) => activeClick && changeOption(pageNumber)}
            goToBack={() => changeOption(Math.ceil(data.totalCount / 10))}
            goToFront={() => changeOption(1)}
            onClickIndex={(pageNumber) => changeOption(pageNumber)}
          />
        )}
      </Box>
    </BodyFrame>
  );
};

export default DataTableList;
