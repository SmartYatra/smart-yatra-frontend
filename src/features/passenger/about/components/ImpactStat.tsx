interface IImpactStatProps {
  value: string;
  label: string;
}

const ImpactStat = ({ value, label }: IImpactStatProps) => {
  return (
    <div className="p-4">
      <p className="text-4xl font-bold text-primary">{value}</p>
      <p className="text-lg text-muted-foreground">{label}</p>
    </div>
  );
};

export default ImpactStat;
