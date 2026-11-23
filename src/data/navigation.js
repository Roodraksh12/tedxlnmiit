export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Theme', href: '/theme' },
  { name: 'Past Speakers', href: '/past-speakers' },
  { name: 'Team', href: '/team' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Campus Ambassador', href: '/campus-ambassador' },
  { name: 'About', href: '/about' },
];

export function activePath(pathname) {
  return pathname.replace(/\/$/, '') || '/';
}
