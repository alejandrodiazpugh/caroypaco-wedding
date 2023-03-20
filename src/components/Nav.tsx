import { useState, useEffect } from "react";
import Image from "next/image";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

type Props = {};

export default function Nav({}: Props) {
  const BREAKPOINT: number = 767;
  // CHECK FOR WINDOW SIZE
  const getWindowDimensions = () => {
    if (typeof window === "undefined") {
      //NEXT JS SSG CHECK
      return;
    }
    const { innerWidth: width } = window;
    return width;
  };
  // STATE
  const [navOpen, setNavOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState(getWindowDimensions());

  // HANDLE CLICK FOR NAV
  const handleClick = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    // UPDATE VALUE FOR WINDOW SIZE
    window.addEventListener("resize", () => {
      setWindowDimension(getWindowDimensions());
    });

    // CHECK FOR BREAKPOINT TO CLOSE THE NAVBAR
    const width = getWindowDimensions();
    if (width && width > BREAKPOINT) {
      setNavOpen(false);
    }
  }, [windowDimension]);
  return (
    <header>
      <Image src="/cp-06.png" alt="" priority width="50" height="50" />

      <nav className="mobile-nav">
        {navOpen ? (
          <IoClose fill={"white"} onClick={() => handleClick()} />
        ) : (
          <BiMenu fill={"white"} onClick={() => handleClick()} />
        )}
      </nav>
      <nav className="desktop-nav">
        <ul role="list" className={`nav-items__desktop`}>
          <li>
            <a href="#location">Lugar y Fecha</a>
          </li>
          <li>
            <a href="#hosting">Hospedaje</a>
          </li>
          <li>
            <a href="#registry">Regalos</a>
          </li>
          <li>
            <a href="#rsvp">RSVP</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
