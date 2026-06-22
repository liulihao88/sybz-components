import type * as echarts from 'echarts';
/**
 * @description 使用 Echarts (只是为了添加图表响应式)
 * @param {myChart} myChart Echarts实例 (必传)
 * @param {options} options 绘制Echarts的参数 (必传)
 * */
export declare const useEcharts: (myChart: echarts.ECharts, options: echarts.EChartsCoreOption) => void;
