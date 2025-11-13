import { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import Banner from '../components/Banner'
import StatsCard, { type StatsCardProps } from '../components/StatsCard'
import StatsCardSkeleton from '../components/skeletal-ui/StatsCardSkeleton'
import RecentActivity from '../components/RecentActivity'
import RecentActivitySkeleton from '../components/skeletal-ui/RecentActivitySkeleton'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserGroupIcon, TransactionHistoryIcon, BarChartIcon, Wallet03Icon } from '@hugeicons/core-free-icons'
import { type ActivityItem } from '../components/RecentActivity'
import { getDashboardStats } from '../services/statsService'
import { getRecentActivities } from '../services/activityService'

function HomePage() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingActivities, setLoadingActivities] = useState(true)

  const formatCurrencyValue = (amount: number) => {
    const thresholds = [
      { value: 1_000_000_000, suffix: 'B' },
      { value: 1_000_000, suffix: 'M' },
      { value: 1_000, suffix: 'K' }
    ]

    const absAmount = Math.abs(amount)
    for (const threshold of thresholds) {
      if (absAmount >= threshold.value) {
        const scaled = amount / threshold.value
        const absScaled = Math.abs(scaled)
        let fractionDigits = 2
        if (absScaled >= 100) {
          fractionDigits = 0
        } else if (absScaled >= 10) {
          fractionDigits = 1
        }

        return `₦${scaled.toLocaleString('en-NG', {
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits
        })}${threshold.suffix}`
      }
    }

    return `₦${amount.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  const [stats, setStats] = useState<Array<StatsCardProps & { id: string }>>([
    {
      id: 'users',
      title: 'Total Users',
      value: '0',
      subtitle: 'Active this month',
      icon: <HugeiconsIcon icon={UserGroupIcon} className="w-24 h-24 text-inherit" />
    },
    {
      id: 'transactions',
      title: 'Transactions',
      value: formatCurrencyValue(0),
      subtitle: 'Past 30 days',
      icon: <HugeiconsIcon icon={TransactionHistoryIcon} className="w-24 h-24 text-inherit" />
    },
    {
      id: 'balance',
      title: 'Total Balance',
      value: formatCurrencyValue(0),
      subtitle: 'Across all accounts',
      icon: <HugeiconsIcon icon={Wallet03Icon} className="w-24 h-24 text-inherit" />
    },
    {
      id: 'accounts',
      title: 'Total Accounts',
      value: '0',
      subtitle: 'Across all users',
      icon: <HugeiconsIcon icon={BarChartIcon} className="w-24 h-24 text-inherit" />
    }
  ])
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true)
        const dashboardStats = await getDashboardStats()

        setStats([
          {
            id: 'users',
            title: 'Total Users',
            value: dashboardStats.totalUsers.toString(),
            subtitle: 'Active this month',
            icon: <HugeiconsIcon icon={UserGroupIcon} className="w-24 h-24 text-inherit" />
          },
          {
            id: 'transactions',
            title: 'Transactions',
            value: formatCurrencyValue(dashboardStats.totalTransactions),
            subtitle: 'Past 30 days',
            icon: <HugeiconsIcon icon={TransactionHistoryIcon} className="w-24 h-24 text-inherit" />
          },
          {
            id: 'balance',
            title: 'Total Balance',
            value: formatCurrencyValue(dashboardStats.totalBalance),
            subtitle: 'Across all accounts',
            icon: <HugeiconsIcon icon={Wallet03Icon} className="w-24 h-24 text-inherit" />
          },
          {
            id: 'accounts',
            title: 'Total Accounts',
            value: dashboardStats.totalAccounts.toString(),
            subtitle: 'Across all users',
            icon: <HugeiconsIcon icon={BarChartIcon} className="w-24 h-24 text-inherit" />
          }
        ])
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        // Keep default values on error
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoadingActivities(true)
        const recentActivities = await getRecentActivities(5)
        setActivities(recentActivities)
      } catch (error) {
        console.error('Error fetching recent activities:', error)
        // Keep empty array on error
      } finally {
        setLoadingActivities(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <Banner />
        <div className="absolute inset-x-0 top-0">
          <TopBar />
        </div>
      </div>
      <section className="relative z-20 px-5 -mt-10 pb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          {loadingStats ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            stats.map((stat) => (
              <StatsCard key={stat.id} {...stat} />
            ))
          )}
        </div>
        
        <div className="mt-6">
          {loadingActivities ? (
            <RecentActivitySkeleton />
          ) : (
            <RecentActivity activities={activities} maxItems={5} />
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage

