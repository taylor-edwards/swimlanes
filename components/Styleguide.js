import { THEMES } from '../constants'
import Button from '../components/Button'
import Card from '../components/Card'
import Link from '../components/Link'
import Pane from '../components/Pane'
import Theme from '../components/Theme'
import { Body, Caption, Emphasis, Heading } from '../components/Typography'
import styles from '../styles/Styleguide.module.scss'

const Styleguide = ({ className = '', modeOverride }) => (
  <div className={`${styles.styleguide} ${className}`}>
    <Theme modeOverride={modeOverride}>
      <Pane className="default">
        <div className={styles.swatches}>
          <div className={`${styles.swatchEm} deepen`}>
            Emphasis (shade)
          </div>
          <div className={styles.swatchEm}>
            Emphasis
          </div>
          <div className={`${styles.swatchEm} brighten`}>
            Emphasis (tint)
          </div>
          <div className={styles.swatchBody}>
            Body
          </div>
          <div className={styles.swatchPos}>
            Positive
          </div>
          <div className={styles.swatchNeg}>
            Negative
          </div>
        </div>
      </Pane>
    </Theme>

    {Object.keys(THEMES).map(theme => (
      <Theme modeOverride={modeOverride} themeOverride={theme} key={theme}>
        <Pane themeOverride={theme}>
          <Card id={`${modeOverride}-${theme}`} className={styles.card}>
            <Heading level="3" className={styles.heading}>{theme}</Heading>
            <Caption block>Last edited 6/12/2021 5:42 PM</Caption>
            <Body>
              Lorem ipsum dolor sit amet cheeseburger hamburger hotdog ketchup
              tomato salad egg chicken barbecue hot sauce. Fusce luctus mi ac
              bibendum vestibulum. Phasellus eu tellus commodo, gravida lacus
              vitae, tincidunt dui.
            </Body>
            <Body className={styles.row}>
              <Button>Click me</Button>
              <Button>Edit</Button>
              <Link href={`#${modeOverride}-${theme}`} className="link">example.com</Link>
            </Body>
          </Card>
        </Pane>
      </Theme>
    ))}
  </div>
)

export default Styleguide
