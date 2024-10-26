import { Link } from 'react-router-dom';

import { LucideIcon } from 'lucide-react';

interface IContactLinkProps {
  title: string;
  link: string;
  Icon: LucideIcon;
}

const ContactLink = ({ title, link, Icon }: IContactLinkProps) => (
  <Link
    className="group flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
    to={link}
  >
    <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
    <span className="mr-2">{title}</span>
  </Link>
);

export default ContactLink;
