import { Link } from 'react-router-dom';

interface IFooterSectionProps {
  title: string;
  links: Array<{
    title: string;
    link: string;
  }>;
}

const FooterSection = ({ title, links }: IFooterSectionProps) => (
  <div className="flex flex-col gap-2">
    <h2 className="mb-2 w-fit border-b border-border/20 pb-2 pr-4 text-lg font-medium md:text-xl">
      {title}
    </h2>
    {links.map((link) => (
      <Link
        key={link.title}
        className="group flex items-center gap-2 text-sm text-background/80 transition-colors duration-300 hover:text-background"
        to={link.link}
      >
        {link.title}
      </Link>
    ))}
  </div>
);

export default FooterSection;
