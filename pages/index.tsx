import { useCallback, useEffect, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Particles from "react-particles";

import styles from '../styles/index.module.css'

import { loadFull } from "tsparticles";
import { Engine } from 'tsparticles-engine';

export default function Home() {

  const [scrolled, setScrolled] = useState(false)

  function rotateArrow() {
    let root = document.querySelector(':root') as HTMLElement;

    if (root.style.getPropertyValue('--rotation') == '180deg') {
      root.style.setProperty('--rotation', '0deg')
      root.style.setProperty('--rotationHover', '180deg')
      root.style.setProperty('--navTranslate', '50px')
    } else {
      root.style.setProperty('--rotation', '180deg')
      root.style.setProperty('--rotationHover', '0deg')
      root.style.setProperty('--navTranslate', '0px')
    }
  }

  function DiscordCopy() {
    
    if (!navigator.clipboard) {
      var textArea = document.createElement("textarea");
      textArea.value = "K4oS#8387";
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {document.execCommand('copy');} 
      catch {}

      document.body.removeChild(textArea);
    } else {
      navigator.clipboard.writeText("K4oS#8387")
    }

    let copied = document.createElement("div")
    copied.classList.add(styles.clipboard)
    copied.innerText = "Copied to clipboard!"

    document.getElementById("Discord")?.appendChild(copied)
  }

  const handleScroll = useCallback((event: Event) => {

    if (!scrolled) {
      let scroll = document.getElementById("Scroll") as HTMLElement
      scroll.style.opacity = "0"
      setScrolled(true)
    }

    // console.log(document.body.scrollTop)

  }, [scrolled]);
  
  useEffect(() => {
    document.body.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.body.removeEventListener("scroll", handleScroll);
   }

  }, [handleScroll])

  const particlesInit = useCallback(async (engine: Engine) => { await loadFull(engine); }, []);

  return (
    <div className={styles.App}>
      <Head>
        <title>Javier Díaz</title>
        <meta name="description" content="Javier Díaz portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Particles id="tsparticles" init={particlesInit} options={{"fullScreen":{"enable":true,"zIndex":0},"particles":{"number":{"value":160,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"retina_detect":true,"background":{"color":"#000"}}} />

      <div className={styles.navCollapse} onClick={rotateArrow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </div>

      <div className={styles.nav}>
        <Link href="https://www.instagram.com/thek4os06" className={styles.navLink}>Instagram</Link>
        <div className={styles.navLink} onClick={DiscordCopy} id="Discord">Discord</div>
        <Link href="https://github.com/CaraTortu" className={styles.navLink}>Github</Link>
      </div>

      {/* MAIN PAGE */}
      <div className={styles.main}>
        <div className={styles.firstPage}>
          <h1 className={styles.title}>Javier Díaz</h1>

        </div>
        <div className={styles.scrollText} id="Scroll">
            <p>SCROLL</p>
            <div className={styles.scrollLine}></div>
        </div>
      </div>  

      {/* SEPARATOR */}
      <div className={styles.separator}></div>    

      {/* CONTACT PAGE */}
      <div className={styles.main}>
        <div className={styles.contact}>
          <div className={styles.contactTitle}>
            <h1>CONTACT</h1>
            <h2 className={styles.contactDescription}>Would you like to talk to me? You can write me directly using the information below or use the following contact form!</h2>
          </div>
          <div className={styles.contactInfo}>
            <h1>Information</h1>
            <div>
              <ul>
                <li>Phone Number: +34 644 73 5757</li>
                <li>Email: javier@javier.ie</li>
                <li>You can always text me on discord: K4oS#8387</li>
                <li>Click on the top right button to show more!</li>
              </ul>
            </div>
          </div>
          <div className={styles.form}>
            <input type="email" id="Email" placeholder="Email: JohnDoe@doesnotexist.com" required/>
            <input type="text" id="Name" placeholder="Name: John Doe" required/>
            <input type="phone" id="Phone" placeholder="Phone number: +353 085 834 3647" />
            <textarea id="Message" placeholder="Type your message here!" />
            <button>Send Email!</button>
          </div>
        </div>
      </div>
    </div>
  )
}
