import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import TopBar from '../components/TopBar'
import ErrorDisplay from '../components/ErrorDisplay'
import { getUsersWithDetails } from '../services/userService'
import type { ApiUser } from '../types/user'

interface ChartDataPoint {
  name: string
  transactionVolume: number
  totalBalance: number
  billPayments: number
}

function AnalyticsPage() {
  const [users, setUsers] = useState<ApiUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const data = await getUsersWithDetails()
        setUsers(data.users)
      } catch (err) {
        console.error('Error loading analytics data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  const chartData = useMemo<ChartDataPoint[]>(() => {
    return users
      .map((user) => {
        const transactionVolume = user.transactions?.reduce((sum, transaction) => {
          return sum + (transaction.amount || 0)
        }, 0) || 0

        const totalBalance = user.accounts?.reduce((sum, account) => {
          return sum + (account.balance || 0)
        }, 0) || 0

        const billPayments = user.billPayments?.length || 0

        return {
          name: user.customerName,
          transactionVolume,
          totalBalance,
          billPayments,
        }
      })
      .sort((a, b) => b.transactionVolume - a.transactionVolume)
      .slice(0, 6)
  }, [users])

  const transactionSeries = [
    {
      name: 'Transaction Volume',
      data: chartData.map((item) => Number(item.transactionVolume.toFixed(2))),
    },
  ]

  const transactionOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      foreColor: '#71717a',
      fontFamily: 'Poppins, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '11px',
        fontWeight: 600,
        colors: ['#374151'],
      },
      formatter: (val) => {
        if (val >= 1000000) {
          return `₦${(val / 1000000).toFixed(1)}M`
        } else if (val >= 1000) {
          return `₦${(val / 1000).toFixed(1)}K`
        }
        return `₦${val.toFixed(0)}`
      },
    },
    xaxis: {
      categories: chartData.map((item) => item.name),
      labels: {
        rotate: -45,
        rotateAlways: false,
        style: {
          fontSize: '11px',
          fontWeight: 500,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          if (value >= 1000000) {
            return `₦${(value / 1000000).toFixed(1)}M`
          } else if (value >= 1000) {
            return `₦${(value / 1000).toFixed(1)}K`
          }
          return `₦${value.toFixed(0)}`
        },
        style: {
          fontSize: '11px',
        },
      },
    },
    colors: ['#E3000F'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#FF6B6B'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) =>
          `₦${value.toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
    },
    grid: {
      borderColor: '#f4f4f5',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  }

  const balanceSeries = chartData.map((item) => Number(item.totalBalance.toFixed(2)))
  const balanceOptions: ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: false },
      foreColor: '#71717a',
      fontFamily: 'Poppins, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    labels: chartData.map((item) => item.name),
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const value = opts.w.globals.series[opts.seriesIndex]
        if (value >= 1000000) {
          return `₦${(value / 1000000).toFixed(1)}M`
        } else if (value >= 1000) {
          return `₦${(value / 1000).toFixed(1)}K`
        }
        return `₦${value.toFixed(0)}`
      },
      style: {
        fontSize: '11px',
        fontWeight: 600,
        colors: ['#ffffff'],
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        blur: 3,
        opacity: 0.3,
      },
    },
    colors: ['#E3000F', '#FF6B6B', '#F97316', '#0EA5E9', '#6366F1', '#14B8A6', '#8B5CF6', '#EC4899'],
    legend: {
      position: 'bottom',
      fontSize: '12px',
      fontWeight: 500,
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 700,
              color: '#111827',
              offsetY: 10,
              formatter: (val) => {
                const total = balanceSeries.reduce((sum, value) => sum + value, 0)
                if (total >= 1000000) {
                  return `₦${(total / 1000000).toFixed(1)}M`
                } else if (total >= 1000) {
                  return `₦${(total / 1000).toFixed(1)}K`
                }
                return `₦${total.toLocaleString('en-NG', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`
              },
            },
            total: {
              show: true,
              label: 'Total Balance',
              fontSize: '12px',
              fontWeight: 600,
              color: '#6B7280',
              formatter: () => {
                const total = balanceSeries.reduce((sum, value) => sum + value, 0)
                if (total >= 1000000) {
                  return `₦${(total / 1000000).toFixed(1)}M`
                } else if (total >= 1000) {
                  return `₦${(total / 1000).toFixed(1)}K`
                }
                return `₦${total.toLocaleString('en-NG', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`
              },
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) =>
          `₦${value.toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#ffffff'],
    },
  }

  const totalTransactionsCount = useMemo(() => {
    return users.reduce((sum, user) => sum + (user.transactions?.length || 0), 0)
  }, [users])

  const totalBillPaymentsCount = useMemo(() => {
    return users.reduce((sum, user) => sum + (user.billPayments?.length || 0), 0)
  }, [users])

  const totalVolume = useMemo(() => {
    return users.reduce((sum, user) => {
      const userVolume = user.transactions?.reduce((txnSum, txn) => txnSum + (txn.amount || 0), 0) || 0
      return sum + userVolume
    }, 0)
  }, [users])

  // Transaction trend data (last 7 days)
  const transactionTrendData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split('T')[0]
    })

    return last7Days.map((date) => {
      const dayTransactions = users.reduce((sum, user) => {
        const dayTotal = user.transactions?.filter((txn) => {
          const txnDate = txn.transactionDate?.split('T')[0] || txn.createdAt?.split('T')[0]
          return txnDate === date
        }).reduce((txnSum, txn) => txnSum + (txn.amount || 0), 0) || 0
        return sum + dayTotal
      }, 0)

      return {
        date: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        value: dayTransactions,
      }
    })
  }, [users])

  const trendSeries = [
    {
      name: 'Transaction Volume',
      data: transactionTrendData.map((item) => item.value),
    },
  ]

  const trendOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      foreColor: '#71717a',
      fontFamily: 'Poppins, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: transactionTrendData.map((item) => item.date),
      labels: {
        style: {
          fontSize: '11px',
          fontWeight: 500,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          if (value >= 1000000) {
            return `₦${(value / 1000000).toFixed(1)}M`
          } else if (value >= 1000) {
            return `₦${(value / 1000).toFixed(1)}K`
          }
          return `₦${value.toFixed(0)}`
        },
        style: {
          fontSize: '11px',
        },
      },
    },
    colors: ['#E3000F'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#FF6B6B'],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) =>
          `₦${value.toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
    },
    grid: {
      borderColor: '#f4f4f5',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 5,
      colors: ['#E3000F'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        title="Analytics"
        titleClassName="text-white text-lg font-semibold"
        backgroundClassName="bg-[#E3000F]"
        paddingClasses="pt-4 pb-3"
      />

      <div className="px-5 pt-10 pb-12 space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-white p-4" style={{ borderRadius: 0 }}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Transaction Volume</p>
            <p className="text-2xl font-semibold text-gray-900">
              ₦{totalVolume.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white p-4" style={{ borderRadius: 0 }}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Total Transactions</p>
            <p className="text-2xl font-semibold text-gray-900">
              {totalTransactionsCount.toLocaleString('en-NG')}
            </p>
          </div>
          <div className="bg-white p-4" style={{ borderRadius: 0 }}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Bill Payments</p>
            <p className="text-2xl font-semibold text-gray-900">
              {totalBillPaymentsCount.toLocaleString('en-NG')}
            </p>
          </div>
        </div>

        {error ? (
          <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
        ) : loading ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="bg-white p-6 animate-pulse" style={{ borderRadius: 0 }}>
              <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-64 bg-gray-200 rounded" />
            </div>
            <div className="bg-white p-6 animate-pulse" style={{ borderRadius: 0 }}>
              <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-64 bg-gray-200 rounded" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="bg-white p-6" style={{ borderRadius: 0 }}>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Top Transaction Volumes</h3>
                {chartData.length === 0 ? (
                  <p className="text-sm text-gray-500">No transaction data available.</p>
                ) : (
                  <Chart options={transactionOptions} series={transactionSeries} type="bar" height={320} />
                )}
              </div>
              <div className="bg-white p-6" style={{ borderRadius: 0 }}>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Balance Distribution</h3>
                {chartData.length === 0 || balanceSeries.every((value) => value === 0) ? (
                  <p className="text-sm text-gray-500">No balance data available.</p>
                ) : (
                  <Chart options={balanceOptions} series={balanceSeries} type="donut" height={320} />
                )}
              </div>
            </div>
            <div className="bg-white p-6" style={{ borderRadius: 0 }}>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Transaction Trends (Last 7 Days)</h3>
              {transactionTrendData.length === 0 || transactionTrendData.every((item) => item.value === 0) ? (
                <p className="text-sm text-gray-500">No trend data available.</p>
              ) : (
                <Chart options={trendOptions} series={trendSeries} type="line" height={320} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AnalyticsPage


