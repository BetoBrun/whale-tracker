/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module 'lightweight-charts' {
  export interface IChartApi {
    addAreaSeries(options?: object): ISeriesApi<'Area'>;
    addCandlestickSeries(options?: object): ISeriesApi<'Candlestick'>;
    addHistogramSeries(options?: object): ISeriesApi<'Histogram'>;
    addLineSeries(options?: object): ISeriesApi<'Line'>;
    addBarSeries(options?: object): ISeriesApi<'Bar'>;
    removeSeries(series: ISeriesApi): void;
    timeScale(): ITimeScaleApi;
    resize(width: number, height: number): void;
    destroy(): void;
  }

  export interface ISeriesApi<T> {
    setData(data: object[]): void;
    update(data: object): void;
    priceFormatter(): object;
  }

  export interface ITimeScaleApi {
    subscribeVisibleTimeRangeChange(callback: (param: object) => void): void;
    setVisibleRange(range: object): void;
  }

  export function createChart(
    element: HTMLElement,
    options?: object
  ): IChartApi;
}