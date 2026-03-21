import { TopicPage } from '@/components/navigation/TopicNavigator'
import { AuthRoutingLab } from '@/features/auth-routing-lab/AuthRoutingLab'

export default function AuthRoutingRoute() {
  return (
    <TopicPage currentPath="/auth-routing">
      <AuthRoutingLab />
    </TopicPage>
  )
}
