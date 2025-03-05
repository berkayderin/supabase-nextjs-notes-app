import NotesTable from '@/features/notes/components/NotesTable'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const NotesPage = async () => {
	const supabase = await createClient()

	const { data: notes } = await supabase
		.from('notes')
		.select('*')
		.order('id', { ascending: false })

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/sign-in')
	}

	return (
		<div className="container mx-auto py-10">
			<NotesTable notes={notes} />
		</div>
	)
}

export default NotesPage
