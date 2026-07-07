const shijingshanChartTheme = {
  color: ['#2A6DF4', '#10B981', '#F59E0B', '#EF4444', '#6B7280', '#8B5CF6'],
  backgroundColor: 'transparent',
  textStyle: {
    color: '#4B5563',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
  },
  title: {
    textStyle: {
      color: '#1E1E1E',
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 25,
    },
    subtextStyle: {
      color: '#9CA3AF',
      fontSize: 12,
      lineHeight: 18,
    },
  },
  legend: {
    textStyle: {
      color: '#4B5563',
      fontSize: 12,
    },
  },
  tooltip: {
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    textStyle: {
      color: '#1E1E1E',
    },
  },
  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#E5E7EB',
      },
    },
    axisTick: {
      lineStyle: {
        color: '#E5E7EB',
      },
    },
    axisLabel: {
      color: '#9CA3AF',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#E5E7EB',
      },
    },
  },
  valueAxis: {
    axisLine: {
      lineStyle: {
        color: '#E5E7EB',
      },
    },
    axisTick: {
      lineStyle: {
        color: '#E5E7EB',
      },
    },
    axisLabel: {
      color: '#9CA3AF',
      fontSize: 12,
    },
    splitLine: {
      lineStyle: {
        color: '#E5E7EB',
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

let shijingshanThemeRegistered = false

export const registerShijingshanChartTheme = (echarts: typeof import('echarts')) => {
  if (shijingshanThemeRegistered) return
  echarts.registerTheme('shijingshan', shijingshanChartTheme)
  shijingshanThemeRegistered = true
}
