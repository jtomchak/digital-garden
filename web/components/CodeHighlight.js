import React from 'react'
import tw from 'twin.macro'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

const CodeHighlight = ({ children, className }) => {
  const language = className?.replace(/language-/, '')
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          css={tw`
          whitespace-pre-wrap
          break-normal md:break-all
          text-justify
          `}
          className={className}
          style={style}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeHighlight
