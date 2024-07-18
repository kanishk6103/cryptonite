const About = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="my-2">
      <div className="mainHeading my-3 flex gap-2">
        About <span className="font-normal">{heading}</span>
      </div>
      <div
        className="text-sm text-justify"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default About;
