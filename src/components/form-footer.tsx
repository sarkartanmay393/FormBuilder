import { Button } from "@/components/ui/button"
import { Check, Save } from 'lucide-react'

interface FormFooterProps {
  onSaveDraft: () => void
  onPublish: () => void
}

export function FormFooter({ onSaveDraft, onPublish }: FormFooterProps) {
  return (
    <div className="h-[54px] fixed bottom-0 w-full max-w-2xl mx-auto flex items-center justify-between p-4 border-t bg-gray-100">
      <Button
        variant="outline"
        size="sm"
        className="text-gray-600 rounded-xl gap-1 font-semibold"
        onClick={onSaveDraft}
      >
        <Save className="w-4 h-4" />
        Save as Draft
      </Button>
      <Button
        size="sm"
        className="bg-green-500 hover:bg-green-600 rounded-xl gap-1 font-semibold"
        onClick={onPublish}
      >
        <Check className="w-4 h-4" />
        Publish form
      </Button>
    </div>
  )
}

