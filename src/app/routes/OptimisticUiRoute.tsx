import { TopicPage } from '@/components/navigation/TopicNavigator'
import { OptimisticUiLab } from '@/features/optimistic-ui-lab/OptimisticUiLab'

export default function OptimisticUiRoute() {
  return (
    <TopicPage currentPath="/optimistic-ui">
      <OptimisticUiLab />
    </TopicPage>
  )
}
