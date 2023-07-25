/* eslint-disable react/prop-types */

const Button = ({ as = "button", children, filled, secondary, ...rest }) => {
  return (
    <button
      type={as}
      className={`dir-control ${secondary ? "dir-control--secondary" : ""} ${
        filled ? "dir-control--filled" : ""
      }`}
      {...rest}
    >
      {children}
      <span />
      <span />
      <span />
      <span />
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
    </button>
  );
};

// Button.defaultProps = {
//   as: 'button'
// };

// const App = () => (
//   <Fragment>
//     <Button role="button">Click Me!</Button>
//     <Button as="a" href="#">Link Me!</Button>
//     <Button role="button" secondary>Click Me!</Button>
//     <Button as="a" href="#" secondary>Link Me!</Button>
//     <Button role="button" filled>Click Me!</Button>
//     <Button as="a" href="#" filled>Link Me!</Button>
//   </Fragment>
// );

// render(<App />, ROOT_NODE);

export default Button;
