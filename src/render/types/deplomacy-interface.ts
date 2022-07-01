export interface IDeplomacyList {
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  diplomatic_relations: string;
  import_amount: string;
  export_amount: string;
  investment_status: string;
  mission_status: string;
  oda_status: string;
  oks_status: string;
}

export interface IResultCode<T> {
  currentCount: number;
  data: T[];
  numOfRows: number;
  pageNo: number;
  resultCode: number;
  resultMsg: string;
  totalCount: number;
}
