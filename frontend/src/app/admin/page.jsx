import Header from "./components/header/header"
import Footer from "./components/footer/footer"
import Navbar from "./components/navbar/navbar"
import "./style.css"
import "./globals.css"
export default function Home() {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <main className="body">
        <div className="title">
          <h1>Secretaría de Movilidad y Transporte</h1>
        </div>
        <div className="container">
          <div className="texto">
            <p>
              Prueba
            </p>
          </div>
          <div className="imagen">
            <h1></h1>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}
