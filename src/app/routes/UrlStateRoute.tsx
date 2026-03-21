import { TopicPage } from '@/components/navigation/TopicNavigator'
import { UrlStateLab } from '@/features/url-state-lab/UrlStateLab'

export default function UrlStateRoute() {
  return (
    <TopicPage currentPath="/url-state">
      <UrlStateLab />
    </TopicPage>
  )
}
