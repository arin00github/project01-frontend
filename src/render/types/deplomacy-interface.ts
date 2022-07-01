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

export interface ICountryEconomy {
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  ctypln_policy_cn: unknown | null;
  ecnmy_growth_rate: number;
  import_amount: number;
  import_amount_src: string;
  export_amount: number;
  export_amount_src: string;
  ext_debt: number;
  foreign_currency_reserve: string;
  gdp: string;
  gdp_per_capital: string;
  gdp_src: string;
  infltn_rate: number;
  invt_sts_cn: string;
  main_indust_cn: string;
  main_resource_cn: string;
  oda_sts_cn: string;
  pltcl_state_cn: string;
  remark: string;
  trade_export_prdnm_cn: number;
  trade_imcome_prdnm_cn: number;
  trade_year: number;
  unemploy_rate: number;
  unemploy_rate_year: number;
  written_year: number;
}

export interface ICountryFlag {
  content_ty: string;
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  download_url: string;
  origin_file_nm: string;
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
