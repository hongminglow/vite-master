import { TopicPage } from '@/components/navigation/TopicNavigator'
import { VirtualListLab } from '@/features/virtual-list-lab/VirtualListLab'

export default function VirtualListsRoute() {
  return (
    <TopicPage currentPath="/virtual-lists">
      <VirtualListLab />
    </TopicPage>
  )
}
