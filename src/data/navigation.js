export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Theme', href: '/theme' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Past Speakers', href: '/past-speakers' },
  { name: 'Team', href: '/team' },
  { name: 'Campus Ambassador', href: '/campus-ambassador' },
];

export function activePath(pathname) {
  return pathname.replace(/\/$/, '') || '/';
}
