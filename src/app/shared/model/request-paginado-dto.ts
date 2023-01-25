export class RequestPaginadoDto<T> {
    pageIndex: number;
    pageSize: number;
    filtro: T;
}
