import { JSX } from 'react';

import { Link } from '@/i18n/routing';

/**
 * LinkSection component renders a list of links for a given section.
 * @param {Object} props
 * @param {string} props.title - The title of the section.
 * @param {Array} props.links - An array of link objects with 'name' and 'href' properties.
 *
 * @returns {JSX.Element} The rendered LinkSection component.
 */
const LinkSection = ({
  title,
  links,
}: {
  title: string;
  links: Array<{ name: string; href: string }>;
}): JSX.Element => {
  return (
    <div>
      <h3 className='mb-4 text-sm font-semibold'>{title}</h3>
      <ul className='space-y-2'>
        {links.map(({ name, href }) => (
          <li key={name}>
            <Link
              className='text-sm text-muted-foreground transition-colors hover:text-primary'
              href={href}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkSection;
