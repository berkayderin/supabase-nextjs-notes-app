'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface NoteDeleteModalProps {
	isOpen: boolean
	onClose: () => void
	noteId: number
}

const NoteDeleteModal = ({
	isOpen,
	onClose,
	noteId
}: NoteDeleteModalProps) => {
	const router = useRouter()

	const handleDelete = async () => {
		const supabase = createClient()

		const { error } = await supabase
			.from('notes')
			.delete()
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
					<DialogTitle>Delete Note</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete note #{noteId}?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default NoteDeleteModal
