export class PagedList<T> {
    HasNextPage = false;
    HasPreviousPage = false;
    IsFirstPage = true;
    IsLastPage = true;
    PageCount = 1;
    PageIndex = 0;
    PageNumber = 1;
    PageSize = 10;
    TotalItemCount: number;
    Items: T[];
}