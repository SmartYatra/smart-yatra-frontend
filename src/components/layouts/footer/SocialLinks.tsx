import { JSX } from 'react';

import {
  Github,
  Link2,
  Linkedin,
  LucideIcon,
  Twitter,
  Youtube,
} from 'lucide-react';

import { Link } from '@/i18n/routing';

type ISocialLink = {
  icon: LucideIcon;
  href: string;
  name: string;
};

/**
 * SocialLinks component renders social media links with corresponding icons.
 * @returns {JSX.Element} The rendered SocialLinks component.
 */
const SocialLinks = (): JSX.Element => {
  /**
   * Social links for the footer to engage with the community.
   * @type {ISocialLink[]}
   */
  const SOCIAL_LINKS: ISocialLink[] = [
    { icon: Github, href: 'https://github.com', name: 'Github' },
    { icon: Twitter, href: 'https://twitter.com', name: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', name: 'Linkedin' },
    { icon: Youtube, href: 'https://youtube.com', name: 'Youtube' },
    { icon: Link2, href: 'https://link.com', name: 'Link' },
  ];

  return (
    <div className='flex items-center gap-4'>
      {SOCIAL_LINKS.map(({ icon: Icon, href, name }) => {
        return (
          <Link
            aria-label={`Visit our ${name} page`}
            className='text-muted-foreground transition-colors hover:text-foreground'
            href={href}
            key={name}
          >
            <Icon size={18} />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialLinks;
