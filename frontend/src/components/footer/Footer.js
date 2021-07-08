import * as React from 'react'
import FooterPortal from '../portals/Footer'
import { useHistory } from 'react-router-dom'
import Button from '../Button'

const Footer = ({
  nextDisabled,
  backDisabled,
  callback,
  backVariant,
  nextVariant,
  prev,
  furnitureList,
  recommendations,
}) => {
  const history = useHistory()

  const handleBack = el => {
    history.push(prev)
  }

  const handleAddFurniture = () => {
    history.push('/add-furniture-details')
  }

  const handleSkipRecommendations = () => {
    console.log('clicked')
    history.push('/recommendations')
  }

  return (
    <FooterPortal>
      <footer>
        <div
          className={`container ${
            furnitureList || recommendations ? 'threecol' : 'twocol'
          }`}
        >
          <nav>
            <ul>
              <li>
                <Button
                  id="footerBack"
                  text="Back"
                  variant={`small light ${backVariant}`}
                  disabled={backDisabled}
                  callback={handleBack}
                  onClick={handleBack}
                />
              </li>
              {furnitureList ? (
                <li>
                  <Button
                    id="footerAlt"
                    text="Add another furniture item"
                    variant="small light"
                    callback={handleAddFurniture}
                  />
                </li>
              ) : (
                ''
              )}
              {recommendations ? (
                <li>
                  <Button
                    id="footerAlt"
                    text="Use our recommendations"
                    variant="small light"
                    callback={handleSkipRecommendations}
                  />
                </li>
              ) : (
                ''
              )}
              <li className="right">
                <Button
                  id="footerNext"
                  text="Next"
                  variant={`small ${nextVariant}`}
                  disabled={nextDisabled}
                  callback={callback}
                />
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </FooterPortal>
  )
}

export default Footer
