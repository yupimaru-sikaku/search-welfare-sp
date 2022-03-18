import Link from "next/link";
import cc from "classcat";

const isButton = (props) => {
  return "button" in props;
};

export const PrimaryButton = (props) => {
  const className = cc([
    props.className,
    "flex items-center justify-center rounded-full",
    {
      "text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:bg-gray-600 focus:ring-gray-400":
        props.variant === "solid",
      "border text-gray-500 border-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300":
        props.variant === "outline",
      "hover:bg-gray-50 hover:text-gray-500 focus:ring-2 focus:bg-gray-400":
        props.variant === "ghost",
      "hover:undeline text-gray-500": props.variant === "link",
      "text-gray-500": props.coloredTextDefault,
    },
  ]);
  return isButton(props) ? (
    <button type="button" onClick={props.onClick} className={className}>
      {props.children}
    </button>
  ) : (
    <Link {...props.linkProps}>
      <a
        className={className}
        target={props.external ? "noopener noreferrer" : undefined}
      >
        {props.children}
      </a>
    </Link>
  );
};
