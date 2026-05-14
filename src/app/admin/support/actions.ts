'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function resolveSupportRequest(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('support_requests')
    .update({ status: 'resolved' })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/support')
}

export async function deleteSupportRequest(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('support_requests')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/support')
}
