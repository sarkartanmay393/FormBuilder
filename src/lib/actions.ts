import type { Form } from '@/types/form'

// In a real app, this would be a database
let forms: Form[] = []
let drafts: Form[] = []

export async function saveDraft(form: Form) {
  // Remove any existing draft
  drafts = drafts.filter(d => d.id !== form.id)
  // Add new draft
  drafts.push(form)
  return { success: true }
}

export async function publishForm(form: Form) {
  // Remove from drafts if exists
  drafts = drafts.filter(d => d.id !== form.id)
  // Remove any existing published version
  forms = forms.filter(f => f.id !== form.id)
  // Add new published version
  forms.push(form)
  return { success: true }
}

export async function getForm(id: string) {
  return forms.find(f => f.id === id) || drafts.find(d => d.id === id)
}


export const loadFormDataFromDraft = (id: number, supabase: any) => {
  return supabase.from('forms').select().eq('id', '2').maybeSingle();
}