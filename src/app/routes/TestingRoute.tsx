import { TopicPage } from '@/components/navigation/TopicNavigator'
import { TestingLab } from '@/features/testing-lab/TestingLab'

export default function TestingRoute() {
  return (
    <TopicPage currentPath="/testing">
      <TestingLab />
    </TopicPage>
  )
}
