import { revalidatePath } from 'next/cache'

export function triggerRevalidation(slug?: string) {
  try {
    revalidatePath('/', 'page')
    revalidatePath('/tours', 'page')
    if (slug) {
      revalidatePath(`/${slug}`, 'page')
    }
  } catch (err) {
    // Graceful fallback if invoked outside Next.js request context
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[revalidate] Cache revalidation skipped outside request lifecycle:', err)
    }
  }
}
