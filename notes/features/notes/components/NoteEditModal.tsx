'use client'

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface NoteEditModalProps {
	isOpen: boolean
	onClose: () => void
	noteId: number
	currentTitle: string
}

const NoteEditModal = ({
	isOpen,
	onClose,
	noteId,
	currentTitle
}: NoteEditModalProps) => {
	const router = useRouter()
	const [title, setTitle] = useState(currentTitle)

	const handleEdit = async () => {
		const supabase = createClient()

		const { error } = await supabase
			.from('notes')
			.update({ title })
			.eq('id', noteId)

		if (!error) {
			onClose()
			router.refresh()
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Note</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleEdit}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default NoteEditModal
