import Head from 'next/head'
import { useState } from 'react'
import ColorPicker from '../components/ColorPicker'

const Body = ({ className = '', children, ...props }) => (
  <div className={`body--wrapper ${className}`} {...props}>
    {className.includes('yogurt') && (
      <svg
        viewBox="0 0 4997 1000"
        preserveAspectRatio="none"
        className="bg-wiggle"
      >
        <defs>
          <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="gradient-fill">
            <stop stopColor="hsla(var(--fill), 1)" offset="0%" />
            <stop stopColor="hsla(var(--fill), 0)" offset="100%" />
          </linearGradient>

          <mask id="wiggle-mask" fill="#fff">
            <path d="M5000,1000 L0,1000 L0,337.955829 C1216.49485,-112.651943 1216.49485,-112.651943 2500,337.955829 C3783.50515,788.563602 3783.50515,788.563602 5000,337.955829 L5000,1000 Z"></path>
          </mask>

          <rect
            id="wiggle"
            fill="url(#gradient-fill)"
            mask="url(#wiggle-mask)"
            x="0"
            y="0"
            width="5000"
            height="1000"
          ></rect>
        </defs>

        <use xlinkHref="#wiggle"></use>
        <use xlinkHref="#wiggle"></use>
      </svg>
    )}
    <div className="body">{children}</div>
  </div>
)

const Pane = ({ className = '', children }) => (
  <div className="pane--wrapper">
    <div className={`pane ${className}`}>{children}</div>
  </div>
)

const Styleguide = () => {
  const [style, setStyle] = useState(null)
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@400;500;600&family=Barlow:wght@400;500&family=Playfair+Display:ital,wght@1,700&family=Alegreya&family=Montserrat+Alternates:wght@500&family=Urbanist:wght@200;500&family=Open+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <title>Styleguide</title>
      </Head>

      <ColorPicker onChange={style => setStyle(style)} />

      <div className="styleguide" style={style}>
        <Body className="default">
          <div className="swatch fill--current">
            Current
          </div>
          <div className="swatch fill--light">
            Light
          </div>
          <div className="swatch fill--dark">
            Dark
          </div>
        </Body>

        <Body id="classic" className="classic">
          <Pane>
            <h1 className="heading">Classic</h1>
            <p className="caption">Last edited 6/12/2021 5:42 PM</p>
            <p>
              Lorem ipsum dolor sit amet cheeseburger hamburger hotdog ketchup
              tomato salad egg chicken barbecue hot sauce. Fusce luctus mi ac
              bibendum vestibulum. Phasellus eu tellus commodo, gravida lacus
              vitae, tincidunt dui.
            </p>
            <p className="row">
              <button className="btn">Click me</button>
              <a href="#classic" className="link">
                example.com
              </a>
            </p>
          </Pane>
        </Body>

        <Body id="default" className="default">
          <Pane>
            <h1 className="heading">Default</h1>
            <p className="caption">Last edited 6/12/2021 5:42 PM</p>
            <p>
              Lorem ipsum dolor sit amet cheeseburger hamburger hotdog ketchup
              tomato salad egg chicken barbecue hot sauce. Fusce luctus mi ac
              bibendum vestibulum. Phasellus eu tellus commodo, gravida lacus
              vitae, tincidunt dui.
            </p>
            <p className="row">
              <button className="btn">Click me</button>
              <a href="#default" className="link">
                example.com
              </a>
            </p>
          </Pane>
        </Body>

        <Body id="yogurt" className="yogurt">
          <Pane>
            <h1 className="heading">Yogurt</h1>
            <p className="caption">Last edited 6/12/2021 5:42 PM</p>
            <p>
              Lorem ipsum dolor sit amet cheeseburger hamburger hotdog ketchup
              tomato salad egg chicken barbecue hot sauce. Fusce luctus mi ac
              bibendum vestibulum. Phasellus eu tellus commodo, gravida lacus
              vitae, tincidunt dui.
            </p>
            <p className="row">
              <button className="btn">Click me</button>
              <a href="#yogurt" className="link">
                example.com
              </a>
            </p>
          </Pane>
        </Body>

        <Body id="aero-light" className="aero-light">
          <Pane>
            <h1 className="heading">Aero Light</h1>
            <p className="caption">Last edited 6/12/2021 5:42 PM</p>
            <p>
              Lorem ipsum dolor sit amet cheeseburger hamburger hotdog ketchup
              tomato salad egg chicken barbecue hot sauce. Fusce luctus mi ac
              bibendum vestibulum. Phasellus eu tellus commodo, gravida lacus
              vitae, tincidunt dui.
            </p>
            <p className="row">
              <button className="btn">Click me</button>
              <a href="#aero-light" className="link">
                example.com
              </a>
            </p>
          </Pane>
        </Body>

        <Body id="aero-dark" className="aero-dark">
          <Pane>
            <h1 className="heading">Aero Dark</h1>
            <p className="caption">Last edited 6/12/2021 5:42 PM</p>
            <p>
              Lorem ipsum dolor sit amet cheeseburger hamburger hotdog ketchup
              tomato salad egg chicken barbecue hot sauce. Fusce luctus mi ac
              bibendum vestibulum. Phasellus eu tellus commodo, gravida lacus
              vitae, tincidunt dui.
            </p>
            <p className="row">
              <button className="btn">Click me</button>
              <a href="#aero-dark" className="link">
                example.com
              </a>
            </p>
          </Pane>
        </Body>

        <Body id="memphis" className="memphis">
          <Pane>
            <h1 className="heading">Memphis</h1>
            <p className="caption">Last edited 6/12/2021 5:42 PM</p>
            <p>
              Lorem ipsum dolor sit amet cheeseburger hamburger hotdog ketchup
              tomato salad egg chicken barbecue hot sauce. Fusce luctus mi ac
              bibendum vestibulum. Phasellus eu tellus commodo, gravida lacus
              vitae, tincidunt dui.
            </p>
            <p className="row">
              <button className="btn">Click me</button>
              <a href="#memphis" className="link">
                example.com
              </a>
            </p>
          </Pane>
        </Body>
      </div>
    </>
  )
}

export default Styleguide
