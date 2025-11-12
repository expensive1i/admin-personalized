import TopBar from '../components/TopBar'
import Banner from '../components/Banner'
import StatsCard, { type StatsCardProps } from '../components/StatsCard'
import RecentActivity from '../components/RecentActivity'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserGroupIcon, TransactionHistoryIcon, Notification01Icon, Wallet03Icon } from '@hugeicons/core-free-icons'
import activitiesData from '../data/recentActivities.json' with { type: 'json' }
import { type ActivityItem } from '../components/RecentActivity'

function HomePage() {
  const activities = activitiesData as ActivityItem[]

  const stats: Array<StatsCardProps & { id: string }> = [
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
      value: '₦0.00',
      subtitle: 'Past 30 days',
      icon: <HugeiconsIcon icon={TransactionHistoryIcon} className="w-24 h-24 text-inherit" />
    },
    {
      id: 'balance',
      title: 'Total Balance',
      value: '₦0.00',
      subtitle: 'Across all accounts',
      icon: <HugeiconsIcon icon={Wallet03Icon} className="w-24 h-24 text-inherit" />
    },
    {
      id: 'tickets',
      title: 'Open Tickets',
      value: '0',
      subtitle: 'Requiring attention',
      icon: <HugeiconsIcon icon={Notification01Icon} className="w-24 h-24 text-inherit" />
    }
  ]

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
          {stats.map((stat) => (
            <StatsCard key={stat.id} {...stat} />
          ))}
        </div>
        
        <div className="mt-6">
          <RecentActivity activities={activities} maxItems={5} />
        </div>
      </section>
    </div>
  )
}

export default HomePage

