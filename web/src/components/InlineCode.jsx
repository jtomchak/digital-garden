import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";



const InLineCode = ({ className, children, ...props }) => {
  const language = className?.replace(/language-/, "");
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={language}
    >
      {() => <span className={{borderRadius: '2px', border: '1px solid #bcbec0', font: '12px Monaco, Consolas, "Andale  Mono", "DejaVu Sans Mono", monospace', color: 'orange'}}>{children}</span>}
    </Highlight>
  );
};

export default InLineCode;
