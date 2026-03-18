import { TopicPage } from '@/components/navigation/TopicNavigator'
import { ToolingLab } from '@/features/tooling-lab/ToolingLab'

export default function ToolingRoute() {
  return (
    <TopicPage currentPath="/tooling">
      <ToolingLab />
    </TopicPage>
  )
}
