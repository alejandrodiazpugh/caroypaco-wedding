import React from 'react';
import Image from 'next/image';
import SimpleDialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
type Props = {
	open: boolean;
	onClose: () => void;
};

export default function Dialog({ open, onClose }: Props) {
	return (
		<SimpleDialog
			open={open}
			scroll={'paper'}
			onClose={onClose}
			className="dialog"
			fullWidth={true}
			maxWidth={'md'}
		>
			<h3 className="dialog-title">Algunos ejemplos:</h3>
			<div className="dialog-images">
				<Image src="/example1.jpeg" width="200" height="400" alt="" />
				<Image src="/example2.jpeg" width="200" height="400" alt="" />
				<Image src="/example3.jpeg" width="200" height="400" alt="" />
				<Image src="/example4.jpg" width="200" height="400" alt="" />
				<Image src="/example5.jpg" width="200" height="400" alt="" />
				<Image src="/example6.jpeg" width="200" height="400" alt="" />
				<Image src="/example7.jpg" width="200" height="400" alt="" />
				<Image src="/example8.jpg" width="200" height="400" alt="" />
				<Image src="/example9.jpg" width="200" height="400" alt="" />
				<Image src="/example10.jpg" width="200" height="400" alt="" />
				<Image src="/example11.jpg" width="200" height="400" alt="" />
				<Image src="/example12.jpg" width="200" height="400" alt="" />
			</div>
		</SimpleDialog>
	);
}
