import { TopicPage } from '@/components/navigation/TopicNavigator'
import { RequestFormLab } from '@/features/forms-lab/RequestFormLab'

export default function FormsRoute() {
  return (
    <TopicPage currentPath="/forms">
      <RequestFormLab />
    </TopicPage>
  )
}
