/*
 * Food photography: Unsplash (free under the Unsplash License), resized and
 * re-encoded as WebP at download time.
 */
import chickenJollof from '../assets/food/chicken-jollof.webp'
import egusi from '../assets/food/egusi.webp'
import jollofPlated from '../assets/food/jollof-plated.webp'
import jollofSkewers from '../assets/food/jollof-skewers.webp'
import jollofSpread from '../assets/food/jollof-spread.webp'
import puffPuff from '../assets/food/puff-puff.webp'
import shawarma from '../assets/food/shawarma.webp'
import zobo from '../assets/food/zobo.webp'

export const FOOD = { chickenJollof, egusi, jollofPlated, jollofSkewers, jollofSpread, puffPuff, shawarma, zobo }

/*
 * Drop-in folders. A file named after a key appears automatically, no code
 * change: src/assets/screens/food.png replaces the coded food mockup, and
 * src/assets/team/badmus-qudus.jpg replaces that badge's monogram.
 */
const screens = import.meta.glob('../assets/screens/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const team = import.meta.glob('../assets/team/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function byName(files: Record<string, string>, name: string) {
  const key = Object.keys(files).find((k) => k.split('/').pop()!.replace(/\.[a-z]+$/i, '') === name)
  return key ? files[key] : undefined
}

export const screenshotFor = (name: string) => byName(screens, name)
export const teamPhotoFor = (slug: string) => byName(team, slug)
