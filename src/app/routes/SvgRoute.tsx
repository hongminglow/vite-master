import { TopicPage } from '@/components/navigation/TopicNavigator'
import { SvgLab } from '@/features/svg-lab/SvgLab'

export default function SvgRoute() {
  return (
    <TopicPage currentPath="/svg">
      <SvgLab />
    </TopicPage>
  )
}
