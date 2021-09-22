import React from 'react'
import { styled } from 'twin.macro'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

const Inline = styled.span`
  border-radius: 2px;
  border: 1px solid #bcbec0;
  padding: 2px;
  font: 12px Monaco, Consolas, 'Andale  Mono', 'DejaVu Sans Mono', monospace;
  color: orange;
`

const InLineCode = ({ className, children, ...props }) => {
  const language = className?.replace(/language-/, '')
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={language}
    >
      {() => <Inline>{children}</Inline>}
    </Highlight>
  )
}

export default InLineCode
