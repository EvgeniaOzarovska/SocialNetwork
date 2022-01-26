export const Image = ({ name, ...props }) => {
  return <img alt={name} {...props} src={`/assets/images/${name}`} />;
};
