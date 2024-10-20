interface IAboutHeaderProps {
  title: string;
  description: string;
  backgroundImage: string;
}

const AboutHeader = ({ title, description, backgroundImage }: IAboutHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary-foreground py-20 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-center text-5xl font-bold">{title}</h1>
        <p className="mx-auto max-w-3xl text-center text-xl">{description}</p>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="City skyline"
          className="pointer-events-none size-full object-cover object-top opacity-20"
          src={backgroundImage}
        />
      </div>
    </div>
  );
};

export default AboutHeader;
