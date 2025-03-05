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
import { Trash, Pencil } from 'lucide-react'
import NoteDeleteModal from './NoteDeleteModal'
import NoteEditModal from './NoteEditModal'

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
	const [editNote, setEditNote] = useState<Note | null>(null)

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
								<div className="flex gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setEditNote(note)}
									>
										<Pencil size={16} />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setSelectedNoteId(note.id)}
									>
										<Trash size={16} />
									</Button>
								</div>
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

			{editNote && (
				<NoteEditModal
					isOpen={!!editNote}
					onClose={() => setEditNote(null)}
					noteId={editNote.id}
					currentTitle={editNote.title}
				/>
			)}
		</>
	)
}

export default NotesTable
