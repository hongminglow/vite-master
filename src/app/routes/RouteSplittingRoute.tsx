import { TopicPage } from '@/components/navigation/TopicNavigator'
import { RouteSplittingLab } from '@/features/route-splitting-lab/RouteSplittingLab'

export default function RouteSplittingRoute() {
  return (
    <TopicPage currentPath="/route-splitting">
      <RouteSplittingLab />
    </TopicPage>
  )
}
