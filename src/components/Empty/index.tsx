interface EmptyProps {
  text?: string;
}

export default function Empty({ text = 'No Photo' }: EmptyProps) {
  return <div className="emptyData flex-center">{text}</div>;
}
