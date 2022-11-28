import MarkdownPreview from '@uiw/react-markdown-preview';
import './preview.scss'

interface Props {
  doc: string,
  theme: string
}

const Preview: React.FC<Props> = props => {
  const { doc, theme } = props;

  return (
    <MarkdownPreview
      className='preview'
      source={doc}
      warpperElement={{
        "data-color-mode": `${theme}`
      }}
      rehypeRewrite={(node, index, parent) => {
        if (node.tagName === 'a' && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
          parent.children = parent.children.slice(1)
        }
      }}
    />
  )
}

export default Preview;