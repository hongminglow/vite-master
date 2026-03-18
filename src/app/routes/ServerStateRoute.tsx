import { TopicPage } from '@/components/navigation/TopicNavigator'
import { ServerStateLab } from '@/features/server-state/ServerStateLab'

export default function ServerStateRoute() {
  return (
    <TopicPage currentPath="/server-state">
      <ServerStateLab />
    </TopicPage>
  )
}
