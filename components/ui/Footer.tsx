import Image from "next/image"

import Logo from '../../public/logo/Logo.png'

export const Footer = () => {
    return (
        <>
            <div className="footer_container">
                <div className="footer_css container_footer_title">
                    <Image src={Logo} width={120} height={120} style={{ margin: '0 auto', width: '100%' }} alt="logo_helados"/>
                </div>
                <div className="footer_css container_footer_about">
                    <h2>¿Quiénes somos?</h2>
                    <p>
                        Somos unas de las sedes de la heladería 
                        <a href="https://www.facebook.com/cremososartesanales20" style={{ marginLeft: 5, color: "rgb(34, 75, 130)" }} target= "_blank" rel="noreferrer">
                            Helados Cremosos
                        </a>
                    </p>
                    <p>Contámos con una gran variedad de helados</p>
                </div>
                <div className="footer_css container_footer_location">
                    <h2>Nuestra ubicación:</h2>
                    <p>100 metros este de la Iglesia Católica de San Miguel de Barranca, Puntarenas</p>
                </div>
                <div className="footer_css container_footer_call">
                    <h2>Llámanos</h2>
                    <p>+506 8681 8261</p>
                </div>
            </div>
            
            <div className="footer_css container_info_developer">
                <p>© 2023. Helados Artesanales - SanMiguel | Elaborado por Armando Cortés Murillo </p>
            </div>
        </>
    )
}