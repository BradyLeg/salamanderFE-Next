import "@/app/globals.css"

export default function ResultsLayout({ children }) {
return (
        <html>
            <body className="app-container">
                    <main>
                        {children}
                    </main>
            </body>
        </html>
    )
}