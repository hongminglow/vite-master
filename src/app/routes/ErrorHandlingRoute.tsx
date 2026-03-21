import { TopicPage } from '@/components/navigation/TopicNavigator'
import { DemoErrorBoundary } from '@/features/error-handling-lab/components/DemoErrorBoundary'
import { ErrorHandlingLab } from '@/features/error-handling-lab/ErrorHandlingLab'

export default function ErrorHandlingRoute() {
  return (
    <DemoErrorBoundary fallbackTitle="Route crashed — recovering" level="route">
      <TopicPage currentPath="/error-handling">
        <ErrorHandlingLab />
      </TopicPage>
    </DemoErrorBoundary>
  )
}
