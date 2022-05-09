// Code adapted from taken from
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({ src }) {

    return (
        <Document
            file={src}
            onLoadError={console.log}>
            <Page pageNumber={1} />
        </Document>
    )
}
