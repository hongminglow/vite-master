import { TopicPage } from '@/components/navigation/TopicNavigator'
import { InputTimingLab } from '@/features/input-timing-lab/InputTimingLab'

export default function InputTimingRoute() {
  return (
    <TopicPage currentPath="/input-timing">
      <InputTimingLab />
    </TopicPage>
  )
}
