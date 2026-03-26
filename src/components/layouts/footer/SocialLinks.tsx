import { ForwardRefExoticComponent, JSX, RefAttributes } from 'react';

import { Link } from '@/i18n/routing';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconLink,
  IconProps,
} from '@tabler/icons-react';

type ISocialLink = {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
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
    { icon: IconBrandGithub, href: 'https://github.com', name: 'Github' },
    { icon: IconBrandTwitter, href: 'https://twitter.com', name: 'Twitter' },
    { icon: IconBrandLinkedin, href: 'https://linkedin.com', name: 'Linkedin' },
    { icon: IconBrandYoutube, href: 'https://youtube.com', name: 'Youtube' },
    { icon: IconLink, href: 'https://link.com', name: 'Link' },
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
