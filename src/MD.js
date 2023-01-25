import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MD({markdown}) {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
}
export default MD;