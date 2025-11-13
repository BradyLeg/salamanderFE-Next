import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import "@/app/globals.css"

export default function RootLayout({ children }) {
return (
        <html>
            <body className="app-container">
                <Header />
                    <main className="app-content">
                        {children}
                    </main>
                <Footer />
            </body>
        </html>
    )
}