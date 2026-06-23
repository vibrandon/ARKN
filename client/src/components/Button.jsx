import { Link } from "react-router-dom";

export default function Button({
  children,
  className = "",
  disabled = false,
  href,
  to,
  type = "button",
  variant = "primary",
  ...props
}) {
  const classes = ["button", `button-${variant}`, className].filter(Boolean).join(" ");

  if (to && !disabled) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

