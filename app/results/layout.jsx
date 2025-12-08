import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import "@/app/globals.css"

export default function ResultsLayout({ children }) {
return (
        <html>
            <body className="app-container">
                <Header />
                    <main>
                        {children}
                    </main>
                <Footer />
            </body>
        </html>
    )
}