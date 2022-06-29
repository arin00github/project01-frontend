//import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

export interface IOptions {
  numOfRows: number;
  pageNo: number;
  filter: { name: string; value: string };
}

const DashobardIndex = (): JSX.Element => {
  console.log(process.env.REACT_APP_DEPLO_API_KEY);

  const [options, setOptions] = useState<IOptions>({
    numOfRows: 10,
    pageNo: 14,
    filter: { name: "ko_word", value: "이탈리아" },
  });
  const FormatString = (options: IOptions): string => {
    const resultString = `cond[country_nm::EQ]=${options.filter.value}`;
    return resultString;
  };

  const API_KEY = process.env.REACT_APP_DEPLO_API_KEY;

  const URL_TOTAL = `http://apis.data.go.kr/1262000/OverviewKorRelationService/getOverviewKorRelationList?serviceKey=${API_KEY}&pageNo=${options.pageNo}&numOfRows=${options.numOfRows}`;
  const URL = `http://apis.data.go.kr/1262000/OverviewKorRelationService/getOverviewKorRelationList?serviceKey=${API_KEY}&pageNo=${
    options.pageNo
  }&numOfRows=${options.numOfRows} ${FormatString(options)}`;
  const getDiplomacyData = useCallback(() => {
    axios({
      method: "GET",
      url: URL,
    }).then((res) => {
      console.log("getData", res.data);
    });
  }, [URL]);
  useEffect(() => {
    getDiplomacyData();
    console.log("useEffect dashboard");
  }, [getDiplomacyData]);
  return (
    <>
      <Box></Box>
    </>
  );
};

export default DashobardIndex;
