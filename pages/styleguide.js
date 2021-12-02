import Head from 'next/head'
import { useState } from 'react'
import ColorPicker from '../components/ColorPicker'
import Styleguide from '../components/Styleguide'
import { samples } from '../styles/Styleguide.module.scss'

const Page = () => {
  const [style, setStyle] = useState(null)
  return (
    <div style={style}>
      <Head>
        <title>Styleguide</title>
      </Head>

      <ColorPicker onChange={colorStyles => setStyle(colorStyles)} />

      <div className={samples}>
        <Styleguide modeOverride="light" />
        <Styleguide modeOverride="dark" />
      </div>
    </div>
  )
}

export default Page
