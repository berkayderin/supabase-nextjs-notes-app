import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

type Note = {
	id: number
	title: string
}

const NotesPage = async () => {
	const supabase = await createClient()

	const { data: notes } = await supabase.from('notes').select()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/sign-in')
	}

	return (
		<Table className="border">
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Başlık</TableHead>
					<TableHead>İşlemler</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{notes?.map((note: Note) => (
					<TableRow key={note.id}>
						<TableCell>{note.id}</TableCell>
						<TableCell>{note.title}</TableCell>
						<TableCell>
							<Button variant="ghost" size={'sm'}>
								<Trash size={16} />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default NotesPage
