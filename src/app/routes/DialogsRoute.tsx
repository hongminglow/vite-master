import { TopicPage } from '@/components/navigation/TopicNavigator'
import { DialogsLab } from '@/features/dialogs-lab/DialogsLab'

export default function DialogsRoute() {
  return (
    <TopicPage currentPath="/dialogs">
      <DialogsLab />
    </TopicPage>
  )
}
