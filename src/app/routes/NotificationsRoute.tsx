import { TopicPage } from '@/components/navigation/TopicNavigator'
import { NotificationsLab } from '@/features/notifications-lab/NotificationsLab'

export default function NotificationsRoute() {
  return (
    <TopicPage currentPath="/notifications">
      <NotificationsLab />
    </TopicPage>
  )
}
