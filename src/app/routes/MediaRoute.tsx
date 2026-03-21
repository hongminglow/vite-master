import { TopicPage } from '@/components/navigation/TopicNavigator'
import { MediaLab } from '@/features/media-lab/MediaLab'

export default function MediaRoute() {
  return (
    <TopicPage currentPath="/media">
      <MediaLab />
    </TopicPage>
  )
}
