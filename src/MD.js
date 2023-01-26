import React from 'react'
/*import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
//import rehypeHighlight from 'rehype-highlight'
//rehypePlugins={[rehypeHighlight]}

function MD({markdown}) {
  return <ReactMarkdown  remarkPlugins={[remarkGfm]}>
    {markdown}
  </ReactMarkdown>
}*/

import MuiMarkdown from 'mui-markdown';
function MD({markdown}) { 
  return <MuiMarkdown>{markdown}</MuiMarkdown>
}
export default MD;