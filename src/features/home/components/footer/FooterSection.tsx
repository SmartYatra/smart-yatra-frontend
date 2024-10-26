import { Link } from 'react-router-dom';

import { ArrowRight } from 'lucide-react';

interface IFooterSectionProps {
  title: string;
  links: Array<{
    title: string;
    link: string;
  }>;
}

const FooterSection = ({ title, links }: IFooterSectionProps) => (
  <div className="flex flex-col gap-2">
    <h2 className="mb-2 w-fit border-b border-border pb-2 pr-4 text-lg font-semibold md:text-xl">
      {title}
    </h2>
    {links.map((link) => (
      <Link
        key={link.title}
        className="group flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
        to={link.link}
      >
        <div className="relative flex items-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="ml-2">{link.title}</span>
        </div>
      </Link>
    ))}
  </div>
);

export default FooterSection;
