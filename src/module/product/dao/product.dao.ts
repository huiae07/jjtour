export interface ProductCreateDao {
  name: string;
  accountId: number;
}

export interface ProductHolidayCreateDao {
  date: number;
  productId: number;
}

export interface ProductHolidayWeekCreateDao {
  week: number;
  productId: number;
}
