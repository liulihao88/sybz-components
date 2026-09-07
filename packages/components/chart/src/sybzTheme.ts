const sybzChartTheme = {
  color: ['#4876EF', '#00D3AB', '#9E77ED', '#0BA5EC', '#EF6820', '#EE46BC', '#17B26A', '#EAAA08', '#F63D68'],
  backgroundColor: 'transparent',
  textStyle: {
    color: '#414651',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
  },
  title: {
    textStyle: {
      color: '#181D27',
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 25,
    },
    subtextStyle: {
      color: '#717680',
      fontSize: 12,
      lineHeight: 18,
    },
  },
  legend: {
    textStyle: {
      color: '#414651',
      fontSize: 12,
    },
  },
  tooltip: {
    borderColor: '#D5D7DA',
    backgroundColor: '#FFFFFF',
    textStyle: {
      color: '#181D27',
    },
  },
  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#D5D7DA',
      },
    },
    axisTick: {
      lineStyle: {
        color: '#D5D7DA',
      },
    },
    axisLabel: {
      color: '#717680',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#D5D7DA',
      },
    },
  },
  valueAxis: {
    axisLine: {
      lineStyle: {
        color: '#D5D7DA',
      },
    },
    axisTick: {
      lineStyle: {
        color: '#D5D7DA',
      },
    },
    axisLabel: {
      color: '#717680',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#D5D7DA',
      },
    },
  },
  line: {
    itemStyle: {
      borderWidth: 2,
    },
    lineStyle: {
      width: 2,
    },
    symbolSize: 6,
    smooth: true,
  },
  bar: {
    itemStyle: {
      borderRadius: 4,
    },
    barMinHeight: 12,
  },
  pie: {
    itemStyle: {
      borderColor: '#FFFFFF',
      borderWidth: 2,
    },
  },
}

let sybzThemeRegistered = false

export const registerSybzChartTheme = (echarts: typeof import('echarts')) => {
  if (sybzThemeRegistered) return
  echarts.registerTheme('sybz', sybzChartTheme)
  sybzThemeRegistered = true
}
