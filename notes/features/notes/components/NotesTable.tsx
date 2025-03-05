'use client'

import { useState } from 'react'
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
import NoteDeleteModal from './NoteDeleteModal'

interface Note {
	id: number
	title: string
}

interface NotesTableProps {
	notes: Note[] | null
}

const NotesTable = ({ notes }: NotesTableProps) => {
	const [selectedNoteId, setSelectedNoteId] = useState<number | null>(
		null
	)

	return (
		<>
			<Table className="border">
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{notes?.map((note) => (
						<TableRow key={note.id}>
							<TableCell>{note.id}</TableCell>
							<TableCell>{note.title}</TableCell>
							<TableCell>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setSelectedNoteId(note.id)}
								>
									<Trash size={16} />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{selectedNoteId && (
				<NoteDeleteModal
					isOpen={!!selectedNoteId}
					onClose={() => setSelectedNoteId(null)}
					noteId={selectedNoteId}
				/>
			)}
		</>
	)
}

export default NotesTable
