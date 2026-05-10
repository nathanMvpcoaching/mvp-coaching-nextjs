import { SiValorant, SiLeagueoflegends, SiCounterstrike, SiFortnite } from 'react-icons/si'

export { SiValorant, SiLeagueoflegends, SiCounterstrike, SiFortnite }

export const COLOR = {
  valorant: '#FA4454',
  lol: '#C89B3C',
  cs2: '#F0A500',
  overwatch: '#F99E1A',
  apex: '#DA292A',
  fortnite: '#9D4DBB',
}

export function SiOverwatch({ size = '1em', color = 'currentColor', style, className, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      style={style}
      className={className}
      aria-label="Overwatch 2"
      role="img"
      {...rest}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5L1.6 7.5v9L12 22.5l10.4-6V7.5L12 1.5zm0 4.62L18.4 9.81v4.38L12 17.88l-6.4-3.69V9.81L12 6.12zm0 3.46l-3.4 1.96v3.92L12 17.42l3.4-1.96v-3.92L12 9.58z"/>
    </svg>
  )
}

export function SiApex({ size = '1em', color = 'currentColor', style, className, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      style={style}
      className={className}
      aria-label="Apex Legends"
      role="img"
      {...rest}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2L1 22h22L12 2zm0 4.6L19.4 20H4.6L12 6.6zm0 4.4l-3.5 6.5h7L12 11z"/>
    </svg>
  )
}
