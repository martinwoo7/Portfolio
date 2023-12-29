import { PopupWindow } from "../../popupWindow";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";
import MobileBar from "../../mobileBar";
import { IoMdDownload } from "react-icons/io";
import Pressable from "../../pressable";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResumeWindow = ({ name }) => {
	const [numPages, setNumPages] = useState();
	const [file, setFile] = useState("./resume.pdf");
	const onDocumentLoadSuccess = ({ numPages: NextNumPages }) => {
		setNumPages(NextNumPages);
	};

	const handleDownload = () => {
		const fileUrl = "./resume.pdf";
		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = "Martin_Woo_resume.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<PopupWindow title="Resume" name={name}>
			<div className="bg-zinc-900 h-full md:rounded-b-xl md:px-10">
				<MobileBar />
				<div className="gap-3 overflow-y-scroll overflow-hidden h-full px-8 flex flex-col items-center">
					<p className="semi-bold text-xl">Resume</p>
					<div className="flex justify-center">
						<div className="flex flex-col items-center bg-zinc-800 p-3 rounded-xl w-fit">
							<Document
								file={file}
								onLoadSuccess={onDocumentLoadSuccess}
							>
								{Array.from(new Array(1), (el, index) => (
									<Page
										key={`page_${index + 1}`}
										pageNumber={index + 1}
										width={300}
									/>
								))}
							</Document>
						</div>
					</div>
					<Pressable onClick={handleDownload}>
						<div className="p-2 bg-zinc-800 rounded-xl">
							<IoMdDownload size={32} />
						</div>
					</Pressable>
				</div>
			</div>
		</PopupWindow>
	);
};

export default ResumeWindow;
