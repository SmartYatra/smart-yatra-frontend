import { Link } from 'react-router-dom';

import { LucideIcon } from 'lucide-react';

interface IContactLinkProps {
  title: string;
  link: string;
  Icon: LucideIcon;
}

const ContactLink = ({ title, link, Icon }: IContactLinkProps) => (
  <Link
    className="group flex items-center gap-2 text-background/80 transition-colors duration-300 hover:text-background"
    to={link}
  >
    <Icon className="size-5" />
    <span className="mr-2">{title}</span>
  </Link>
);

export default ContactLink;
