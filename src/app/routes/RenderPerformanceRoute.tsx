import { TopicPage } from '@/components/navigation/TopicNavigator'
import { RenderPerformanceLab } from '@/features/render-lab/RenderPerformanceLab'

export default function RenderPerformanceRoute() {
  return (
    <TopicPage currentPath="/render-performance">
      <RenderPerformanceLab />
    </TopicPage>
  )
}
