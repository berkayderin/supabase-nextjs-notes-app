import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

const NotesPage = async () => {
	const supabase = await createClient()

	const { data: notes } = await supabase.from('notes').select()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/sign-in')
	}

	return <pre>{JSON.stringify(notes, null, 2)}</pre>
}

export default NotesPage
