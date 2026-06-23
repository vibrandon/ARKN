export default function Container({ as: Component = "div", children, className = "", ...props }) {
  return (
    <Component className={["container", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </Component>
  );
}
